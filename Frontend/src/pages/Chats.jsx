import React, { useState } from 'react';
import Typography from '../components/utility/Typography/Typography';
import SearchBox from '../components/Chat/SearchBox';
import ChatRoomList from '../components/Chat/ChatRoomsList/ChatRoomList';
import ChatBox from '../components/Chat/ChatBox';

const chats = [
  {
    id: 1,
    name: 'user 1',
    message: 'Lorem ipsum dolor sit amet consectetur adipiscing elit feug'
  },
  {
    id: 2,
    name: 'user 2',
    message: 'Lorem ipsum dolor sit amet consectetur adipiscing elit feug'
  },
  {
    id: 3,
    name: 'user 3',
    message: 'Lorem ipsum dolor sit amet consectetur adipiscing elit feug'
  },
];

const Chats = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChatToggle = () => {
    setIsChatOpen(prevState => !prevState);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <article className={`h-full flex flex-col items-start bg-white border border-dark-blue rounded-2xl shadow-md shadow-purple p-4 md:p-6 gap-y-4 md:gap-y-12 `}>
      <Typography variant="h1" weight="strong" color="primaryHeading">
        Chat Room
      </Typography>
      <div className={`h-full w-full flex ${isChatOpen ? 'flex-row justify-between' : 'flex-col'} gap-y-4 md:gap-y-8 items-start`}>
        <div className={`flex flex-col gap-y-4 md:gap-y-8 ${isChatOpen ? 'w-1/3 hidden pr-4 border-r lg:flex' : 'w-full'}`}>
          <SearchBox isChatOpen={isChatOpen} onSearch={handleSearch} />
          <ChatRoomList chats={filteredChats} onChatClick={handleChatToggle} />
        </div>
        {isChatOpen && (
          <div className="w-full lg:w-[65%] flex justify-end">
            <ChatBox handleChatToggle={handleChatToggle}/>
          </div>
        )}
      </div>
    </article>
  );
};

export default Chats;