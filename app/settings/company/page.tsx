"use client";
import {
  Tabs,
  Tab,
  ListboxSection,
  ListboxItem,
  Listbox,
  Switch,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useSettings } from "../settings-context";
import { useRouter } from "next/navigation";

export default function CompanySettingsPage() {
  const { setLocation } = useSettings();
  const router = useRouter();
  useEffect(() => {
    setLocation("settings/company");
  }, []);

  const tabs = ["Creation", "Account", "Application"];

  const [selectedView, setSelectedView] = useState<
    "home" | "language" | "sessions"
  >("home");

  return (
    <div className=" flex flex-col  px-6 py-3 max-w-3xl">
      <div className="text-2xl font-semibold mb-5">Settings</div>
      <Tabs aria-label="Options" fullWidth>
        <Tab key={tabs[0]} title={tabs[0]}>
          <div className="w-full px-1 py-2">
            {selectedView === "home" && (
              <Listbox
                aria-label="Listbox menu with descriptions"
                variant="flat"
              >
                <ListboxSection title="Display settings">
                  <ListboxItem
                    key="add-company-type"
                    className="py-3"
                    description="You can add company type in this page, but only addminstration permission required!"
                    startContent={
                      <Icon
                        icon="material-symbols-light:home-repair-service-sharp"
                        fontSize={30}
                      />
                    }
                    onPress={() => {
                      router.push("company/add-company-type");
                    }}
                    endContent={
                      <Icon icon="lsicon:right-outline" fontSize={30} />
                    }
                  >
                    Add Company Type
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
                    onPress={() => {
                      router.push("company/company-type");
                    }}
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
}
