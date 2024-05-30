
import NextAuth from "next-auth"

import authConfig from "./auth.config"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "./routes";

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    console.log("Next Auth middleware", req.url);
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            //TODO: verificar se o usuario logado  tem permissão para acessar essa rota autenticada.
            // if(req.auth?.user.role === 'admin'){}
            console.log('useruasdra', req);
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }

        return null;

    }
    if (!isLoggedIn && !isPublicRoute) {        
        return Response.redirect(new URL("/auth/login", nextUrl))
    }
    return null;
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}