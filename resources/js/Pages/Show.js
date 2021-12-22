import React, { useEffect, useRef } from 'react';
import { Head, useForm, usePage } from '@inertiajs/inertia-react';
import ChatLayout from '@/Layouts/ChatLayout';
import { Inertia } from '@inertiajs/inertia';

export default function Show() {
    const { user, chats, auth } = usePage().props;
    const { data, setData, errors, reset, processing, post } = useForm({
        message: ''
    });
    const messageFocusRef = useRef(null);
    const scrollRef = useRef(null);
    const handleSendMessage = (e) => {
        e.preventDefault();
        post(route('chats.store', user.username), {
            data,
            onSuccess: () => {
                reset(),
                    scrollRef.current.scrollTo(0, 99999999999);
            }
        })
    }
    Echo.private('chats.' + auth.user.uuid).listen('MessageSent', ({ message }) => {
        Inertia.reload({
            preserveScroll: true,
            onSuccess: () => scrollRef.current.scrollTo(0, 9999999)
        })
    });
    useEffect(() => {
        scrollRef.current.scrollTo(0, 9999999999999);
        messageFocusRef.current.focus();
    }, []);
    return (
        <>
            <Head title={`Chat With ${user.name}`} />
            <div className='flex flex-col max-h-screen'>
                <div className='flex items-center justify-between bg-gray-600 text-gray-200 p-3 text-lg py-5'>
                    <div className="flex md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                    <div>
                        {user.name}
                    </div>
                    <div>
                        {/* <img className='rounded-full w-11' src={user.avatar === null ? 'https://www.gravatar.com/avatar/94d093eda664addd6e450d7e9881bcad?s=28&d=identicon&r=PG' : user.avatar} alt={user.username} /> */}
                    </div>
                </div>
                <div className={`p-5 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 h-screen border-x-4 border-stone-400`} ref={scrollRef}>
                    {chats.length > 0 ? chats.map(chat => (
                        <div key={chat.id} className={`flex items-center flex-grow ${chat.sender_id === auth.user.id ? 'justify-end' : 'justify-start'}`}>
                            {chat.sender_id !== auth.user.id && <img className='rounded-full w-8 mr-2' src={user.avatar === null ? 'https://www.gravatar.com/avatar/94d093eda664addd6e450d7e9881bcad?s=28&d=identicon&r=PG' : user.avatar} alt={user.username} />}
                            <div className={`w-auto text-gray-800 ${chat.sender_id === auth.user.id ? 'bg-green-200' : 'bg-rose-200'} p-3 rounded-lg `}>
                                {chat.message}
                            </div>
                            {chat.sender_id === auth.user.id && <img className='rounded-full w-8 ml-2' src={user.avatar === null ? 'https://www.gravatar.com/avatar/94d093eda664addd6e450d7e9881bcad?s=28&d=identicon&r=PG' : user.avatar} alt={user.username} />}
                        </div>
                    )) : 'Start Chatting ...'}
                </div>
                <div className='p-2 mb-1 w-full'>
                    <form className='flex items-start' onSubmit={e => handleSendMessage(e)}>
                        <input ref={messageFocusRef} type="text" onChange={e => setData({ ...data, message: e.target.value })} className='border border-gray-400 px-2 py-3 shadow rounded text-gray-800 w-full focus:ring focus:ring-blue-500 focus:ring-opacity-25 transition duration-75' placeholder='Start Chatting Here ...' value={data.message} />
                        <button type='submit' disabled={processing} className='mx-3 px-3 py-2 text-sm font-semibold focus:outline-none focus:ring focus:ring-gray-700 focus:ring-opacity-50 tracking-wider bg-gray-800 text-gray-100 hover:bg-gray-700 rounded shadow transition duration-75'>Send</button>
                    </form>
                    <div className='block'>
                        {errors && <div className='text-rose-500 text-sm'>{errors.message}</div>}
                    </div>
                </div>
            </div >
        </>
    );
};

Show.layout = page => <ChatLayout children={page} />

