import { createFileRoute } from "@tanstack/react-router";
import { MyPage } from "../../pages/user/my-page";

export const Route = createFileRoute("/my/")({
  component: MyPage,
});