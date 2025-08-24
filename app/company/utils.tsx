import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Selection,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCreateCompany } from "./contexts/create-company-context";
import React, { useState } from "react";

export interface Contact {
  id: number;
  type: string;
  data: string;
}

export const ContactInformation: React.FC<{
  onChange: (contact: Contact) => void;
  add: () => void;
  remove: (val: any) => void;
  value: Contact;
}> = ({ onChange, add, remove, value }) => {
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, type: event.target.value });
  };

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, data: event.target.value });
  };

  const [selectedOption, setSelectedOption] = React.useState<Selection>(
    new Set([value.type]),
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
              ...value,
              type: labelsMap[
                Array.from(selection)[0] as keyof typeof labelsMap
              ],
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
        value={value.data}
        onChange={handleDataChange}
      />
      {value.id > 1 && (
        <Button isIconOnly onPress={() => remove(value.id)}>
          <Icon icon="ic:baseline-delete" fontSize={18} />
        </Button>
      )}
      {value.id === 1 && (
        <Button isIconOnly onPress={() => add()}>
          <Icon icon="ic:baseline-add" fontSize={18} />
        </Button>
      )}
    </ButtonGroup>
  );
};

export function StarProgressBar({ value = 0, max = 5 }) {
  const percentage = Math.max(0, Math.min(value / max, 1)); // clamp between 0–1

  return (
    <div className="flex ">
      {Array.from({ length: max }).map((_, index) => {
        const fillLevel = Math.min(Math.max(value - index, 0), 1); // 0 to 1 per star

        return (
          <div key={index} className="relative w-6 h-6">
            {/* Background star (empty) */}
            <Icon
              icon="line-md:star-filled"
              className="absolute w-6 h-6 text-gray-200"
            />

            {/* Foreground star (filled) with clipping */}
            <div
              className="absolute top-0 left-0 overflow-hidden h-full"
              style={{ width: `${fillLevel * 100}%` }}
            >
              <Icon
                icon="line-md:star-filled"
                className="w-6 h-6 text-green-800"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface StarRatingInputProps {
  value: number;
  max?: number;
  onChange: (value: number) => void;
}

export const StarRatingInput: React.FC<StarRatingInputProps> = ({
  value,
  max = 5,
  onChange,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const getFillLevel = (index: number): number => {
    const target = hoverIndex !== null ? hoverIndex : value;
    return Math.min(Math.max(target - index, 0), 1);
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const fill = getFillLevel(index);

        return (
          <div
            key={index}
            className="relative w-8 h-8 cursor-pointer"
            onMouseEnter={() => setHoverIndex(index + 1)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => onChange(index + 1)}
          >
            {/* Background star */}
            <Icon
              icon="line-md:star-filled"
              className="absolute w-8 h-8 text-gray-200"
            />

            {/* Foreground fill */}
            <div
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{
                width: `${fill * 100}%`,
                transition: "width 0.2s ease-in-out",
              }}
            >
              <Icon
                icon="line-md:star-filled"
                className="w-8 h-8 text-yellow-400"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
