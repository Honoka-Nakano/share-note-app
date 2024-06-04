'use client'

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from 'next/link'
import Loading from '@/components/layouts/Loading'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'
type Schema = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
    email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
    password: z.string().min(6, { message: '6文字以上入力する必要があります。' }),
})

const SignUp = () => {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: { name: '', email: '', password: ''},
        resolver: zodResolver(schema),
    })

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)

        try {
            const { error: errorSignUp } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    emailRedirectTo: `${location.origin}/Auth/Callback`,
                },
            })
            if (errorSignUp) {
                setMessage('Error occured.' + errorSignUp.message)
                return
            }

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ name: data.name })
                .eq('email', data.email)

            if (updateError) {
                setMessage('Error occured.' + updateError.message)
                return
            }

            reset()
            setMessage(
                'Verify your Email.'
            )
        } catch (error) {
            setMessage('Error occured.' + error)
            return
        } finally {
            setLoading(false)
            router.refresh()
        }
    }

    return (
        <div className="max-w-[400px] mx-auto pt-[100px]">
            <div className="text-center font-bold text-xl mb-10">Sign Up</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
                        placeholder="Name"
                        id="name"
                        {...register('name', { required: true })}
                    />
                    <div className="my-3 text-center text-sm text-red-500">{errors.name?.message}</div>
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
                        placeholder="Email"
                        id="email"
                        {...register('email', { required: true })}
                    />
                    <div className="my-3 text-center text-sm text-red-500">{errors.email?.message}</div>
                </div>

                <div className="mb-5">
                    <input
                        type="password"
                        className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
                        placeholder="Password"
                        id="password"
                        {...register('password', { required: true })}
                    />
                    <div className="my-3 text-center text-sm text-red-500">{errors.password?.message}</div>
                </div>

                <div className="mb-5">
                    {loading ? (
                        <Loading />
                    ) : (
                        <button
                            type="submit"
                            className="font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm">
                                Sign Up
                        </button>
                    )}
                </div>
            </form>

            {message && <div className="my-5 text-center text-sm text-red-500">{message}</div>}

            <div className="text-center text-sm">
                <Link href="/Auth/Login" className="text-gray-500 font-bold">
                    Login
                </Link>
            </div>
        </div>
    )
}

export default SignUp
