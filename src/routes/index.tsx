import { createFileRoute } from "@tanstack/react-router";
import { IndexComponent } from "../components/index";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <IndexComponent />;
}
