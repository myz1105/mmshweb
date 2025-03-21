import React from "react";
import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
  Selection,
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface LanguageProps {
  onBack: () => void;
}

const Language: React.FC<LanguageProps> = ({ onBack }) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["text"]),
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys],
  );

  return (
    <div className="w-full">
      <Button
        variant="flat"
        onPress={onBack}
        size="sm"
        className="flex items-center"
      >
        <Icon icon="ep:back" fontSize={18}></Icon> Back
      </Button>
      <ListboxWrapper>
        <Listbox
          disallowEmptySelection
          aria-label="Single selection example"
          selectedKeys={selectedKeys}
          selectionMode="single"
          variant="flat"
          onSelectionChange={setSelectedKeys}
        >
          <ListboxSection title="Languages">
            <ListboxItem
              key="english"
              showDivider
              className="py-2"
              startContent={<Icon icon="circle-flags:us-um" fontSize={24} />}
            >
              English
            </ListboxItem>
            <ListboxItem
              key="russian"
              showDivider
              className="py-2"
              startContent={<Icon icon="circle-flags:lang-ru" fontSize={24} />}
            >
              Russian
            </ListboxItem>
            <ListboxItem
              key="uzbek"
              showDivider
              className="py-2"
              startContent={<Icon icon="circle-flags:lang-uz" fontSize={24} />}
            >
              Uzbek
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </ListboxWrapper>
    </div>
  );
};

export default Language;

export const ListboxWrapper = ({ children }: { children: any }) => {
  return <div className="w-full  px-1 py-2">{children}</div>;
};
