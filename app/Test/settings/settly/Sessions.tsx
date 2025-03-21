import React from "react";
import {
  Button,
  Divider,
  Listbox,
  ListboxItem,
  ListboxSection,
  Tooltip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useClient } from "@/contexts/profile-management/client-context";

interface SessionProps {
  onBack: () => void;
}

const Sessions: React.FC<SessionProps> = ({ onBack }) => {
  const { client } = useClient();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0"); // Use getUTCDate for UTC time
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getUTCFullYear();

    return `${day}.${month}.${year}`;
  };

  return (
    <div className="w-full px-1 py-2">
      <Button variant="flat" onPress={onBack} className="flex items-center">
        <Icon icon="ep:back" fontSize={18}></Icon> Back
      </Button>
      <div className="text-xs text-default-500 mt-2 p-2">This device</div>
      <div className="flex p-3 gap-2">
        <Icon icon="clarity:devices-line" fontSize={30} />
        <div className="flex flex-row gap-1">
          <div className="grow">
            <div className="text-sm">{client.CurrentSession.ClientId}</div>
            <div className="text-xs text-default-500">
              {client.CurrentSession.DeviceModel}
            </div>
          </div>
          <div className="flex items-top justify-start">
            <div className="text-xs text-default-500">
              {formatDate(client.CurrentSession.CreatedDate)}
            </div>
          </div>
        </div>
      </div>
      <Divider className="my-2" />

      <div className="flex justify-end">
        <Button color="danger" className="mt-2" variant="flat">
          Terminate other sessions
        </Button>
      </div>

      <Listbox aria-label="Listbox menu with descriptions" variant="flat">
        <ListboxSection title="Active devices">
          {client.Sessions.map(
            (session: any) =>
              client.CurrentSession.ClientId !== session.ClientId ? (
                <ListboxItem
                  key={session.ClientId}
                  className="py-3"
                  classNames={{
                    description: "max-w-lg",
                  }}
                  description={session.DeviceModel} // Assuming DeviceModel is a date string
                  startContent={
                    <Tooltip
                      content={session.DeviceModel}
                      placement="bottom-start"
                    >
                      <Icon icon="clarity:devices-line" fontSize={30} />
                    </Tooltip>
                  }
                  endContent={
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-xs text-default-500">
                        {formatDate(client.CurrentSession.CreatedDate)}
                      </div>
                      <Button isIconOnly size="sm" variant="light">
                        <Icon
                          icon="ri:checkbox-indeterminate-line"
                          fontSize={18}
                          className="text-danger"
                        />
                      </Button>
                    </div>
                  }
                >
                  {session.ClientId}
                </ListboxItem>
              ) : null, // Return null if the condition is not met
          )}
        </ListboxSection>
      </Listbox>
    </div>
  );
};

export default Sessions;
