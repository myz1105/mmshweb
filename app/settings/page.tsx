"use client";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Listbox,
  ListboxItem,
  ListboxSection,
  Switch,
  Tab,
  Tabs,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import React, { Children, useEffect, useState } from "react";
import { useSettings } from "./settings-context";
import { useRouter } from "next/navigation";

const SettingsPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setLocation } = useSettings();
  const router = useRouter();
  useEffect(() => {
    setLocation("settings");
  }, []);

  const tabs = ["Data control settings", "Account", "Application"];
  const [selectedView, setSelectedView] = useState<
    "home" | "language" | "sessions"
  >("home");

  return (
    <div className=" flex flex-col  px-6 py-3 max-w-3xl">
      <Tabs aria-label="Options" fullWidth>
        <Tab key={tabs[0]} title={tabs[0]}>
          <div className="w-full px-1 py-2">
            {selectedView === "home" && (
              <Listbox
                aria-label="Listbox menu with descriptions"
                variant="flat"
              >
                <ListboxSection title="Data management settings">
                  <ListboxItem
                    key="company"
                    className="py-3"
                    description="Company settings, add some datas, edit, delete and other actions"
                    startContent={
                      <Icon icon="bi:building-gear" fontSize={30} />
                    }
                    onPress={() => router.push("settings/company")}
                    endContent={
                      <Icon icon="lsicon:right-outline" fontSize={30} />
                    }
                  >
                    Company management
                  </ListboxItem>
                  <ListboxItem
                    key="load"
                    className="py-3"
                    description="Load settings, add some datas, edit, delete and other actions"
                    startContent={
                      <Icon icon="carbon:container-runtime" fontSize={30} />
                    }
                    onPress={() => router.push("settings/company")}
                    endContent={
                      <Icon icon="lsicon:right-outline" fontSize={30} />
                    }
                  >
                    Load management
                  </ListboxItem>
                  <ListboxItem
                    key="truck"
                    className="py-3"
                    description="Trailer settings, add some datas, edit, delete and other actions"
                    startContent={
                      <Icon
                        icon="fluent:document-table-truck-20-regular"
                        fontSize={30}
                      />
                    }
                    onPress={() => router.push("settings/company")}
                    endContent={
                      <Icon icon="lsicon:right-outline" fontSize={30} />
                    }
                  >
                    Truck management
                  </ListboxItem>
                  <ListboxItem
                    key="theme"
                    className="py-3"
                    description="Change theme"
                    startContent={
                      <Icon icon="mdi:theme-light-dark" fontSize={30} />
                    }
                    showDivider
                    endContent={
                      <Switch
                        color="default"
                        thumbIcon={<Icon icon="ix:light-dark" />}
                      />
                    }
                  >
                    Theme
                  </ListboxItem>
                  <ListboxItem
                    key="language"
                    className="py-3"
                    description="Change application language"
                    startContent={
                      <Icon
                        icon="material-symbols-light:language"
                        fontSize={30}
                      />
                    }
                    onPress={() => setSelectedView("language")}
                    endContent={
                      <span className="text-default-500">English</span>
                    }
                  >
                    Language
                  </ListboxItem>
                </ListboxSection>
                <ListboxSection title="Privacy and security">
                  <ListboxItem
                    key="devices"
                    className="py-3"
                    description="Manage all devices"
                    startContent={
                      <Icon icon="clarity:devices-line" fontSize={30} />
                    }
                    onPress={() => setSelectedView("sessions")}
                    endContent={
                      <Icon icon="lsicon:right-outline" fontSize={30} />
                    }
                  >
                    Devices
                  </ListboxItem>
                </ListboxSection>
              </Listbox>
            )}
          </div>
        </Tab>
        <Tab key={tabs[1]} title={tabs[1]}></Tab>
        <Tab key={tabs[2]} title={tabs[2]}></Tab>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
