import { createFileRoute } from '@tanstack/react-router'
import MyPage from "../pages/auth/MyPage";

export const Route = createFileRoute('/MyPage')({
  component: MyPage,
})
