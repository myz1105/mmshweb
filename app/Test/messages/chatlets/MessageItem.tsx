"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Badge, Button, Chip } from "@heroui/react";

type MessageProps = {
  sender: string;
  text: string;
  time: string;
  avatar: string;
  unreadMessages: number;
  color: any;
  isSelected: boolean;
};

const MessageItem: React.FC<MessageProps> = ({
  sender,
  text,
  time,
  avatar,
  unreadMessages,
}) => {
  const [color, setColor] = useState<string>("primary");

  //  Use the already assigned color from localStorage
  useEffect(() => {
    try {
      const storedColors = JSON.parse(
        localStorage.getItem("userColors") || "{}",
      );
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
        {unreadMessages > 0 ? (
          <Badge
            content={" "}
            placement="bottom-right"
            size="sm"
            color="success"
          >
            <Avatar
              src={avatar}
              alt={`${sender}'s Avatar`}
              size="sm"
              className={`shadow-md border border-${color}`} // Use stored color
              isBordered
            />
          </Badge>
        ) : (
          <Avatar
            src={avatar}
            alt={`${sender}'s Avatar`}
            size="sm"
            className={`shadow-md border border-${color}`} // Use stored color
            isBordered
          />
        )}
      </div>

      {/*  Sender & Message Preview */}
      <div className="w-full  ">
        <div className="flex w-full justify-between items-start">
          <div className={`text-${color} text-sm font-semibold`}>{sender}</div>

          <span className="text-xs text-gray-400 self-center">{time}</span>
        </div>

        {/*  Time Display */}
        <div className="flex w-full justify-between items-start">
          <p className="text-default-600 text-xs truncate">{text}</p>
          <div
            className={`flex justify-center items-center py-[1] px-2 w-fit text-[11px] ${unreadMessages === 0 ? "hidden" : "bg-green-600 text-white"} rounded-lg`}
          >
            {unreadMessages}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
