import * as z from 'zod'

export const ResetSchema = z.object({
    email: z.string().email({
        message: "E-mail é obrigatorio!"
    })
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "E-mail inválido!"
    }),
    password: z.string().min(1, {
        message: "Informe a senha!"
    })
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "E-mail inválido!"
    }),
    password: z.string().min(6, {
        message: "A senha precisa ter no mínimo 6 caracteres"
    }),
    name: z.string().min(1, { message: "O Nome é obrigatório!" })
});
