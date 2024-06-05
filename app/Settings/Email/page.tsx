import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import Email from '@/components/layouts/Email'
import type { Database } from "@/lib/database.types";

const EmailPage = async () => {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/Auth/Login')
    }

    return <Email email={session.user.email!} />
}

export default EmailPage
