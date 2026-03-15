import Layout from "./BaseLayout.tsx";
import { Button } from "../components/Button.tsx";
import { Fragment } from "hono/jsx";

export default async function NotFoundLayout() {
  return (
    <Layout
      title="Page Not Found"
      description="The page you are looking for does not exist."
    >
      <Fragment>
        <main class="flex-1 flex flex-col justify-center items-center min-h-[80vh]">
          <h1 class="text-4xl font-bold font-heading leading-tight mb-8">
            Page not found
          </h1>
          <Button href="/">Go back to the homepage</Button>
        </main>
      </Fragment>
    </Layout>
  );
}
