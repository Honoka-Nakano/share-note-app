'use client'

import { useCallback, useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import Image from 'next/image'
import Loading from '@/components/layouts/Loading'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'
import useStore from "@/store"
type Schema = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
    introduce: z.string().min(0),
})

const Profile = () => {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState<File | null>(null)
    const [message, setMessage] = useState('')
    const [fileMessage, setFileMessage] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('/defaultIcon.png')
    const { user } = useStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user.name ? user.name : '',
            introduce: user.introduce ? user.introduce : '',
        },
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        if (user && user.avatar_url) {
            setAvatarUrl(user.avatar_url)
        }
    }, [user])

    const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        setFileMessage('')

        if (!files || files?.length == 0) {
            setFileMessage('画像をアップロードしてください。')
            return
        }

        const fileSize = files[0]?.size / 1024 / 1024
        const fileType = files[0]?.type

        if (fileSize > 2) {
            setFileMessage('画像サイズを2MB以下にする必要があります。')
            return
        }

        if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
            setFileMessage('画像はjpgまたはpng形式である必要があります。')
            return
        }

        setAvatar(files[0])
    }, [])

    const onSubmit: SubmitHandler<Schema> = async (data) => {
        setLoading(true)
        setMessage('')

        try {
            let avatar_url = user.avatar_url

            if (avatar) {
                const { data: storageData, error: storageError } = await supabase.storage
                    .from('profile')
                    .upload(`${user.id}/${uuidv4()}`, avatar)

                if (storageError) {
                    setMessage('Error occured.' + storageError.message)
                    return
                }

                if (avatar_url) {
                    const fileName = avatar_url.split('/').slice(-1)[0]

                    await supabase.storage.from('profile').remove([`${user.id}/${fileName}`])
                }

                const { data: urlData } = await supabase.storage
                    .from('profile')
                    .getPublicUrl(storageData.path)

                avatar_url = urlData.publicUrl
            }

            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    name: data.name,
                    introduce: data.introduce,
                    avatar_url,
                })
                .eq('id', user.id)

            if (updateError) {
                setMessage('Error occured.' + updateError.message)
                return
            }

            setMessage('プロフィールを更新しました。')

        } catch (error) {
            setMessage('Error occured.' + error)
            return
        } finally {
            setLoading(false)
            router.refresh()
        }
    }

    return (
        <div className="">
            <div className="text-center font-bold text-xl mb-10">Profile</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <div className="flex flex-col text-sm items-center justify-center mb-5">
                        <div className="relative w-24 h-24 mb-5">
                            <Image src={avatarUrl} className="rounded-full object-cover" alt="avatar" fill />
                        </div>
                        <input type="file" id="avatar" onChange={onUploadImage} />
                        {fileMessage && <div className="text-center text-red-500 my-5">{fileMessage}</div>}
                    </div>
                </div>
                <div className="mb-5">
                    <div className="text-sm mb-1 font-bold">Name</div>
                    <input
                        type="text"
                        className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
                        placeholder="Name"
                        id="name"
                        {...register('name', { required: true })}
                        required
                    />
                    <div className="my-3 text-center text-sm text-red-500">{errors.name?.message}</div>
                </div>
                <div className="mb-5">
                    <div className="text-sm mb-1 font-bold">Introduce</div>
                    <textarea
                        className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
                        placeholder="Introduce"
                        id="introduce"
                        {...register('introduce')}
                        rows={5}
                    />
                </div>
                <div className="mb-5">
                    {loading ? (
                        <Loading />
                    ) : (
                        <button
                            type="submit"
                            className="font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm">
                                Change Profile
                        </button>
                    )}
                </div>
            </form>

            {message && <div className="my-5 text-center text-red-500 mb-5">{message}</div>}
        </div>
    )
}

export default Profile
