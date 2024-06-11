import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import CreateNote from '@/components/layouts/CreateNote/CreateNote'

import type { Database } from '@/lib/database.types'

const CreateNotePage = async () => {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/Auth/Login')
    }

    return <CreateNote />
}

export default CreateNotePage
