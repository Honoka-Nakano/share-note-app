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
        name: 'Proflie',
        icon: UserCircleIcon,
        href: '/Settings/Profile',
    },
    {
        name: 'Email',
        icon: EnvelopeIcon,
        href: '/Settings/Email',
    },
    {
        name: 'Password',
        icon: KeyIcon,
        href: '/Settings/Password',
    },
    {
        name: 'Logout',
        icon: ArrowLeftOnRectangleIcon,
        href: '/Settings/Logout',
    },
]

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <div className='w-4/5 mx-auto pt-[30px] space-y-12'>
            <div className=''>{children}</div>
            <div className='text-sm space-y-1 font-bold flex flex-col'>
                {subNavigation.map((item, index) => (
                    <Link href={item.href} key={index}>
                        <div
                            className={`${
                                item.href == pathname && 'bg-sky-100 text-sky-500'
                            } hover:bg-sky-100 px-3 py-3 rounded-full`}
                        >
                            <item.icon className="inline-block w-5 h-5 mr-2" />
                                {item.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SettingsLayout
