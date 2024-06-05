import Note from '@/components/layouts/Home/Note'

const NoteList = () => {
    return (
        <div className='w-11/12 h-fit py-2 mx-auto space-y-4 gap-2
            md:grid md:grid-cols-2 lg:grid-cols-3 md:space-y-0'>
            <Note />
            <Note />
            <Note />
            <Note />
        </div>
    )
}

export default NoteList
