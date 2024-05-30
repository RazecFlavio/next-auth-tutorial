'use server'

import { getUserByEmail } from '@/data/user';
import { ResetSchema } from '@/schemas'
import * as z from 'zod'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(values);

    if (!validateFields.success) {
        return {
            error: "Invalid email!"
        }
    }

    const { email } = validateFields.data;

    const existUser = await getUserByEmail(email);

    if (!existUser) {
        return { error: "Email not found!" };
    }

    //TODO - generate token and send email

    return { success: "Reset email sent!" }
}