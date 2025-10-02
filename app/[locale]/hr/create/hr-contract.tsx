"use client";

import {
  Badge,
  Checkbox,
  Chip,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  User,
} from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { Button } from "@heroui/button";
import { DM_Sans } from "next/font/google";

import {
  loadFaceApiModels,
  getFaceDescriptor,
  compareFaceDescriptors,
  cropFaceFromImage,
} from "../utils/face-detect-utils";
import { useHRCreation } from "../contexts/hr-creation-context";
import { Icon } from "@iconify/react";
import { contactIconMap } from "../../shipping/types";

export default function HRContract() {
  const [image, setImage] = useState<string>("");
  const [cropped, setCropped] = useState<string>("");
  const [pImage, setPImage] = useState("");
  const [pFace, setPFace] = useState("");
  const webcamRef = useRef<Webcam>(null);
  const [takePhoto, setTakePhoto] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [detecting, setDetecting] = useState<boolean>(false);
  const [detectionError, setDetectionError] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [match, setMatch] = useState<{
    match: boolean;
    distance: number;
  } | null>();

  const { contract, updateContract, modelsLoaded, employee, contractUrl } =
    useHRCreation();

  // Webcam settings
  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
  };
  useEffect(() => {
    if (!showModal) {
      if (contract.agreed && (cameraError || !image)) {
        handleAgreement(false);
      }
    }
  }, [showModal]);

  useEffect(() => {
    let originalUrl: string | null = null;
    let faceUrl: string | null = null;

    if (contract.originalImage) {
      originalUrl = URL.createObjectURL(contract.originalImage);
      setImage(originalUrl);
    }

    if (contract.face) {
      faceUrl = URL.createObjectURL(contract.face);
      setCropped(faceUrl);
    }

    return () => {
      if (originalUrl) {
        URL.revokeObjectURL(originalUrl);
      }
      if (faceUrl) {
        URL.revokeObjectURL(faceUrl);
      }
    };
  }, [contract]);
  useEffect(() => {
    let originalUrl: string | null = null;

    if (employee.passport && employee.passport.frontSide) {
      originalUrl = URL.createObjectURL(employee.passport.frontSide);
      setPImage(originalUrl);
    }

    return () => {
      if (originalUrl) {
        URL.revokeObjectURL(originalUrl);
      }
    };
  }, [employee]);

  // Load face-api models

  useEffect(() => {
    let detectInterval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const detect = async () => {
      if (
        webcamRef.current &&
        webcamRef.current.video &&
        modelsLoaded &&
        !image
      ) {
        const video = webcamRef.current.video as HTMLVideoElement;
        const detections = await faceapi.detectSingleFace(
          video,
          new faceapi.TinyFaceDetectorOptions(),
        );

        if (detections) {
          const screenshot = webcamRef.current.getScreenshot();
          if (screenshot) {
            const cropped = await cropFaceFromImage(screenshot);

            const pCropped = await cropFaceFromImage(pImage);
            setImage(screenshot);
            setCropped(cropped ? cropped : "");
            setPFace(pCropped ? pCropped : "");
            setDetecting(false);
            setDetectionError(false);
          }
        }
      }
    };

    if (showModal && modelsLoaded && !image) {
      setDetecting(true);
      setDetectionError(false);
      detectInterval = setInterval(detect, 500);

      timeout = setTimeout(() => {
        clearInterval(detectInterval);
        setDetecting(false);
        setDetectionError(true);
      }, 5000); // Stop after 10 seconds if face not detected
    }

    return () => {
      clearInterval(detectInterval);
      clearTimeout(timeout);
    };
  }, [showModal, modelsLoaded, image]);

  useEffect(() => {
    const compare = async () => {
      if (cropped && pFace) {
        var d1 = await getFaceDescriptor(image);
        var d2 = await getFaceDescriptor(pImage);
        if (d1 && d2) {
          var result = compareFaceDescriptors(d1, d2);
          console.log("Face match result:", result);
          setMatch(result);
          setTimeout(() => {
            setShowModal(false);
          }, 2000);
        }
      }
    };

    if (image && cropped && pFace && showModal && !match) {
      compare();
    }
    if (image && cropped && pFace && match && !match.match) {
      setTimeout(() => {
        handleAgreement(false);
      }, 2000);
    }
  }, [cropped, pFace, showModal, match]);

  useEffect(() => {
    if (contract.agreed) {
      setShowModal(true);
      setTakePhoto(true);
    } else {
      setImage("");
      setMatch(null);
    }
  }, [contract]);

  const handleAgreement = (value: boolean) => {
    if (contract) {
      updateContract({ ...contract, agreed: value });
    } else {
      updateContract({ agreed: value });
    }
  };

  return (
    <div className="max-w-3xl flex flex-col justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold">Contract</div>

      <iframe
        src={contractUrl}
        width="100%"
        height="600px"
        className="border border-gray-300"
      ></iframe>

      <div className="mt-4">
        <Checkbox
          isSelected={contract.agreed}
          onValueChange={handleAgreement}
          content="agreement"
        >
          <span>I have read and agree to the terms above.</span>
        </Checkbox>
      </div>

      {contract.agreed && (
        <div className="mt-4 w-full">
          {cropped && (
            <div className="grid grid-cols-2 w-full mb-7">
              <div className="relative">
                <h2 className="my-2 font-bold">First Party</h2>
                <Badge
                  content={
                    <Image
                      src="/documents/approved.png"
                      width={100}
                      classNames={{ wrapper: "opacity-50" }}
                    ></Image>
                  }
                  placement="bottom-right"
                  classNames={{
                    badge: "bg-transparent border-none",
                  }}
                >
                  <User
                    name={
                      employee ? employee.name + " " + employee.surname : ""
                    }
                    description={
                      employee &&
                      employee.contacts &&
                      employee.contacts.map(
                        (contact: { id: number; type: string; data: string }) =>
                          contact.type &&
                          contact.data && (
                            <Chip
                              variant="flat"
                              radius="sm"
                              size="sm"
                              key={contact.id}
                              color="default"
                            >
                              <div className="flex gap-1 items-center">
                                {
                                  contactIconMap[
                                    contact.type as keyof typeof contactIconMap
                                  ]
                                }
                                <span> {contact.data}</span>
                              </div>
                            </Chip>
                          ),
                      )
                    }
                    avatarProps={{ src: cropped }}
                  />
                </Badge>
              </div>
              <div>
                <h2 className="my-2 font-bold">Second Party</h2>
                <User
                  name="MMSH LOGISTIC LUX MCHJ"
                  description="998937888866"
                  avatarProps={{ src: "/documents/mmsh.jpg" }}
                />
              </div>

              {/* <Image src={image} alt="Captured" /> */}
            </div>
          )}
        </div>
      )}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Face Verification
              </ModalHeader>
              <ModalBody>
                {!cameraError && !image && (
                  <p className="mb-4">
                    Please look at the camera. Detecting your face...
                  </p>
                )}
                {cameraError ? (
                  <div className="text-red-500">
                    ❌ Camera access denied. Please allow access to your camera
                    in the browser settings and try again.
                  </div>
                ) : modelsLoaded && !image ? (
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/png"
                    screenshotQuality={1}
                    videoConstraints={videoConstraints}
                    width={640}
                    height={480}
                    onUserMediaError={(err) => {
                      console.error("Camera access denied:", err);
                      setCameraError(true);
                      setDetecting(false);
                    }}
                  />
                ) : image ? (
                  <div className="flex flex-row gap-10 justify-center items-center">
                    {cropped && <Image src={cropped} width={50}></Image>}
                    {match ? (
                      match.match ? (
                        <Icon
                          icon="line-md:confirm"
                          className="text-green-700 font-bold"
                          fontSize={50}
                        ></Icon>
                      ) : (
                        <Icon
                          icon="line-md:close"
                          className="text-red-700 font-bold"
                          fontSize={50}
                        ></Icon>
                      )
                    ) : (
                      <Spinner size="md" />
                    )}
                    {pFace && <Image src={pFace} width={50}></Image>}
                  </div>
                ) : (
                  <p>Loading face detection models...</p>
                )}
              </ModalBody>
              <ModalFooter>
                {detecting && (
                  <p className="text-sm text-gray-500">Detecting face...</p>
                )}
                {!cameraError && detectionError && (
                  <>
                    <p className="text-sm text-red-500">
                      ❌ Your face was not detected. Please try again.
                    </p>
                    <Button
                      onPress={() => {
                        setDetectionError(false);
                        setShowModal(false);
                        setTimeout(() => setShowModal(true), 100); // Re-open modal to restart detection
                      }}
                      color="danger"
                    >
                      Retry
                    </Button>
                  </>
                )}
                {cameraError && (
                  <Button
                    onPress={() => {
                      setCameraError(false);
                      setShowModal(false);

                      setTimeout(() => {
                        handleAgreement(true);
                        setShowModal(true);
                      }, 100); // Retry opening modal
                    }}
                    color="primary"
                  >
                    Retry
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
