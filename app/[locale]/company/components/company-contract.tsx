import {
  Button,
  Card,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Image,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import { FileDropzone } from "../../shipping/utils";
import { useCompany } from "../contexts/company-context";
import { CompanyContractSamples } from "../types";

// Import the wrapper UI from company-details.tsx

interface CompanyContractsProps {
  companyId: string;
}

const enum ContractType {
  EmployeeContract = "EmployeeContract",
  PartnershipAgreement = "PartnershipAgreement",
}

const CompanyContracts: React.FC<CompanyContractsProps> = ({ companyId }) => {
  const {
    currentCompany,
    companyContracts,
    postContractSample,
    isContractSampleLoading,
    fetchCompanyContract,
  } = useCompany();
  const router = useRouter();
  const [file, setFile] = React.useState<File | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentCompanyContractSample, setCurrentCompanyContractSample] =
    React.useState<CompanyContractSamples | null>(null);

  useEffect(() => {
    if (!companyContracts) {
      fetchCompanyContract(companyId);
    }
  }, []);

  if (!currentCompany) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 pt-5">
      <div className="flex justify-between items-center">
        <h5 className="text-md font-semibold mb-2  text-gray-500">
          Employee Contract Sample
        </h5>
        <Button
          isIconOnly
          variant="flat"
          size="sm"
          onPress={() => {
            setCurrentCompanyContractSample(CompanyContractSamples.HRContract);
            console.log("Opening modal for Partnership Contract");
            onOpen();
          }}
        >
          <Icon icon="grommet-icons:document-update" fontSize={20} />
        </Button>
      </div>
      {companyContracts && companyContracts.HRContract && (
        <Card className="shadow rounded-lg p-4 ">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {companyContracts.HRContract?.Name}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This is a sample contract for employees. Please review the terms and
            conditions carefully.
          </p>
          <div className="flex justify-between items-end">
            <div className="flex gap-4">
              <span className="text-sm text-gray-500">
                {(companyContracts.HRContract?.Size / (1024 * 1024)).toFixed(2)}{" "}
                mb
              </span>
              <span className="text-sm text-gray-500">
                {companyContracts.HRContract?.Date &&
                  new Date(
                    companyContracts.HRContract.Date,
                  ).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-end gap-2 px-3 mt-4">
              <Button isIconOnly variant="flat" size="sm">
                <Icon icon="line-md:download" fontSize={20} />
              </Button>

              <Button isIconOnly variant="flat" size="sm" color="danger">
                <Icon icon="line-md:trash" fontSize={20} />
              </Button>
            </div>
          </div>
        </Card>
      )}
      <Divider />

      <div className="flex justify-between items-center">
        <h5 className="text-md font-semibold mb-2  text-gray-500">
          Partnership Agreement Sample
        </h5>
        <Button
          isIconOnly
          variant="flat"
          size="sm"
          onPress={() => {
            setCurrentCompanyContractSample(
              CompanyContractSamples.PartnershipContract,
            );

            onOpen();
          }}
        >
          <Icon icon="grommet-icons:document-update" fontSize={20} />
        </Button>
      </div>
      {companyContracts && companyContracts.PartnershipContract && (
        <Card className="shadow rounded-lg p-4 ">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {companyContracts.PartnershipContract?.Name}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This is a sample partnership agreement. Please review all
            partnership terms and obligations carefully.
          </p>
          <div className="flex justify-between items-end">
            <div className="flex gap-4">
              <span className="text-sm text-gray-500">
                {(
                  companyContracts.PartnershipContract?.Size /
                  (1024 * 1024)
                ).toFixed(2)}{" "}
                mb
              </span>
              <span className="text-sm text-gray-500">
                {companyContracts.PartnershipContract?.Date &&
                  new Date(
                    companyContracts.PartnershipContract.Date,
                  ).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-end gap-2 px-3 mt-4">
              <Button isIconOnly variant="flat" size="sm">
                <Icon icon="line-md:download" fontSize={20} />
              </Button>
              <Button isIconOnly variant="flat" size="sm" color="danger">
                <Icon icon="line-md:trash" fontSize={20} />
              </Button>
            </div>
          </div>
        </Card>
      )}
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">
                Set image
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4 pt-5">
                  <div className="text-lg font-semibold">
                    Employee Contract Samle Upload
                  </div>
                  {!file && (
                    <div className="flex flex-col gap-1 grow">
                      <div className="w-full ">
                        <FileDropzone
                          files={file ? [file] : []}
                          onChange={(val: File[]) => {
                            setFile(val[0]);
                          }}
                          className="border-2 border-dashed border-default min-h-[300px] flex p-1 items-center justify-center rounded-xl bg-content1 backdrop-grayscale"
                          maxFiles={1}
                          accept={{ "application/pdf": [] }}
                        />
                      </div>
                    </div>
                  )}
                  {file && (
                    <div className="w-full rounded-xl border-1 border-default-200 my-1 bg-content1 backdrop-grayscale flex justify-between items-start">
                      <div className="flex gap-3 flex-row items-start p-2">
                        {file.type.startsWith("image/") ? (
                          <Image
                            src={(file as any).preview}
                            width={50}
                            height={50}
                            classNames={{ img: "object-cover" }}
                          />
                        ) : (
                          <Icon
                            icon="fluent-color:document-16"
                            className="h-fit w-fit min-w-[50px]"
                          />
                        )}
                        <p className="text-sm pt-2">{file.name}</p>
                      </div>
                      <div className="p-2 flex flex-col gap-1">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => setFile(null)}
                        >
                          <Icon icon="mynaui:trash" fontSize={20}></Icon>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isDisabled={!file}
                  onPress={() => {
                    if (file && currentCompany) {
                      postContractSample(
                        currentCompany.Id.toString(),
                        file,
                        currentCompanyContractSample,
                      ).then(() => {
                        setFile(null);
                      });
                      onClose();
                    }
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CompanyContracts;
