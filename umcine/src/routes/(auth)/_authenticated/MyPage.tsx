import { createFileRoute } from '@tanstack/react-router'
import MyPage from "../../../pages/auth/MyPage";

export const Route = createFileRoute('/(auth)/_authenticated/MyPage')({
  component: MyPage,
})
