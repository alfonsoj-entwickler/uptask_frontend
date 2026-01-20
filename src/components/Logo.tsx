export default function Logo() {
    return (
        <div className='flex items-center gap-2'>
            <img src='/logo.svg' alt='logo UpTask' className='w-20' />
            <span className='text-6xl font-bold text-white'>
                <span className='text-violet-600'>Up</span>
                Task
            </span>
        </div>
    );
}
