"use client";
import React, { useEffect, useState } from "react";
import { Avatar } from "@heroui/react";

type MessageProps = {
  sender: string;
  text: string;
  time: string;
  avatar: string;
  unreadMessages: number;
};

const MessageItem: React.FC<MessageProps> = ({ sender, text, time, avatar, unreadMessages }) => {
  const [color, setColor] = useState<string>("primary");

  //  Use the already assigned color from localStorage
  useEffect(() => {
    try {
      const storedColors = JSON.parse(localStorage.getItem("userColors") || "{}");
      if (storedColors[sender]) {
        setColor(storedColors[sender]); //  Use stored color
      }
    } catch (error) {
      console.error("Error retrieving user colors from localStorage:", error);
    }
  }, [sender]);

  return (
    <div className="my-1 p-3 rounded-lg shadow-sm flex items-center space-x-3 relative cursor-pointer">
      {/*  Avatar with Consistent Border Color */}
      <div className="relative">
        <Avatar
          src={avatar}
          alt={`${sender}'s Avatar`}
          size="sm"
          className={`shadow-md border border-${color}`} //  Use stored color
          isBordered
          color={color}
        />

        {/*  Unread Messages Badge */}
        {unreadMessages > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {unreadMessages}
          </span>
        )}
      </div>

      {/*  Sender & Message Preview */}
      <div className="flex-1">
        <h3 className={`text-${color} text-sm font-semibold`}>{sender}</h3> {/*  Name color matches stored color */}
        <p className="text-default-600 text-xs truncate">{text}</p>
      </div>

      {/*  Time Display */}
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
};

export default MessageItem;
