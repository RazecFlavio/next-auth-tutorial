import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}
/*
    adicionou a instancia do banco no 
    globalThis para que a instancia não seja recriada por conta do hot reload.
    esta configuração é apenas para ambiente de desenvolvimento.
    em produção a instancia é criada apenas uma unica vez. 
    no momento que o sistema é iniciado. 
*/

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;