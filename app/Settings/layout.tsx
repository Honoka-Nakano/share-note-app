'use client'

import {
    UserCircleIcon,
    EnvelopeIcon,
    KeyIcon,
    ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Herr_Von_Muellerhoff } from 'next/font/google'

const subNavigation = [
    {
        name: 'プロフィール',
        icon: UserCircleIcon,
        href: '/Settings/Profile',
    },
    {
        name: 'メールアドレス',
        icon: EnvelopeIcon,
        href: '/Settings/Email',
    },
    {
        name: 'パスワード',
        icon: KeyIcon,
        href: '/Settings/Password',
    },
    {
        name: 'ログアウト',
        icon: ArrowLeftOnRectangleIcon,
        href: '/Settings/Logout',
    },
]

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <div className='w-4/5 md:w-2/3 lg:w-[600px]  mx-auto pt-[30px] space-y-12 md:grid md:grid-cols-3 md:gap-3'>
            <div className='md:col-span-1 md:text-sm md:space-y-1 font-bold md:flex md:flex-col'>
                {subNavigation.map((item, index) => (
                    <Link href={item.href} key={index}>
                        <div
                            className={`${
                                item.href == pathname && 'bg-sky-100 text-sky-500'
                            } my-1 md:m-0 hover:bg-sky-100 px-3 py-3 rounded-full`}
                        >
                            <item.icon className="inline-block w-5 h-5 mr-2" />
                                {item.name}
                        </div>
                    </Link>
                ))}
            </div>
            <div className='md:col-span-2'>{children}</div>
        </div>
    )
}

export default SettingsLayout
