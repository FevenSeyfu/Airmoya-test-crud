import React from 'react';
import { FaArrowLeft, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import Typography from '../utility/Typography/Typography';

const ChatBox = ({ handleChatToggle }) => {
  return (
    <div className='w-full flex flex-col gap-y-2 border-4 border-red-700'>
      <div onClick={handleChatToggle} className='flex flex-row items-center gap-x-4 border-b py-4 cursor-pointer'>
        <FaArrowLeft size={20} />
        <Typography variant="h4" weight="medium" color="primary">
          Back
        </Typography>
      </div>
      <article className='flex flex-col flex-grow w-full min-h-[60vh]'>
        <div className='flex flex-col-reverse flex-grow overflow-y-auto p-4'>
          <div className='flex flex-col gap-y-4'>
            {/* Current User Message */}
            <div className='self-end flex flex-col items-end'>
              <div className='flex items-center gap-x-2'>
                <img src="/images/user-avatar.jpg" alt="User Avatar" className='w-8 h-8 rounded-full' />
                <div className='flex flex-col items-end'>
                  <div className='flex justify-between w-full'>
                    <Typography variant="body2" weight="medium" color="primary">
                      User
                    </Typography>
                    <Typography variant="body2" weight="regular" color="secondary">
                      12:00 PM
                    </Typography>
                  </div>
                  <div className='bg-green-200 border border-green-400 p-2 rounded-lg'>
                    <Typography variant="body1" weight="regular" color="primary">
                      User's message
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            {/* Other User Message */}
            <div className='self-start flex flex-col items-start'>
              <div className='flex items-center gap-x-2'>
                <img src="/images/user-avatar.jpg" alt="User Avatar" className='w-8 h-8 rounded-full' />
                <div className='flex flex-col items-start'>
                  <div className='flex justify-between w-full'>
                    <Typography variant="body2" weight="medium" color="primary">
                      Other User
                    </Typography>
                    <Typography variant="body2" weight="regular" color="secondary">
                      12:01 PM
                    </Typography>
                  </div>
                  <div className='bg-light-purple border border-purple p-2 rounded-lg'>
                    <Typography variant="body1" weight="regular" color="primary">
                      Other user's message
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center p-4 border-t'>
          <textarea
            className='flex-grow p-2 border-2 rounded-lg resize-none md:flex-grow lg:flex-grow bg-white'
            placeholder='Type your message...'
          />
          <FaPaperclip size={20} className='mx-2 cursor-pointer' />
          <button className='p-2 bg-blue-500 text-white rounded-lg flex items-center'>
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