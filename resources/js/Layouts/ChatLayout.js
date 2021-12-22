import { Link, usePage } from '@inertiajs/inertia-react';
import React from 'react';
import { Head } from '@inertiajs/inertia-react'

const ChatLayout = ({ children, title }) => {
    const { user } = usePage().props.auth
    const users = usePage().props.users
    return (
        <div className="flex min-h-screen">
            <Head>
                <title>{title}</title>
            </Head>
            <div className="w-1/3 hidden md:block">
                <div className='flex flex-col max-h-screen h-full'>
                    <div className='text-right py-5 bg-rose-700 pr-5 text-gray-200'>
                        <h3 className='font-semibold text-lg'>People who used same application</h3>
                    </div>
                    <div className='pr-10 py-4 flex flex-col text-right space-y-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 overflow-y-auto'>
                        {users.map(user => (
                            <div key={user.id} className={`hover:border-r-4 hover:border-rose-400 hover:px-5 py-2 ${route().current('chats.show', user.username) ? 'border-r-4 border-rose-500 px-5 font-semibold' : ''}`}>
                                <Link href={route('chats.show', user.username)}>{user.name}</Link>
                            </div>
                        ))}
                    </div>
                    <div className='text-right pb-10 pt-3 border-t-2 border-gray-300 bg-gray-200'>
                        <div className='mx-3'>
                            <h4 className='pb-2'>You are logged in as <span className='font-semibold'>{user.name}</span></h4>
                            <Link as='button' type='submit' method='post' href={route('logout')} className='px-3 py-2 text-sm font-semibold focus:outline-none focus:ring focus:ring-gray-700 focus:ring-opacity-50 tracking-wider bg-gray-800 text-gray-100 hover:bg-gray-700 rounded shadow transition duration-75'>Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-full md:w-2/3">
                {children}
            </div>
        </div>
    );
};

export default ChatLayout;