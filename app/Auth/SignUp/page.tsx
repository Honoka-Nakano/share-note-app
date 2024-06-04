import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import SignUp from '@/components/layouts/SignUp'
import type { Database } from '@/lib/database.types'

const SignUpPage = async () => {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session) {
        redirect('/Home')
    }

    return <SignUp />
}

export default SignUpPage
