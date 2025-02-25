"use client";
import React, { useState } from "react";
import MessageItem from "./MessageItem";
import { messages } from "../data";
import { Input } from "@heroui/input";
import { SearchIcon } from "@/components/icons";

type MessageListProps = {
  onMessageSelect: (message: { id: number; sender: string; text: string; time: string; avatar: string; unreadMessages: number }) => void;
  userColors: { [key: string]: string };
};

const MessageList: React.FC<MessageListProps> = ({ onMessageSelect, userColors }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "unread">("all");

  //  Filter and sort messages based on unread count
  const filteredMessages = messages
    .filter((msg) => {
      if (filterType === "unread" && msg.unreadMessages === 0) return false;
      return msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) || msg.text.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => b.unreadMessages - a.unreadMessages); //  Sort by unread messages (highest first)

  return (
    <div className="space-y-2 p-4 rounded-lg h-screen flex flex-col">
      <h1 className="text-lg font-semibold">Chats</h1>

      {/*  Search Input */}
      <Input
        classNames={{
          base: "max-w-full h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper: "h-full font-normal",
        }}
        placeholder="Type to search..."
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/*  Scrollable Message List with Invisible Scrollbar */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => onMessageSelect(msg)}
              className="cursor-pointer hover:bg-default-100 transition rounded-lg"
            >
              <MessageItem 
                sender={msg.sender} 
                text={msg.text} 
                time={msg.time} 
                avatar={msg.avatar}
                color={userColors?.[msg.sender] || "primary"} 
                unreadMessages={msg.unreadMessages || 0} 
                isSelected={false} 
              />
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No messages found</p>
        )}
      </div>
    </div>
  );
};

export default MessageList;
