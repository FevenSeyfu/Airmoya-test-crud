import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft, FaCloudUploadAlt, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import Typography from '../utility/Typography/Typography';
import { sendMessage } from '@redux/chatSlice'; 

const ChatBox = ({ handleChatToggle, currentRoom }) => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const [message, setMessage] = useState('');
  const { user,userList } = useSelector((state) => state.auth);

  const otherUser = userList.map((user) => user.id == 1730763425243 &&  (user.username))

  const handleSendMessage = () => {
    const newMessage = {
      sender: user.id, 
      receiver: 1730763425243,
      text: message,
      file: null,
      timestamp: new Date().toISOString(),
    };
    dispatch(sendMessage(newMessage));
    setMessage('');
  };

  const filteredMessages = messages?.filter((chat) => chat.room === currentRoom);

  return (
    <div className='w-full flex flex-col gap-y-2 shadow-sm shadow-light-purple'>
      <div onClick={handleChatToggle} className='flex flex-row items-center gap-x-4 border-b py-4 cursor-pointer'>
        <FaArrowLeft size={20} />
        <Typography variant="h4" weight="medium" color="primary">
          Back
        </Typography>
      </div>
      <article className='flex flex-col flex-grow w-full min-h-[60vh]'>
        <div className='flex flex-col-reverse flex-grow overflow-y-auto p-4'>
          <div className='flex flex-col gap-y-4'>
            {filteredMessages.map((chat) => (
              <div key={chat.room} className={`w-full flex ${chat.messages[0].sender === user.id ? 'justify-end' : 'justify-start'}`}>
                <div className='flex items-center gap-x-2'>
                  <img
                    src={chat.messages[0].sender === user.id ? "/images/user-avatar.jpg" : "/images/user-avatar.jpg"}
                    alt="User Avatar"
                    className='w-8 h-8 rounded-full'
                  />
                  <div className={`flex flex-col items-${chat.messages[0].sender === user.id ? 'end' : 'start'}`}>
                    <div className='flex justify-between w-full'>
                      <Typography variant="body2" weight="medium" color="primary">
                        {chat.messages[0].sender === user.id ? user.username : otherUser}
                      </Typography>
                      <Typography variant="body2" weight="regular" color="secondary">
                        {new Date(chat.messages[0].timestamp).toLocaleTimeString()}
                      </Typography>
                    </div>
                    <div
                      className={`${
                        chat.messages[0].sender === user.id ? 'bg-green-200 border-green-400' : 'bg-light-purple border-purple'
                      } p-2 rounded-lg border`}
                    >
                      <Typography variant="body1" weight="regular" color="primary">
                        {chat.messages[0].text}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center p-4 border-t'>
          <textarea
            className='flex-grow p-2 border-2 rounded-lg resize-none bg-white'
            placeholder='Type your message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <FaPaperclip size={20} className='mx-2 cursor-pointer' />
          <button className='p-2 bg-blue-500 text-white rounded-lg flex items-center' onClick={handleSendMessage}>
            <FaPaperPlane size={20} className='mr-2' />
            <Typography variant="body1" weight="semiBold" color="white">
              Send
            </Typography>
          </button>
        </div>
      </article>
    </div>
  );
};

export default ChatBox;