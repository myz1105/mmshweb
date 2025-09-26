import {
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  Selection,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Image,
  Badge,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import React, { useEffect, useState, useRef } from "react";
import {
  useCreateCompany,
  CompanyCreateState,
} from "../contexts/create-company-context";
import ImageCropper, {
  ImageCropperRef,
} from "@/components/image-tools/image-crop";
import { CompanyType } from "./constants";
import { getPlaces } from "@/types/api";
import AddressBox,{
  
  FieldState,
} from "@/components/forms/AddressSelector";
import { Contact, ContactInformation } from "../utils";

const CreateCompanyDetails: React.FC = () => {
  const {
    contacts,
    updateContact,
    addresses,
    updateAddress,
    updateCompany,
    company,
    setCompanyCreateState,
    companyTypes,
    addContact,
    removeContact,
  } = useCreateCompany();
  console.log(contacts);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const imageCropperRef = useRef<ImageCropperRef | null>(null);
  const [imageSource, setImageSource] = useState("");
  const avatarUrl = useRef<string>(
    "https://avatarfiles.alphacoders.com/161/161002.jpg",
  );
  const [places, setPlaces] = useState();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCompany({
      name: event.target.value.toUpperCase(),
      type: company.type,
      inn: company.inn,
      oked: company.oked,
      img: company.img,
    });
  };
  const handleInnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCompany({
      name: company.name,
      type: company.type,
      inn: event.target.value,
      oked: company.oked,
      img: company.img,
    });
  };
  const handleOkedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCompany({
      name: company.name,
      type: company.type,
      inn: company.inn,
      oked: event.target.value,
      img: company.img,
    });
  };
  const handleImgChange = (event: string) => {
    updateCompany({
      name: company.name,
      type: company.type,
      inn: company.inn,
      oked: company.oked,
      img: event,
    });
  };

  useEffect(() => {
    setCompanyCreateState(CompanyCreateState.EnterCompanyDetails);
  }, []);

  useEffect(() => {
    if (imageSource) {
      handleImgChange(imageSource);
    }
  }, [imageSource]);

  const updateAvatar = (imgSrc: string): void => {
    avatarUrl.current = imgSrc;
    setImageSource(imgSrc);
  };

  const handleCropImage = () => {
    if (imageCropperRef.current) {
      imageCropperRef.current.cropImage(); // Call the cropImage function from child
    }
  };

  const handleSelectionChange = (e: any) => {
    const types = companyTypes as CompanyType[];
    const selectedType = types.find((type) => type.Id == e);

    if (selectedType) {
      updateCompany({ ...company, type: selectedType });
    } else {
      console.error("Selected type not found");
    }
  };

  return (
    <div className="max-w-3xl flex flex-col justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Company details</div>
      <div className="text-xl text-default-600 dark:text-default-400">
        Company information
      </div>
      <div className="w-full ">
        <div className="flex flex-wrap items-start justify-start gap-5 w-full p-3">
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
          <Badge
            placement="bottom-right"
            classNames={{
              badge: " bg-transparent border-none",
            }}
            content={
              <Button isIconOnly onPress={onOpen} size="sm">
                <Icon icon="fluent:camera-add-48-regular" fontSize={24} />
              </Button>
            }
          >
            <Image
              isZoomed
              src={avatarUrl.current}
              alt="Avatar"
              width={200}
              height={200}
            />
          </Badge>
          <div className="flex flex-col gap-3 grow">
            <Input
              variant="faded"
              className="grow-3 min-w-[250px]" // Full width on small screens, half width on larger screens
              placeholder="Name"
              description="Company name"
              label="Name"
              labelPlacement="outside"
              required
              value={company.name}
              onChange={handleNameChange}
            />
            <Autocomplete
              label="Type"
              variant="faded"
              className="grow min-w-[250px]" // Full width on small screens, half width on larger screens
              defaultItems={companyTypes}
              labelPlacement="outside"
              placeholder="Company type"
              description="Select company type"
              defaultSelectedKey={company.type?.Id}
              defaultInputValue={company.type?.Shortname}
              onSelectionChange={handleSelectionChange}
              selectorIcon={
                <Icon
                  icon="ic:baseline-search"
                  className="text-default-600 dark:text-default-400"
                />
              }
            >
              {(item: CompanyType) => (
                <AutocompleteItem
                  key={item.Id}
                  title={item.Shortname}
                  description={item.Type}
                ></AutocompleteItem>
              )}
            </Autocomplete>
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full">
            <Input
              variant="faded"
              className="grow-3"
              placeholder="Inn number"
              description="Company INN number"
              label="INN"
              labelPlacement="outside"
              value={company.inn}
              onChange={handleInnChange}
            />
            <Input
              variant="faded"
              className="grow"
              placeholder="OKED number"
              description="Company OKED number"
              label="OKED"
              labelPlacement="outside"
              value={company.oked}
              onChange={handleOkedChange}
            />
          </div>
        </div>
        <div className="text-xl text-default-600 dark:text-default-400 my-2">
          Contacts
        </div>
        <Card shadow="none">
          <CardBody>
            <div className="flex items-start justify-start gap-3 flex-wrap w-full">
              {contacts.map((contact: Contact) => (
                <ContactInformation
                  value={contact}
                  add={() => {
                    addContact();
                  }}
                  remove={(val) => {
                    removeContact(Number(val));
                  }}
                  key={contact.id}
                  onChange={updateContact} // Pass the updateContact function
                />
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="text-xl text-default-600 dark:text-default-400 mt-5">
          Address
        </div>
        <div className="flex flex-col gap-3">
          {addresses.map((address: Address) => (
            <AddressInfo
              key={address.id}
              {...address}
              onChange={updateAddress}
            />
          ))}
        </div>

        <Divider className="my-5 " />
      </div>
    </div>
  );
};

interface Address {
  id: number;
  sattlement: string;
  location: string;
  fieldState?: FieldState;
}

const AddressInfo: React.FC<
  Address & { onChange: (contact: Address) => void }
> = ({ id, sattlement, location, fieldState, onChange }) => {
  const { removeAddress, addAddress, addresses } = useCreateCompany();
  const handleSattlementChange = (event: FieldState) => {
    onChange({ id, sattlement: event.inputValue, location, fieldState: event });
  };
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ id, sattlement, location: event.target.value, fieldState });
  };

  return (
    <Card shadow="none" className="h-fit">
      <CardBody>
        <AddressBox
          value={fieldState}
          onChange={(result) => {
            handleSattlementChange(result);
          }}
        />
        <Input
          variant="faded"
          description="Write address of the company"
          value={location}
          placeholder="Location"
          onChange={handleLocationChange}
          endContent={
            <Button isIconOnly variant="light" className="-mr-2" size="sm">
              <Icon
                icon="line-md:map-marker-plus"
                className="text-default-600 dark:text-default-400"
                fontSize={20}
              />
            </Button>
          }
          type="text"
        />
        <Divider className="my-1" />
        <div className="flex flex-row justify-end items-end w-full">
          {id === addresses.length && (
            <Button
              isIconOnly
              variant="light"
              className="-mr-2 self-center"
              onPress={() => addAddress()}
              size="sm"
            >
              <Icon icon="line-md:plus" fontSize={18} />
            </Button>
          )}
          {id > 1 && (
            <Button
              isIconOnly
              variant="light"
              className="-mr-2 self-center"
              onPress={() => removeAddress(id)}
              size="sm"
            >
              <Icon
                icon="line-md:remove"
                className="text-danger"
                fontSize={18}
              />
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default CreateCompanyDetails;
