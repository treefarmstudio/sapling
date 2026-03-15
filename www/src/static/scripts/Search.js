import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js";
import lunr from "https://cdn.jsdelivr.net/npm/lunr@2.3.9/+esm";

// Add this function to generate GitHub-style heading IDs (same as in utils/helpers.ts)
function generateHeadingId(text) {
  return (
    text
      .toLowerCase()
      // Remove all punctuation except hyphens and spaces
      .replace(/[^\w\s-]/g, "")
      // Replace spaces with hyphens
      .replace(/\s+/g, "-")
      // Remove consecutive hyphens
      .replace(/-+/g, "-")
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, "")
  );
}

export class SearchBox extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .search-trigger {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      background: var(--color-background);
      color: var(--color-foreground);
      cursor: pointer;
      text-align: left;
    }

    dialog {
      padding: 0;
      max-width: 600px;
      width: 100%;
      margin: 4rem auto;
      background: var(--color-background);
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
    }

    dialog::backdrop {
      background: rgba(0, 0, 0, 0.5);
    }

    .search-input {
      width: 100%;
      padding: 1rem;
      border: none;
      border-bottom: 1px solid #e2e8f0;
      border-radius: 0.5rem 0.5rem 0 0;
      font-size: 1rem;
      background: var(--color-background);
      color: var(--color-foreground);

      &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        appearance: none;
      }
    }

    .search-input:focus {
      outline: none;
    }

    .search-results {
      max-height: 400px;
      overflow-y: auto;
      border-radius: 0 0 0.5rem 0.5rem;
    }

    .search-result {
      display: block;
      padding: 0.75rem 1rem;
      text-decoration: none;
      border-bottom: 1px solid #e2e8f0;
      transition: background-color 0.1s;
    }

    .search-result:last-child {
      border-bottom: none;
    }

    .search-result:hover {
      background: #f8fafc;
    }

    .result-title {
      font-weight: 500;
      color: var(--color-foreground);
      margin-bottom: 0.25rem;
    }

    .result-description {
      font-size: 0.875rem;
      color: var(--color-muted);
    }

    .heading-match {
      font-size: 0.875rem;
      color: var(--color-muted);
      margin-top: 0.25rem;
      padding-left: 1rem;
      border-left: 2px solid #e2e8f0;
    }

    .search-result.selected {
      background: var(--color-primary);
    }

    .search-result.selected .result-title,
    .search-result.selected .result-description,
    .search-result.selected .heading-match {
      color: var(--color-on-primary);
    }

    .search-result.selected .heading-match {
      border-left-color: var(--color-on-primary);
    }

    .kbd-shortcut {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .kbd-shortcut kbd {
      height: 20px;
      line-height: 20px;
      border-radius: 6px;
      padding: 0 6px;
      font-size: 12px;
      color: var(--color-foreground);
      background: var(--color-background);
      box-shadow: 1px 1px 0px var(--color-muted-border);
      font-weight: 500;
      font-family: inherit;
      border: none;
      margin-left: 16px;
    }

    @media (prefers-color-scheme: dark) {
      .search-trigger,
      dialog {
        border-color: #374151;
      }

      .search-result {
        border-color: #374151;
      }

      .search-result:hover {
        background: #111827;
      }

      .heading-match {
        border-left-color: #374151;
      }

      .kbd-shortcut kbd {
        background: var(--color-muted-background, #1e293b);
        border-color: var(--color-muted-border, #334155);
        color: var(--color-muted, #94a3b8);
      }
    }

    .dialog-content {
      background: var(--color-background);
      padding: 0;
      border-radius: 0.5rem;
      width: 100%;
    }

    dialog::backdrop {
      background: rgba(0, 0, 0, 0.5);
    }
  `;

  static properties = {
    searchResults: { type: Array },
    searchIndex: { type: Array },
    selectedIndex: { type: Number },
  };

  constructor() {
    super();
    this.searchResults = [];
    this.searchIndex = [];
    this.selectedIndex = -1;
    this.lunrIndex = null;
    this.loadSearchIndex();

    // Add keyboard shortcut listener
    this._onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        this.openSearch();
      }
    };

    // Handle clicks outside the dialog
    this._handleScrimClick = (e) => {
      const dialog = this.shadowRoot?.querySelector("dialog");
      if (!dialog?.open) return;

      const dialogContent = this.shadowRoot?.querySelector(".dialog-content");
      if (!e.composedPath().includes(dialogContent)) {
        this.closeSearch();
      }
    };

    window.addEventListener("keydown", this._onKeyDown);
    window.addEventListener("click", this._handleScrimClick);
  }

  updated(changed) {
    super.updated(changed);

    if (changed.has("open")) {
      this.w(this.open);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this._onKeyDown);
    window.removeEventListener("click", this._handleScrimClick);
  }

  openSearch() {
    const dialog = this.shadowRoot?.querySelector("dialog");
    if (dialog) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      const input = dialog.querySelector("input");
      if (input) {
        input.focus();
      }
    }
  }

  closeSearch() {
    const dialog = this.shadowRoot?.querySelector("dialog");
    if (dialog) {
      dialog.close();
      document.body.style.overflow = "";
      this.searchResults = [];
      this.selectedIndex = -1;
      const input = dialog.querySelector("input");
      if (input) {
        input.value = "";
      }
    }
  }

  async loadSearchIndex() {
    try {
      // console.log("Attempting to load search index...");
      const paths = ["/search-index.json"];
      let response;
      let error;

      for (const path of paths) {
        try {
          // console.log(`Trying to fetch from ${path}...`);
          response = await fetch(path);
          if (response.ok) {
            // console.log(`Successfully fetched from ${path}`);
            break;
          }
        } catch (e) {
          error = e;
          // console.error(`Failed to fetch from ${path}:`, e);
        }
      }

      if (!response?.ok) {
        throw error || new Error(`Failed to fetch search index from all paths`);
      }

      this.searchIndex = await response.json();
      // console.log("Search index loaded:", this.searchIndex.length, "documents");

      // Build Lunr index
      try {
        // console.log("Building Lunr index...");
        const documents = this.searchIndex;
        this.lunrIndex = lunr(function () {
          this.ref("slug");
          this.field("title", { boost: 10 });
          this.field("description", { boost: 5 });
          this.field("content");
          this.field("headings", { boost: 7 });

          // Add documents to index using the local variable
          documents.forEach((doc) => {
            this.add({
              slug: doc.slug,
              title: doc.title,
              description: doc.description,
              content: doc.content,
              headings: doc.headings.map((h) => h.text).join(" "),
            });
          });
        });
        // console.log("Lunr index built successfully");
      } catch (lunrError) {
        console.error("Failed to build Lunr index:", lunrError);
        throw lunrError;
      }
    } catch (error) {
      console.error("Failed to load or process search index:", error);
      // Fall back to empty search index
      this.searchIndex = [];
      this.lunrIndex = null;
    }
  }

  handleKeydown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this.selectedIndex = Math.min(
          this.selectedIndex + 1,
          this.searchResults.length - 1
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        break;
      case "Enter":
        e.preventDefault();
        if (this.selectedIndex >= 0) {
          const result = this.searchResults[this.selectedIndex];
          window.location.href = `/docs/${result.slug}`;
        }
        break;
      case "Escape":
        e.preventDefault();
        this.closeSearch();

        break;
    }
  }

  handleSearch(e) {
    const query = e.target.value;

    // Require at least 2 characters
    if (!query || query.length < 2 || !this.lunrIndex) {
      this.searchResults = [];
      this.isOpen = false;
      return;
    }

    try {
      // Search using Lunr
      const results = this.lunrIndex.search(query + "~1 " + query + "*");

      // Map results back to original documents
      this.searchResults = results.slice(0, 5).map((result) => {
        const doc = this.searchIndex.find((d) => d.slug === result.ref);
        return {
          ...doc,
          // Find matching headings
          matchingHeadings: doc.headings.filter((h) =>
            h.text.toLowerCase().includes(query.toLowerCase())
          ),
          score: result.score,
        };
      });

      this.isOpen = this.searchResults.length > 0;
      this.selectedIndex = this.searchResults.length > 0 ? 0 : -1;
    } catch (e) {
      // Fallback to simple search if Lunr query is invalid
      this.handleBasicSearch(query);
    }
  }

  // Fallback search method
  handleBasicSearch(query) {
    const queryLower = query.toLowerCase();
    this.searchResults = this.searchIndex
      .filter((entry) => {
        const searchable = [entry.title, entry.description, entry.content]
          .join(" ")
          .toLowerCase();
        return searchable.includes(queryLower);
      })
      .slice(0, 5);

    this.isOpen = this.searchResults.length > 0;
    this.selectedIndex = this.searchResults.length > 0 ? 0 : -1;
  }

  render() {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const shortcutKey = isMac ? "⌘K" : "Ctrl+K";

    return html`
      <div>
        <button
          class="search-trigger"
          @click=${(e) => {
            e.stopPropagation();
            this.openSearch();
          }}
        >
          Search docs... (beta)
          <div class="kbd-shortcut">
            <kbd>${shortcutKey}</kbd>
          </div>
        </button>

        <dialog>
          <div class="dialog-content" @click=${(e) => e.stopPropagation()}>
            <input
              type="search"
              placeholder="Search docs..."
              class="search-input"
              @input=${this.handleSearch}
              @keydown=${this.handleKeydown}
            />

            ${this.searchResults.length > 0
              ? html`
                  <div class="search-results">
                    ${this.searchResults.map(
                      (result, index) => html`
                        <a
                          href="/docs/${result.slug}"
                          class="search-result ${index === this.selectedIndex
                            ? "selected"
                            : ""}"
                        >
                          <div class="result-title">${result.title}</div>
                          <div class="result-description">
                            ${result.description}
                          </div>
                          ${result.matchingHeadings?.map(
                            (heading) => html`
                              <a
                                href="/docs/${result.slug}#${generateHeadingId(
                                  heading.text
                                )}"
                                class="heading-match"
                              >
                                ${"#".repeat(heading.level)} ${heading.text}
                              </a>
                            `
                          )}
                        </a>
                      `
                    )}
                  </div>
                `
              : null}
          </div>
        </dialog>
      </div>
    `;
  }
}

customElements.define("search-box", SearchBox);

export default SearchBox;
