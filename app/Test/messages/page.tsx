"use client";
import React, { useState, useEffect } from "react";
import { Divider } from "@heroui/react";
import MessageList from "./chatlets/MessageList";
import MessageDetail from "./chatlets/MessageDetail";
import { messages } from "./data";

const MessagesPage: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  //  Load the saved chat from localStorage on mount
  useEffect(() => {
    const storedMessage = localStorage.getItem("selectedMessage");
    if (storedMessage) {
      setSelectedMessage(JSON.parse(storedMessage));
    } else {
      setSelectedMessage(messages[0]); // Default to first message if none is saved
    }
  }, []);

  //  Save selected message to localStorage whenever it changes
  useEffect(() => {
    if (selectedMessage) {
      localStorage.setItem("selectedMessage", JSON.stringify(selectedMessage));
    }
  }, [selectedMessage]);

  return (
    <div className="flex h-full mx-1 mb-5">
      <div className="h-full border rounded-xl w-full border-default flex flex-row">
        
        {/* Messages List */}
        <div className={`p-1 h-full w-full sm:basis-1/3 overflow-auto ${selectedMessage ? "hidden sm:block" : "block"}`}>
          <MessageList onMessageSelect={setSelectedMessage} />
        </div>

        <Divider orientation="vertical" className="h-full hidden sm:block" />

        {/* Message Details - Persisting selection after refresh */}
        {selectedMessage && (
          <div className="p-4 flex flex-col w-full sm:basis-2/3 sm:block">
            <div className="flex justify-start">
              <button
                className="mb-2 sm:hidden px-3 py-1 font-semibold hover:bg-default-200 hover:text-default-900 rounded-lg"
                onClick={() => setSelectedMessage(null)}
              >
                ← Back
              </button>
            </div>
            <MessageDetail
              sender={selectedMessage.sender}
              text={selectedMessage.text}
              time={selectedMessage.time}
              avatar={selectedMessage.avatar}
              replies={selectedMessage.replies || []} 
              isOnline={selectedMessage.isOnline}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
