import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../../../stores/auth-store";

export const Route = createFileRoute("/(auth)/_authenticated")({
    beforeLoad: () => {
        const token = useAuthStore.getState().accessToken;
        // 토큰이 없으면 로그인 페이지로 이동
        if(!token) {
            throw redirect({
                to: "/login",
            });
        }
    },
    // 토큰이 있으면 Outlet을 통해 하위 페이지 보여줌
    component: () => <Outlet />,
});