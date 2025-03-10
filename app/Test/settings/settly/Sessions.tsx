import React from "react";
import { Button, Listbox, ListboxItem, ListboxSection } from "@heroui/react";
import { Icon } from "@iconify/react";

interface SessionProps {
    onBack: () => void;
}

const Sessions: React.FC<SessionProps> = ({ onBack }) => {
  

  return (
    <div className="w-full px-1 py-2">
      <Button variant="flat" onPress={onBack}  size="sm" className="flex items-center"><Icon icon="ep:back" fontSize={18}></Icon> Back</Button>
      <Listbox aria-label="Listbox menu with descriptions" variant="flat">
          <ListboxSection title="This device">
            <ListboxItem
              key="language"
              className="py-3"
              description="This computer"
              startContent={<Icon icon="clarity:devices-line" fontSize={30} />}
            >
              Lenovo
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="Active devices">
            <ListboxItem
              key="devices_1"
              className="py-3"
              description="20.01.2025"
              startContent={<Icon icon="clarity:devices-line" fontSize={30} />}
              endContent={<Button isIconOnly size="sm" variant="light" ><Icon icon="pajamas:remove" fontSize={18} /></Button>}
            >
              Chrome 
            </ListboxItem>
            <ListboxItem
              key="devices_2"
              className="py-3"
              description="20.01.2025"
              startContent={<Icon icon="clarity:devices-line" fontSize={30} />}
              endContent={<Button isIconOnly size="sm" variant="light" ><Icon icon="pajamas:remove" fontSize={18} /></Button>}
            >
              Android 
            </ListboxItem>
            <ListboxItem
              key="devices_3"
              className="py-3"
              description="20.01.2025"
              startContent={<Icon icon="clarity:devices-line" fontSize={30} />}
              endContent={<Button isIconOnly size="sm" variant="light" ><Icon icon="pajamas:remove" fontSize={18} /></Button>}
            >
              IPhone 
            </ListboxItem>
            <ListboxItem
              key="devices_4"
              className="py-3"
              description="20.01.2025"
              startContent={<Icon icon="clarity:devices-line" fontSize={30} />}
              endContent={<Button isIconOnly size="sm" variant="light" ><Icon icon="pajamas:remove" fontSize={18} /></Button>}
            >
              Safari 
            </ListboxItem>
          </ListboxSection>
        </Listbox>
        <Button color="danger" className="mt-2" variant="flat">Terminate other sessions</Button>
    </div>
  );
}

export default Sessions;