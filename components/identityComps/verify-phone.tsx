"use client";
import { InputOtp, Button, Alert } from "@heroui/react";
import React, { useState, useRef, useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";

interface VerifyNumberProps {
  onUpdate: (code: string) => void; // Callback function type
}

export default function VerifyPhone({ onUpdate }: VerifyNumberProps) {
  const [timeLeft, setTimeLeft] = useState<number>(60); // Timer set for 60 seconds
  const [isActive, setIsActive] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startTimer();
  }, []);
  const startTimer = () => {
    if (isActive) return; // Prevent multiple intervals
    setIsActive(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setIsActive(false);
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setTimeLeft(60); // Reset to 60 seconds
  };

  return (
    <div className="flex flex-col items-center justify-center pb-2 w-full gap-4">
      <InputOtp length={5} variant="bordered" onValueChange={onUpdate} />
      <Alert
        color={timeLeft === 0 ? "primary" : "default"}
        endContent={
          timeLeft === 0 && (
            <Button
              color="primary"
              variant="light"
              onPress={() => {
                setTimeLeft(60);
                startTimer();
              }}
            >
              Send
            </Button>
          )
        }
        title={
          timeLeft === 0
            ? "Try again"
            : `You can send another SMS in just ${timeLeft} seconds`
        }
      />
    </div>
  );
}

export function VerifyPhoneHeader({
  phoneNumber,
  onEditPressed,
}: {
  phoneNumber: string;
  onEditPressed: () => void;
}) {
  return (
    <div className="flex flex-col items-center pb-2">
      <div className="flex items-center">
        <h1 className="text-3xl font-medium m-2">{phoneNumber}</h1>
        <Button isIconOnly variant="light" onPress={onEditPressed}>
          <MdOutlineEdit className="text-2xl" color="gray" />
        </Button>
      </div>
      <p className="text-small text-default-500 text-center">
        We've sent the code to your phone number.
      </p>
    </div>
  );
}
