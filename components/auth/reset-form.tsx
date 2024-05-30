"use client"
import * as z from 'zod'

import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { ResetSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { login } from '@/actions/login'
import { useState, useTransition } from 'react'
import { reset } from '@/actions/reset'



export const ResetForm = () => {
    const [error, SetError] = useState("");
    const [success, SetSuccess] = useState("");

    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        SetError("")

        SetSuccess("")

        startTransition(() => {
            reset(values).then((data) => {
                SetError(data.error || "")
                SetSuccess(data.success || "")
            })
        })
    }

    return (
        <CardWrapper
            headerLabel="Forgot your password ?"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder='Enter your email address'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type='submit' className='w-full'>
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}