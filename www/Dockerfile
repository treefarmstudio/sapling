# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev for building)
# --ignore-scripts avoids esbuild version conflict from drizzle-kit's deprecated @esbuild-kit/core-utils
# Then install only the top-level esbuild binary that Vite needs
RUN npm ci --ignore-scripts && node node_modules/esbuild/install.js

# Copy only files needed for the build
COPY src ./src
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY tsconfig.json ./

# Build server and client
RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --omit=dev --ignore-scripts

# Copy the source code (we need this because we run via tsx now)
COPY src ./src
COPY tsconfig.json ./

# Copy the built CSS styles from the builder
COPY --from=builder /app/src/static ./src/static

EXPOSE 8080

ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:8080/').then(() => process.exit(0)).catch(() => process.exit(1))"

# Start the application
CMD ["npm", "run", "start"]
