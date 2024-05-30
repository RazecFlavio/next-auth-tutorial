'use server'

import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db"

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token)

    if (!existingToken) {
        return { error: "Token not found!" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return { error: "token expires" }
    }

    const existUser = await getUserByEmail(existingToken.email);

    if (!existUser) {
        return {
            error: "Email does not exist!"
        }
    }

    await db.user.update({
        where: { id: existUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return {
        success: "Email verified!"
    }
}