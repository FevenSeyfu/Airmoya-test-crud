import React from 'react';
import Typography from '../../utility/Typography/Typography';

const Chat = ({ chat, onChatClick }) => {
  return (
    <article
      className="w-full h-full border-2 border-neutral-200 shadow-sm rounded-2xl p-3 flex items-center"
      onClick={onChatClick}
    >
      <div className="flex flex-row items-center gap-x-2">
        <img src='/images/user-avatar.jpg' className='h-16 w-16' />
        <div className="flex flex-col justify-start">
          <Typography variant="h3" weight="medium" color="primary">
            {chat.name}
          </Typography>
          <p className=' text-base font-normal line-clamp-1'>
            {chat.message}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Chat;