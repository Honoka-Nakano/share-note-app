import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import Login from '@/components/layouts/Auth/Login'
import type { Database } from '@/lib/database.types'

const LoginPage = async () => {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if ( session ) {
        redirect('/Home')
    }

    return <Login />
}

export default LoginPage
