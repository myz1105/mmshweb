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
import AddressBox, {
  FieldState,
} from "@/components/mini_components/addressselector";

interface Contact {
  id: number;
  type: string;
  data: string;
}

const CreateCompanyDetails: React.FC = () => {
  const {
    addContact,
    contacts,
    updateContact,
    addresses,
    updateAddress,
    updateCompany,
    company,
    setCompanyCreateState,
    companyTypes,
  } = useCreateCompany();

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
                  key={contact.id}
                  id={contact.id}
                  type={contact.type}
                  data={contact.data}
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

export const ContactInformation: React.FC<
  Contact & { onChange: (contact: Contact) => void }
> = ({ id, type, data, onChange }) => {
  const { removeContact, addContact } = useCreateCompany();
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ id, type: event.target.value, data });
  };

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ id, type, data: event.target.value });
  };

  const [selectedOption, setSelectedOption] = React.useState<Selection>(
    new Set([type]),
  );

  const labelsMap = {
    Phone: "Phone",
    Telegram: "Telegram",
    Whatsapp: "Whatsapp",
    Instagram: "Instagram",
    Web: "Web",
    Email: "Email",
    Others: "Others",
  };
  const iconMap = {
    Phone: <Icon icon="line-md:phone" fontSize={18} />,
    Telegram: <Icon icon="line-md:telegram" fontSize={18} />,
    Whatsapp: <Icon icon="ic:baseline-whatsapp" fontSize={18} />,
    Instagram: <Icon icon="line-md:instagram" fontSize={18} />,
    Web: <Icon icon="ix:application-screen-globe" fontSize={18} />,
    Email: <Icon icon="line-md:email" fontSize={18} />,
    Others: <Icon icon="hugeicons:contact-01" fontSize={18} />,
  };

  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(
    selectedOption,
  )[0] as keyof typeof labelsMap;

  return (
    <ButtonGroup variant="flat">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Button>
            <div className="flex items-center gap-2">
              {iconMap[selectedOptionValue]}
              <Icon icon="ic:baseline-arrow-drop-down" fontSize={24} />
            </div>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Merge options"
          className="max-w-[300px]"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={(selection) => {
            setSelectedOption(selection);
            onChange({
              id,
              type: labelsMap[
                Array.from(selection)[0] as keyof typeof labelsMap
              ],
              data,
            });
          }}
        >
          <DropdownItem key="Phone">
            <div className="flex items-center gap-2">
              {iconMap["Phone"]}
              {labelsMap["Phone"]}
            </div>
          </DropdownItem>
          <DropdownItem key="Telegram">
            <div className="flex items-center gap-2">
              {iconMap["Telegram"]}
              {labelsMap["Telegram"]}
            </div>
          </DropdownItem>
          <DropdownItem key="Whatsapp">
            <div className="flex items-center gap-2">
              {iconMap["Whatsapp"]}
              {labelsMap["Whatsapp"]}
            </div>
          </DropdownItem>
          <DropdownItem key="Instagram">
            <div className="flex items-center gap-2">
              {iconMap["Instagram"]}
              {labelsMap["Instagram"]}
            </div>
          </DropdownItem>
          <DropdownItem key="Web">
            <div className="flex items-center gap-2">
              {iconMap["Web"]}
              {labelsMap["Web"]}
            </div>
          </DropdownItem>
          <DropdownItem key="Email">
            <div className="flex items-center gap-2">
              {iconMap["Email"]}
              {labelsMap["Email"]}
            </div>
          </DropdownItem>
          <DropdownItem key="Others">
            <div className="flex items-center gap-2">
              {iconMap["Others"]}
              {labelsMap["Others"]}
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Input
        color="default"
        radius="none"
        value={data}
        onChange={handleDataChange}
      />
      {id > 1 && (
        <Button isIconOnly onPress={() => removeContact(id)}>
          <Icon icon="ic:baseline-delete" fontSize={18} />
        </Button>
      )}
      {id === 1 && (
        <Button isIconOnly onPress={() => addContact()}>
          <Icon icon="ic:baseline-add" fontSize={18} />
        </Button>
      )}
    </ButtonGroup>
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
