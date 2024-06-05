'use client'

import Link from "next/link"
import useStore from "@/store"
import Image from 'next/image'
import { useEffect } from "react"
import type { Session } from "@supabase/auth-helpers-nextjs"
import type { Database } from '@/lib/database.types'
type ProfileType = Database['public']['Tables']['profiles']['Row']

const Navigation = ({
    session,
    profile
}: {
    session: Session | null,
    profile: ProfileType | null
}) => {
    const { setUser } = useStore()

    useEffect(() => {
        setUser({
            id: session ? session.user.id : '',
            email: session ? session.user.email! : '',
            name: session && profile ? profile.name : '',
            introduce: session && profile ? profile.introduce : '',
            avatar_url: session && profile ? profile.avatar_url : '',
        })
    }, [session, setUser, profile])

    return (
        <header className='divide-y border-gray-200 dark:border-gray-800 border-b'>
        <div className='px-4 py-4 md:py-6 lg:-x-6'>
            {session ? (
            <div className='flex items-center justify-between'>
                <Link href="/Home" className='text-2xl font-bold tracnking-tighte'>
                    Note - hn
                </Link>
                <nav className='flex space-x-4 items-center'>
                    <Link
                        href={"/CreatePost"}
                        className='bg-black py-2 px-3 text-white rounded-md font-medium'
                    >
                        ノートを追加
                    </Link>
                    <Link
                        href={"/Settings/Profile"}>
                        <div className="relative w-10 md:w-12 h-10 md:h-12">
                            <Image
                                src={profile && profile.avatar_url ? profile.avatar_url : '/default.png'}
                                className="rounded-full object-cover"
                                alt="avatar"
                                fill
                            />
                        </div>
                    </Link>
                </nav>
            </div> ) : (
            <div className='flex items-center justify-between'>
                <Link href="/" className='text-2xl font-bold tracnking-tighte'>
                    Note - hn
                </Link>
                <nav className='space-x-4'>
                    <Link
                        href={"/Auth/Login"}
                        className='font-medium text-gray-500 transitioin-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                    >
                        ログイン
                    </Link>
                    <Link
                        href={"/Auth/SignUp"}
                        className='bg-black py-2 px-3 text-white rounded-md font-medium'
                    >
                        登録
                    </Link>
                </nav>
            </div> )}
        </div>
    </header>
    )
}

export default Navigation
