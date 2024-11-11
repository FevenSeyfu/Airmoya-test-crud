import React, { useEffect } from "react";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "@redux/chatSlice";
import { fetchUsers } from "@redux/authSlice";

const ChatRoomList = ({ onChatClick }) => {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.chat);
  const { user, userList } = useSelector((state) => state.auth);
  const userId = user.id;

  useEffect(() => {
    dispatch(fetchMessages(userId));
  }, [dispatch, userId]);

  const filteredMessages = messages?.filter((chat) =>
    chat.room.includes(userId)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="w-full h-full flex flex-col gap-y-2">
      {filteredMessages && filteredMessages.length > 0 ? (
        filteredMessages.map((chat) => {
          const lastMessage = chat.messages?.length > 0 ? chat.messages[chat.messages.length - 1] : null;
          const userName = userList.find(
            (user) => user.id !== lastMessage?.receiver
          )?.username || "Unknown User";
          return (
            <Chat
              key={chat?.room}
              userName={userName}
              lastMessage={lastMessage?.text || "No messages"}
              onChatClick={() => onChatClick(chat.room)}
            />
          );
        })
      ) : (
        <p className="text-center text-gray-500">No chats to show</p>
      )}
    </section>
  );
};

export default ChatRoomList;
