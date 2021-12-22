import React from 'react';
import ChatLayout from '@/Layouts/ChatLayout';

export default function Home() {
    return (
        <div className='flex flex-col max-h-screen'>
            <div className='bg-indigo-600 text-gray-200 p-3 text-lg py-5'>
                Let's Start Chatting
            </div>
            <div className='flex h-screen items-center justify-center bg-emerald-300'>
                Click user to chat with
            </div>
        </div>
    );
}

Home.layout = page => <ChatLayout children={page} title={"Lets Chat"} />