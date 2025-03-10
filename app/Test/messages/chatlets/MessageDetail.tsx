"use client";
import React, { useEffect, useState } from "react";
import { User, Textarea, Avatar, Divider, Button } from "@heroui/react";
import { IoMdArrowBack } from "react-icons/io";
import { GoPaperclip } from "react-icons/go";
import { FaMicrophoneAlt } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";

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
  isOnline: boolean;
  goBack: () => void;
};

const MessageDetail: React.FC<MessageDetailProps> = ({
  sender,
  text,
  time,
  avatar,
  replies,
  isOnline,
  goBack,
}) => {
  const [userColors, setUserColors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    try {
      const storedColors = JSON.parse(
        localStorage.getItem("userColors") || "{}"
      );
      setUserColors(storedColors);
    } catch (error) {
      console.error("Error parsing user colors from localStorage:", error);
    }
  }, []);

  // Ensure colors remain the same for each sender
  const getColor = (user: string) => userColors[user] || "primary";

  // Sort messages in order of time
  var msgs = replies
    ? [{ sender, text, time, avatar }, ...replies]
    : [{ sender, text, time, avatar }];
  const allMessages = msgs.sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  // Check user is writing or not
  const [writing, setWriting] = useState<string>("");
  const maxCharacters = 1000;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWriting = event.target.value;
    if (newWriting.length <= maxCharacters) {
      setWriting(newWriting);
    }
  };

  const router = useRouter();

  return (
    <div className="flex flex-col w-full h-full">
      {/* Header with Avatar and Name */}
      <div className="w-full h-[12vh] min-h-[60px] max-h-[70px]  flex items-center px-2 gap-3 rounded-md relative">
        <Button
          isIconOnly
          variant="light"
          size="sm"
          className="sm:hidden"
          onPress={() => {
            goBack();
          }}
        >
          <IoMdArrowBack className="text-gray-600" size={24} />
        </Button>
        <User
          avatarProps={{
            isBordered: true,
            src: avatar,
          }}
          description="Manager"
          name={sender}
          classNames={{ name: "font-bold" }}
        />
      </div>
      <Divider className="w-full  border-none h-[.7px]" />

      <div className="p-3 rounded-lg shadow-sm flex flex-col grow gap-3 overflow-auto max-h-[75vh] ">
        {allMessages.map((msg, index) => {
          return (
            <div
              key={index}
              className={`flex gap-3 ${msg.sender === sender ? "items-start" : "items-end flex-row-reverse"}`}
            >
              {(index === 0 ||
                allMessages[index - 1].sender !== msg.sender) && (
                <Avatar
                  src={msg.avatar || avatar}
                  alt={`${msg.sender}'s Avatar`}
                  size="sm"
                  className={`mt-2 shadow-md`}
                />
              )}

              <div className="text-default-900 bg-default-100 max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[450px] xl:max-w-[500px] p-3 rounded-lg whitespace-pre-wrap">
                <div className="flex justify-between w-full">
                  <span className={`text-[15px] font-semibold`}>
                    {msg.sender}
                  </span>
                  <span className="text-[12px] text-default-600">
                    {msg.time}
                  </span>
                </div>
                <p className="text-[15px] text-default-600">{msg.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex-none p-3 min-h-[9vh] min-h-[55px]">
        {/* <Textarea
          placeholder="Write your messages here..."
          onChange={handleChange}
          maxLength={maxCharacters}
          size="sm"
          startContent={
            <div>
              <GoPaperclip size={25} />
            </div>
          }
          endContent={
            <div>
              <div className="p-2">
                {writing.trim() ? (
                  <BsSendFill size={25} />
                ) : (
                  <FaMicrophoneAlt size={25} />
                )}
              </div>
              <div style={{ fontSize: "12px", alignSelf: "flex-end" }}>
                {writing.length}/{maxCharacters}
              </div>
            </div>
          }
        /> */}
        <Textarea
          minRows={1}
          maxRows={5}
          placeholder="Write your messages here..."
          onChange={handleChange}
          maxLength={maxCharacters}
          startContent={
            <div>
              <GoPaperclip size={25} />
            </div>
          }
          endContent={
            <div>
              <div className="p-1">
                {writing.trim() ? (
                  <BsSendFill size={22} />
                ) : (
                  <FaMicrophoneAlt size={22} />
                )}
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default MessageDetail;
