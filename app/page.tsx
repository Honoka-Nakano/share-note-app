import Image from 'next/image'

{/*

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database.types'

import NoteList from '@/components/layouts/Home/NoteList'

*/}

const Home = async () => {

  {/*

  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  */}

  return (
    <main className='h-full'>
      <div className='w-11/12 mx-auto'>
        <div className='w-10/12 mx-auto h-[200px] relative'>
          <h1 className='absolute bottom-0 text-center w-full text-[40px] md:text-[50px]'>
            Let&apos;s Share <br />
            All Notes easily.
          </h1>
        </div>
        <div className='w-fit mx-auto'>
          <Image
            src={"/LogoSample.png"}
            width={500}
            height={500}
            alt="Logo"
            className='w-[350px] md:w-[400px] lg:w-[500px] h-[350px] md:h-[400px] lg:h-[500px]'
          />
        </div>
        <div className='text-red-500 w-fit mx-auto my-2'>Under Development.</div>
      </div>
    </main>
  );
}

export default Home
