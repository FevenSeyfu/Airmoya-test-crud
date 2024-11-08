import React from 'react';
import Chat from './Chat';

const ChatRoomList = ({ chats, onChatClick }) => {
  return (
    <section className='w-full h-full flex flex-col gap-y-2'>
      {chats.length > 0 ? (
        chats.map(chat => (
          <Chat key={chat.id} chat={chat} onChatClick={onChatClick} />
        ))
      ) : (
        <p className="text-center text-gray-500">No chats to show</p>
      )}
    </section>
  );
};

export default ChatRoomList;