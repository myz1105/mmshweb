"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { BaseAddress } from "@/types/api";
import { addToast } from "@heroui/toast";
import SimplePeer from "simple-peer";
import { useSignalR } from "./profile-management/signalR-context";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";

const CallServiceContext = createContext<any | undefined>(undefined);

export const CallServiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [peer, setPeer] = useState<SimplePeer.Instance | null>();
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isOpen, onOpenChange } = useDisclosure();

  const { connection } = useSignalR();

  const createOffer = (receiver: string) => {
    const p = new SimplePeer({ initiator: true, trickle: false });

    p.on("signal", (data) => {
      // Send the offer to the target peer via SignalR
      if (connection) {
        connection.invoke("SendSignal", receiver, JSON.stringify(data)); // Replace "targetUser Id" with the actual ID of the peer you want to connect to
      }
    });

    p.on("stream", (stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    });

    setPeer(p);

    // Get user media
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        p.addStream(stream);
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  };

  const VideoCallOffer = () => {
    return (
      <>
        <Modal
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={{
            header: "border-b-[1px] ",
            footer: "border-t-[1px] ",
          }}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody>
                  <div>This is modal body</div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      onClose();
                    }}
                  >
                    Add contact
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <CallServiceContext.Provider
      value={{ peer, isVideoEnabled, setIsVideoEnabled, videoRef }}
    >
      <>
        {children}
        <VideoCallOffer />
      </>
    </CallServiceContext.Provider>
  );
};

export const useCallService = () => {
  const context = useContext(CallServiceContext);
  if (context === undefined) {
    throw new Error("useSignalR must be used within a SignalRProvider");
  }
  return context;
};
