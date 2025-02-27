"use client";
import React, { useState, useEffect } from "react";
import { Divider } from "@heroui/react";
import MessageList from "./chatlets/MessageList";
import MessageDetail from "./chatlets/MessageDetail";
import { messages } from "./data";

const MessagesPage: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<any>();

  // Load the saved chat from localStorage on mount
  useEffect(() => {
    const storedMessage = localStorage.getItem("selectedMessage");
    if (storedMessage) {
      setSelectedMessage(JSON.parse(storedMessage));
    } else {
      setSelectedMessage(messages[0]); // Default to first message if none is saved
    }
  }, []);

  // Save selected message to localStorage whenever it changes
  useEffect(() => {
    if (selectedMessage) {
      localStorage.setItem("selectedMessage", JSON.stringify(selectedMessage));
    }
  }, [selectedMessage]);

  const handleGoBack = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="flex h-full mx-1 mb-5 absolute w-full pr-2 pb-1">
      <div className="border rounded-xl w-full border-default flex flex-row">
        {/* Messages List */}
        <div
          className={`p-1 md:basis-1/3 sm:basis-1/2 basis-full overflow-auto ${selectedMessage ? "hidden sm:block" : "block"}`}
        >
          <MessageList onMessageSelect={setSelectedMessage} />
        </div>

        <Divider orientation="vertical" className="hidden sm:block w-[.7px]" />

        {/* Message Details - Persisting selection after refresh */}
        {selectedMessage && (
          <div className="flex flex-col md:basis-2/3 sm:basis-1/2 basis-full sm:block">
            <MessageDetail
              sender={selectedMessage.sender}
              text={selectedMessage.text}
              time={selectedMessage.time}
              avatar={selectedMessage.avatar}
              replies={selectedMessage.replies || []}
              isOnline={selectedMessage.isOnline}
              goBack={handleGoBack}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
