"use client";
import React, { useEffect, useState } from "react";
import { Avatar } from "@heroui/react";

type ReplyType = {
  sender: string;
  text: string;
  time: string;
  avatar?: string;
};

type MessageDetailProps = {
  sender: string;
  text: string;
  time: string;
  avatar: string;
  replies?: ReplyType[];
};

const MessageDetail: React.FC<MessageDetailProps> = ({ sender, text, time, avatar, replies, isOnline = [] }) => {
  const [userColors, setUserColors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    try {
      const storedColors = JSON.parse(localStorage.getItem("userColors") || "{}");
      setUserColors(storedColors);
    } catch (error) {
      console.error("Error parsing user colors from localStorage:", error);
    }
  }, []);

  // Ensure colors remain the same for each sender
  const getColor = (user: string) => userColors[user] || "primary";

  // Sort messages in order of time
  const allMessages = [{ sender, text, time, avatar }, ...replies].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  return (
    <div className="flex flex-col w-full h-full">
      
      {/* Header with Avatar and Name */}
      <div className="w-full h-[50px] bg-default-100/70 backdrop-blur-md flex items-center px-4 shadow-md rounded-md relative">
        <Avatar
          src={avatar}
          alt={`${sender}'s Avatar`}
          size="md"
          className={`shadow-md border border-${getColor(sender)}`}
          color={getColor(sender)}
        />
        
        <div className="ml-3 flex items-center space-x-2">
          <span className={`font-semibold text-sm text-${getColor(sender)}`}>{sender}</span>
          <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}></span>
        </div>
      </div>



      <div className="p-3 rounded-lg shadow-sm flex flex-col gap-3 overflow-auto">
        {allMessages.map((msg, index) => {
          const messageColor = getColor(msg.sender); // Get sender's assigned color

          return (
            <div 
              key={index} 
              className={`flex gap-3 ${msg.sender === sender ? "items-start" : "items-end flex-row-reverse"}`}
            >
              {/* ✅ Show avatar only for the first message per sender */}
              {(index === 0 || allMessages[index - 1].sender !== msg.sender) && (
                <Avatar
                  src={msg.avatar || avatar}
                  alt={`${msg.sender}'s Avatar`}
                  size="sm"
                  className={`mt-2 shadow-md border border-${messageColor}`} // Ensure consistent color
                  color={messageColor}
                />
              )}

              {/* ✅ Message Content */}
              <div className="text-default-900 bg-default-100 max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[450px] xl:max-w-[500px] p-3 rounded-lg whitespace-pre-wrap">
                {/* Sender and Time in One Line */}
                <div className="flex justify-between w-full">
                  <span className={`text-[15px] font-semibold text-${messageColor}`}>
                    {msg.sender}
                  </span>
                  <span className="text-[12px] text-default-600">{msg.time}</span>
                </div>

                {/* Message Text */}
                <p className="text-[15px] text-default-600">{msg.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageDetail;
