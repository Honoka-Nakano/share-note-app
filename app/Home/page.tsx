import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database.types'

import NoteList from '@/components/layouts/Home/NoteList'

const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <main>
      {session ? (
        <div>
          <div className='flex p-2 space-x-2 border-b-1 border'>
            <p className='h-fit my-auto'>タグ: </p>
            <ul className='flex space-x-2'>
              <li className='border p-1 rounded-md'><a href="/Home">XXXX</a></li>
              <li className='border p-1 rounded-md'><a href="/Home">YYYY</a></li>
              <li className='border p-1 rounded-md'><a href="/Home">ZZZZ</a></li>
              <li className='border p-1 rounded-md'><a href="/Home">AAAA</a></li>
            </ul>
          </div>
          <NoteList />
        </div>
      ) : (
        <p className='w-fit h-[500px] mx-auto py-[200px]'>ログインしてください．</p>
      )}
    </main>
  );
}

export default Home
