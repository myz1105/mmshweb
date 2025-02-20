"use client";
import {
  Avatar,
  Input,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import React, { useState, useRef } from "react";
import { TbCameraPlus } from "react-icons/tb";
// import Modal from "../image-tools/image-modal";
import ImageCropper, { ImageCropperRef } from "../image-tools/image-crop";

const EnterClientInfo: React.FC = () => {
  const avatarUrl = useRef<string>(
    "https://avatarfiles.alphacoders.com/161/161002.jpg"
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const imageCropperRef = useRef<ImageCropperRef | null>(null);

  const updateAvatar = (imgSrc: string): void => {
    avatarUrl.current = imgSrc;
  };

  const handleCropImage = () => {
    if (imageCropperRef.current) {
      imageCropperRef.current.cropImage(); // Call the cropImage function from child
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pb-2 w-full gap-4">
      <div className=" relative mb-8">
        <Image
          isZoomed
          src={avatarUrl.current}
          alt="Avatar"
          width={150}
          height={150}
        />
        <Button
          isIconOnly
          onPress={onOpen}
          className="absolute z-10 -bottom-2 -right-2"
        >
          <TbCameraPlus />
        </Button>
      </div>

      <Input
        label="Name"
        type="text"
        variant="underlined"
        classNames={{
          input: ["capitalize"],
        }}
        required
      />
      <Input
        label="Surname"
        type="text"
        variant="underlined"
        classNames={{
          input: ["capitalize"],
        }}
      />
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">
                Set image
              </ModalHeader>
              <ModalBody>
                <ImageCropper
                  updateAvatar={updateAvatar}
                  closeModal={onClose}
                  ref={imageCropperRef}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleCropImage}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
        
      )} */}
    </div>
  );
};

export default EnterClientInfo;
