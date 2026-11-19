import { createFileRoute } from "@tanstack/react-router";
import { EditProfilePage } from "../../../pages/auth/edit-profile-page";

export const Route = createFileRoute("/(auth)/_authenticated/mypage/edit") ({
    component: EditProfilePage,
});