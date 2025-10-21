import { createFileRoute } from "@tanstack/react-router";
import { IndexComponent } from "../components/index";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return <IndexComponent />;
}
