'use server'

import { RegisterSchema } from '@/schemas';
import * as z from 'zod'
import bcrypt from "bcryptjs";
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values);


    await new Promise((resolve, reject) => { setTimeout(() => { resolve('Hello, world!'); }, 3000); });

    if (!validatedFields.success) {
        return { error: "Dados incorretos!" }
    }

    const { email, name, password } = validatedFields.data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existsEmail = await getUserByEmail(email);
    if (existsEmail) {
        return { error: "Email já esta em uso! " }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email sent!" }
}