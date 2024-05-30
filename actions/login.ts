'use server'

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod'

export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values);


    await new Promise((resolve, reject) => { setTimeout(() => { resolve('Hello, world!'); }, 3000); });

    if (!validatedFields.success) {
        return { error: "Dados incorretos!" }
    }

    const { email, password } = validatedFields.data;

    const existUser = await getUserByEmail(email);

    if (!existUser || !existUser.email || !existUser.password) {
        return { error: "dados nao encontrado!" }
    }

    if (!existUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existUser.email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return {
            success: "Confirmation email sent!"
        }
    }



    try {
        await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials! " }
                default:
                    return { error: "Algo deu errado!" }
            }
        }

        throw error;
    }

    return { success: "Email Enviado! " }
}