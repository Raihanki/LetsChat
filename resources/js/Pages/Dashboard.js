import React from 'react';
import ChatLayout from '@/Layouts/ChatLayout';

export default function Dashboard() {
    return (
        <div>
            <div>
                Start Chatting
            </div>
        </div>
    );
}

Dashboard.layout = page => <ChatLayout children={page} />