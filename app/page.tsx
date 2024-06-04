import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database.types'

const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <main>
      {session ?
        <h1>Login</h1> :
        <h1>No login</h1>}
    </main>
  );
}

export default Home
