import React, { useState } from "react";
import Typography from "../components/utility/Typography/Typography";
import Button from "../components/utility/Button/Button";
import SearchBox from "../components/Chat/SearchBox";
import ChatRoomList from "../components/Chat/ChatRoomsList/ChatRoomList";
import ChatBox from "../components/Chat/ChatBox";
import { FaPlus } from "react-icons/fa";

const Chats = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  const handleChatToggle = (room) => {
    setCurrentRoom(room);
    setIsChatOpen((prevState) => !prevState);
  };

  return (
    <article
      className={`h-full flex flex-col items-start bg-white border border-dark-blue rounded-2xl shadow-md shadow-purple p-4 md:p-6 gap-y-4 md:gap-y-12 `}
    >
      <Typography variant="h1" weight="strong" color="primaryHeading">
        Chat Room
      </Typography>
      <div
        className={`h-full w-full flex ${
          isChatOpen ? "flex-row justify-between" : "flex-col"
        } gap-y-4 md:gap-y-8 items-start`}
      >
        <div
          className={`flex flex-col gap-y-4 md:gap-y-8 ${
            isChatOpen ? "w-1/3 hidden pr-4 border-r lg:flex" : "w-full"
          }`}
        >
          <SearchBox isChatOpen={isChatOpen} />
          <div>
            <Button
              type="submit"
              className={`flex mx-auto text-base items-center ${isChatOpen ? 'w-[320px]' : 'w-[450px]'}`}
              onClick={() => handleChatToggle(true)}
            >
              <FaPlus className="w-4 h-4 mr-2" />
              New chat
            </Button>
          </div>
          <ChatRoomList onChatClick={handleChatToggle} />
        </div>
        {isChatOpen && (
          <div className="w-[65%] flex justify-end">
            <ChatBox handleChatToggle={handleChatToggle} currentRoom={currentRoom} />
          </div>
        )}
      </div>
    </article>
  );
};

export default Chats;