import React, { useState } from "react";
import { Listbox, ListboxItem, ListboxSection, Switch } from "@heroui/react";
import { Icon } from "@iconify/react";
import Language from "./Language";
import Sessions from "./Sessions";

export default function Application() {
  const [selectedView, setSelectedView] = useState<"home" | "language" | "sessions">("home");

  return (
    <div className="w-full px-1 py-2">
      {selectedView === "language" && (
        <Language onBack={() => setSelectedView("home")} />
      ) }
       {selectedView === "sessions" && (
        <Sessions onBack={() => setSelectedView("home")} />
      ) }
      {selectedView === "home" && (
        <Listbox aria-label="Listbox menu with descriptions" variant="flat">
          <ListboxSection title="Display settings">
            <ListboxItem
              key="theme"
              className="py-3"
              description="Change theme"
              startContent={<Icon icon="mdi:theme-light-dark" fontSize={30} />}
              showDivider
              endContent={<Switch color="default" thumbIcon={<Icon icon="ix:light-dark" />} />}
            >
              Theme
            </ListboxItem>
            <ListboxItem
              key="language"
              className="py-3"
              description="Change application language"
              startContent={<Icon icon="material-symbols-light:language" fontSize={30} />}
              onPress={() => setSelectedView("language")}
              endContent={<span className="text-default-500">English</span>}
            >
              Language
            </ListboxItem>
          </ListboxSection>
          <ListboxSection title="Privacy and security">
            <ListboxItem
              key="devices"
              className="py-3"
              description="Manage all devices"
              startContent={<Icon icon="clarity:devices-line" fontSize={30} />}
              onPress={() => setSelectedView("sessions")}
              endContent={<Icon icon="lsicon:right-outline" fontSize={30}  />}
            >
              Devices
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      )}
    </div>
  );
}
