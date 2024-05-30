/**
 * Nesta lista se encontram todas as rotas publicas
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification"
]

/**
 * Nesta lista se encontram todas as rotas protegidas
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset"
]

export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/settings";