import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  useDisclosure,
  Input,
  User,
  ListboxItem,
  Listbox,
  Avatar,
  Selection,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  CountryData,
  defaultCountries,
  DialCodePreview,
  getActiveFormattingMask,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";

interface ContactsModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function ContactsModal({
  isOpen,
  onOpenChange,
}: ContactsModalProps) {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();
  const [values, setValues] = React.useState<Selection>(new Set(["1"]));
  const [contacts, setContacts] = useState(users);
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
              <ModalHeader className="flex flex-col gap-1">
                <div className="w-full flex flex-col gap-1">
                  <div className="flex w-80 gap-1 items-center">
                    <h1>Contacts</h1>
                    <Button isIconOnly size="sm" variant="light">
                      <Icon
                        icon="mdi:sort-clock-ascending-outline"
                        fontSize={22}
                        className="text-default-600"
                      />
                    </Button>
                  </div>
                  <Input
                    placeholder="Search"
                    startContent={
                      <Icon
                        icon="ri:search-line"
                        className="text-default-600"
                        fontSize={20}
                      />
                    }
                    onChange={(e) => {
                      const searchValue = e.target.value.toLowerCase();
                      setContacts(
                        users.filter((user) =>
                          user.name.toLowerCase().includes(searchValue)
                        )
                      );
                    }}
                  ></Input>
                </div>
              </ModalHeader>
              <ModalBody>
                <ListboxWrapper>
                  <Listbox
                    className="w-full"
                    items={contacts}
                    label="Assigned to"
                    selectionMode="single"
                    variant="flat"
                    onSelectionChange={setValues}
                    emptyContent={"No items found"}
                    hideSelectedIcon
                  >
                    {(item) => (
                      <ListboxItem
                        key={item.id}
                        textValue={item.name}
                        onDoubleClick={() => {}}
                        endContent={
                          <Dropdown>
                            <DropdownTrigger>
                              <Button isIconOnly variant="light" size="sm">
                                <Icon
                                  icon="nrk:more"
                                  fontSize={20}
                                  className="text-default-600"
                                />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                              aria-label="Dropdown menu with description"
                              variant="faded"
                            >
                              <DropdownItem
                                key="open"
                                description="Open profile"
                                startContent={
                                  <Icon
                                    icon="ion:open-outline"
                                    fontSize={20}
                                    className="text-default-600"
                                  />
                                }
                              >
                                Open
                              </DropdownItem>
                              <DropdownItem
                                key="write"
                                description="Write message in the chat"
                                startContent={
                                  <Icon
                                    icon="line-md:chat"
                                    fontSize={20}
                                    className="text-default-600"
                                  />
                                }
                              >
                                Write
                              </DropdownItem>
                              <DropdownItem
                                key="edit"
                                showDivider
                                description="Allows you to edit the contact"
                                startContent={
                                  <Icon
                                    icon="line-md:edit"
                                    fontSize={20}
                                    className="text-default-600"
                                  />
                                }
                              >
                                Edit file
                              </DropdownItem>
                              <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                description="Permanently delete the contact"
                                startContent={
                                  <Icon
                                    icon="mdi:delete-outline"
                                    fontSize={20}
                                  />
                                }
                              >
                                Delete file
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        }
                      >
                        <User
                          name={item.name}
                          description={item.email}
                          avatarProps={{ src: item.avatar }}
                        ></User>
                      </ListboxItem>
                    )}
                  </Listbox>
                </ListboxWrapper>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onAddOpen();
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
      <AddContact isOpen={isAddOpen} onOpenChange={onAddOpenChange} />
    </>
  );
}

export const ListboxWrapper = ({ children }: { children: any }) => (
  <div className="w-full py-2 ">{children}</div>
);

export function AddContact({ isOpen, onOpenChange }: ContactsModalProps) {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "uz",
      value: "",
      countries: defaultCountries,
    });

  return (
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
        {(handleClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="w-full flex flex-col gap-1">
                <h1>Add contact</h1>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="w-full my-3 flex flex-col gap-2">
                <Input
                  label="Name"
                  type="text"
                  variant="underlined"
                  classNames={{
                    input: ["capitalize"],
                  }}
                  startContent={
                    <Icon
                      icon="weui:contacts-outlined"
                      fontSize={24}
                      className="mt-2"
                    ></Icon>
                  }
                  required
                />
                <Input
                  label="Surname"
                  type="text"
                  variant="underlined"
                  classNames={{
                    input: ["capitalize"],
                  }}
                  startContent={
                    <Icon
                      icon="weui:contacts-outlined"
                      fontSize={24}
                      className="mt-2"
                    ></Icon>
                  }
                />
                <Input
                  label="Phone number"
                  value={inputValue}
                  onChange={handlePhoneValueChange}
                  variant="underlined"
                  type="tel"
                  startContent={
                    <Icon
                      icon="ph:phone-light"
                      fontSize={24}
                      className="mt-2"
                    ></Icon>
                  }
                  ref={inputRef}
                  required
                ></Input>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleClose}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Sr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "C.M.",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "S. Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    name: "Brian Kim",
    role: "P. Manager",
    team: "Management",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
    email: "brian.kim@example.com",
    status: "active",
  },
  {
    id: 7,
    name: "Michael Hunt",
    role: "Designer",
    team: "Design",
    status: "paused",
    age: "27",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
    email: "michael.hunt@example.com",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    role: "HR Manager",
    team: "HR",
    status: "active",
    age: "31",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png",
    email: "samantha.brooks@example.com",
  },
  {
    id: 9,
    name: "Frank Harrison",
    role: "F. Manager",
    team: "Finance",
    status: "vacation",
    age: "33",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png",
    email: "frank.harrison@example.com",
  },
  {
    id: 10,
    name: "Emma Adams",
    role: "Ops Manager",
    team: "Operations",
    status: "active",
    age: "35",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png",
    email: "emma.adams@example.com",
  },
  {
    id: 11,
    name: "Brandon Stevens",
    role: "Jr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/7.png",
    email: "brandon.stevens@example.com",
  },
  {
    id: 12,
    name: "Megan Richards",
    role: "P. Manager",
    team: "Product",
    status: "paused",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/7.png",
    email: "megan.richards@example.com",
  },
  {
    id: 13,
    name: "Oliver Scott",
    role: "S. Manager",
    team: "Security",
    status: "active",
    age: "37",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/8.png",
    email: "oliver.scott@example.com",
  },
  {
    id: 14,
    name: "Grace Allen",
    role: "M. Specialist",
    team: "Marketing",
    status: "active",
    age: "30",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/8.png",
    email: "grace.allen@example.com",
  },
  {
    id: 15,
    name: "Noah Carter",
    role: "IT Specialist",
    team: "I. Technology",
    status: "paused",
    age: "31",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/9.png",
    email: "noah.carter@example.com",
  },
  {
    id: 16,
    name: "Ava Perez",
    role: "Manager",
    team: "Sales",
    status: "active",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/9.png",
    email: "ava.perez@example.com",
  },
  {
    id: 17,
    name: "Liam Johnson",
    role: "Data Analyst",
    team: "Analysis",
    status: "active",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/11.png",
    email: "liam.johnson@example.com",
  },
  {
    id: 18,
    name: "Sophia Taylor",
    role: "QA Analyst",
    team: "Testing",
    status: "active",
    age: "27",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/11.png",
    email: "sophia.taylor@example.com",
  },
  {
    id: 19,
    name: "Lucas Harris",
    role: "Administrator",
    team: "Information Technology",
    status: "paused",
    age: "32",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/12.png",
    email: "lucas.harris@example.com",
  },
  {
    id: 20,
    name: "Mia Robinson",
    role: "Coordinator",
    team: "Operations",
    status: "active",
    age: "26",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/12.png",
    email: "mia.robinson@example.com",
  },
];
