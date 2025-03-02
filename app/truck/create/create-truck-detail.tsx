import {
    Input,
    Autocomplete,
    AutocompleteItem,
    Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";
import { animals } from "./truck_data";
import { Calendar, RadioGroup, Radio, CheckboxGroup, Checkbox, ScrollShadow, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";

const CreateTruckDetails: React.FC = () => {
  
    const [adrIsVisible, setADRIsVisible] = useState(true);
    const [tirIsVisible, setTIRIsVisible] = useState(true);    
    const [selectedKeys, setSelectedKeys] = React.useState(() => new Set(["Ready to download"]));
    const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));
    const [selectedTime, setSelectedTime] = React.useState(() => new Set(["time"]));

    const selectedValue = React.useMemo(() => {
      const value = Array.from(selectedKeys).join(", ").replace(/_/g, "");
      return value || "Select an option"; // Default placeholder
    }, [selectedKeys]);

    const selectedTimeValue = React.useMemo(() => {
      const value = Array.from(selectedTime).join(", ").replace(/_/g, "");
      return value || "Select an option";
    }, [selectedTime])

    const handleSelectionChange = (keys: unknown) => {
      if (keys instanceof Set) {
        setSelectedKeys(new Set(keys));
      } else if (typeof keys === "string") {
        setSelectedKeys(new Set([keys]));
      }
    };

    const handleTimeSelectionChange = (keys: unknown ) => {
      if (keys instanceof Set) {
        setSelectedTime(new Set(keys));
      } else if (typeof keys == "string") {
        setSelectedTime(new Set([keys]));
      }
    };

    const [calendarIsOpen, setCalendarIsOpen] = useState(false);

    const handleDateChange = (date: CalendarDate) => {
      setSelectedDate(date);
      setCalendarIsOpen(false);
    };

    return (
      <div className="max-w-3xl flex flex-col justify-start items-start gap-3 p-4">
        <div className="text-2xl font-semibold mb-5">Add a truck</div>
        <div className="text-xl text-default-600 dark:text-default-400">
          Body type
        </div>
        <div className="flex items-start justify-start gap-3 flex-wrap w-full">
          <Autocomplete
            variant="faded"
            className="max-w-xs"
            defaultItems={animals}
            labelPlacement="outside"
            placeholder="Search a body type"
            description="Select body type"
            selectorIcon={
              <Icon
                icon="ic:baseline-search"
                className="text-default-600 dark:text-default-400"
              />
            }
          >
            {(animal) => (
              <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <div className="space-y-3 p-2">
          <RadioGroup orientation="horizontal" size="sm">
            <Radio value="Semi_trailer">Semi trailer</Radio>
            <Radio value="Truck">Truck</Radio>
            <Radio value="Coupling">Coupling</Radio>
          </RadioGroup>

          <CheckboxGroup orientation="horizontal" size="sm">
            <Checkbox value="Dog">Dog</Checkbox>
            <Checkbox value="Hydrolift">Hydrolift</Checkbox>
            <Checkbox value="Grasshopers">Grasshopers</Checkbox>
          </CheckboxGroup>
        </div>
        </div>
        <div className="text-xl text-default-600 dark:text-default-400">
            Loading
        </div>
        <div className="flex items-center relative">
          <ScrollShadow className="w-[300px] h-[200px]">
            <CheckboxGroup orientation="vertical" size="sm">
              <Checkbox value="Dog">Dog</Checkbox>
              <Checkbox value="Hydrolift">Hydrolift</Checkbox>  
              <Checkbox value="Grasshopers">Grasshopers</Checkbox>
              <Checkbox value="Dog">Dog</Checkbox>
              <Checkbox value="Hydrolift">Hydrolift</Checkbox>
              <Checkbox value="Grasshopers">Grasshopers</Checkbox>
              <Checkbox value="Dog">Dog</Checkbox>
              <Checkbox value="Hydrolift">Hydrolift</Checkbox>
              <Checkbox value="Grasshopers">Grasshopers</Checkbox>
            </CheckboxGroup>
          </ScrollShadow>
          <div className="flex flex-col m-[10vh] space-y-[5vh]">
            <Input
              variant="faded"
              className="max-w-[155px]"
              placeholder="ex: 22T"
              endContent={
                <div className="flex items-center">
                  <label className="sr-only" htmlFor="currency">
                    Currency
                  </label>
                  <select
                    className="outline-none border-0 bg-transparent text-default-400 text-small"
                    id="currency"
                    name="currency"
                  >
                    <option>kg</option>
                    <option>T</option>
                  </select>
                </div>
              }
              label="Load capacity"
              labelPlacement="outside"
              type="number"
            />
            <Input
              variant="faded"
              className="max-w-[150px]"
              placeholder="ex: 105"
              endContent={
                <span className="text-default-600 dark:text-default-400">
                  m<sup>3</sup>
                </span>
              }
              label="Body volume"
              labelPlacement="outside"
              type="number"
            />
          </div>
        </div>
        {/* Truck's Length, Width, and Height */}
        <div>
          <h2 className="text-xl text-default-600 dark:text-default-400">Body, L x W x H</h2>
          <div className="flex flex-row gap-2">
            <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input
                  key={"outside_length"}
                  label="Length"
                  labelPlacement={"outside"}
                  type="Length"
                  endContent={
                    <span className="text-default-600 dark:text-default-400">m</span>
                  }
                />
                 <Input
                  key={"outside_width"}
                  label="Width"
                  labelPlacement={"outside"}
                  type="Width"
                  endContent={
                    <span className="text-default-600 dark:text-default-400">m</span>
                  }
                />
                 <Input
                  key={"outside_height"}
                  label="Height"
                  labelPlacement={"outside"}
                  type="Height"
                  endContent={
                    <span className="text-default-600 dark:text-default-400">m</span>
                  }
                />
            </div>
          </div>
        </div>
        {/* Truck's Length, Width, and Height */}
        {/* Additional */}
        <div className="my-2">
          <div>
            <h1 className="text-xl text-default-600 dark:text-default-400">Additional</h1>
          </div>

          {adrIsVisible ? (
            <Button onPress={() => setADRIsVisible(false)} className="m-2 h-[4vh]" style={{ fontSize: "14px" }} color="primary" variant="ghost">
              <Icon icon="material-symbols:add-rounded" />
              ADR
            </Button>
          ) : (
            <div>
              <button  onClick={() => setADRIsVisible(true)} className="m-2 border-none bg-transparent hover:bg-transparent">
                <div className="flex flex-row gap-1">
                  <h3 className="text-md text-default-600 dark:text-default-400">ADR</h3><Icon className="mt-1" icon="meteor-icons:xmark" />
                </div>
              </button>
              <div className="p-2 text-sm text-default-600 dark:text-default-400">
                <CheckboxGroup
                  color="primary"
                  defaultValue={["buenos-aires", "san-francisco"]}
                  orientation="horizontal"
                  size="sm"
                  className="p-2"
                >
                  <Checkbox value="Explosives"><div className="flex flex-row gap-2">ADR 1 <h4 className="text-sm text-default-600 dark:text-default-400">Explosives</h4></div></Checkbox>
                  <Checkbox value="Compressed gases"><div className="flex flex-row gap-2">ADR 2 <h4 className="text-sm text-default-600 dark:text-default-400">Compressed gases</h4></div></Checkbox>
                  <Checkbox value="Flammable liquids"><div className="flex flex-row gap-2">ADR 3 <h4 className="text-sm text-default-600 dark:text-default-400">Flammable liquids</h4></div></Checkbox>
                </CheckboxGroup>
                <CheckboxGroup
                  color="primary"
                  defaultValue={["buenos-aires", "san-francisco"]}
                  orientation="horizontal"
                  size="sm"
                  className="p-2"
                >
                  <Checkbox value="Light-duty thing"><div className="flex flex-row gap-2">ADR 4 <h4 className="text-sm text-default-600 dark:text-default-400">Light-duty thing</h4></div></Checkbox>
                  <Checkbox value="Oxidising substances"><div className="flex flex-row gap-2">ADR 5 <h4 className="text-sm text-default-600 dark:text-default-400">Oxidising substances</h4></div></Checkbox>
                  <Checkbox value="Toxic substances"><div className="flex flex-row gap-2">ADR 6 <h4 className="text-sm text-default-600 dark:text-default-400">Toxic substances</h4></div></Checkbox>
                </CheckboxGroup>
                <CheckboxGroup
                  color="primary"
                  defaultValue={["buenos-aires", "san-francisco"]}
                  orientation="horizontal"
                  size="sm"
                  className="p-2"
                >
                  <Checkbox value="Radioactive material"><div className="flex flex-row gap-2">ADR 7 <h4 className="text-sm text-default-600 dark:text-default-400">Radioactive material</h4></div></Checkbox>
                  <Checkbox value="Corrosive substances"><div className="flex flex-row gap-2">ADR 8 <h4 className="text-sm text-default-600 dark:text-default-400">Corrosive substances</h4></div></Checkbox>
                  <Checkbox value="Low hazard"><div className="flex flex-row gap-2">ADR 9 <h4 className="text-sm text-default-600 dark:text-default-400">Low hazard</h4></div></Checkbox>
                </CheckboxGroup>
              </div>
            </div>
          )}

          {tirIsVisible ? (
            <Button onPress={() => setTIRIsVisible(false)} className="m-2 h-[4vh]" style={{ fontSize: "14px" }} color="primary" variant="ghost">
              <Icon icon="material-symbols:add-rounded" />
              TIR, EKMT
            </Button>
          ) : (
            <div>
              <button onClick={() => setTIRIsVisible(true)} className="m-2 border-none bg-transparent hover:bg-transparent">
                <div className="flex flex-row gap-1">
                  <h3 className="text-md text-default-600 dark:text-default-400">Permissions</h3><Icon className="mt-1" icon="meteor-icons:xmark" />
                </div>
              </button>
                <div className="p-2 text-sm text-default-600 dark:text-default-400">
                  <CheckboxGroup
                      color="primary"
                      defaultValue={["buenos-aires", "san-francisco"]}
                      orientation="horizontal"
                      size="sm"
                      className="p-2"
                    >
                      <Checkbox value="Radioactive material">TIR</Checkbox>
                      <Checkbox value="Corrosive substances" className="ml-2">EKMT</Checkbox>
                  </CheckboxGroup>
                </div>
            </div>
          )}
        </div>
        {/* Additional */}
        {/* GPS monitoring */}
        <div>
          <h1>GPS monitoring</h1>
          <Checkbox size="sm" className="m-1">Provide the customer with GPS monitoring service</Checkbox>
        </div>
        {/* GPS monitoring */}
        {/* Loading time */}
        <div>
          <div>
            <h1 className="text-xl text-default-600 dark:text-default-400">When</h1>
          </div>
          <div className="flex flex-row gap-2 mt-2 p-2">
            <Dropdown>
              <DropdownTrigger>
                <Button className="capitalize" variant="bordered">
                  {selectedValue}
                  <Icon icon="ci:caret-down-md" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Single selection example"
                selectedKeys={Array.from(selectedKeys)}
                selectionMode="single"
                variant="flat"
                onSelectionChange={handleSelectionChange}
              >
                <DropdownItem key="Ready to download">Ready to download</DropdownItem>
                <DropdownItem key="Constantly">Constantly</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div className="flex flex-col">
              <Button className="bg-default-0" variant="bordered" onPress={() => setCalendarIsOpen((prev) => !prev)}>
                <Icon icon="mdi:application-edit-outline" />
                <span>{selectedDate.toString()}</span>
              </Button>
              {calendarIsOpen ? (
                <Calendar
                  aria-label="Date (Min Date Value)"
                  defaultValue={selectedDate}
                  minValue={today(getLocalTimeZone())}
                  onChange={(date) => handleDateChange(date)}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="p-2">
              <Icon icon="si:add-fill" className="w-[3vh] h-[3vh]" />
            </div>
            <div>
            <Dropdown>
              <DropdownTrigger>
                <Button className="capitalize" variant="bordered">
                  {selectedTime}
                  <Icon icon="ci:caret-down-md" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Single selection example"
                selectedKeys={selectedTime}
                selectionMode="single"
                variant="flat"
                onSelectionChange={handleTimeSelectionChange}
              >
                <DropdownItem key="0 days">0 days</DropdownItem>
                <DropdownItem key="1 days">1 days</DropdownItem>
                <DropdownItem key="2 days">2 days</DropdownItem>
                <DropdownItem key="3 days">3 days</DropdownItem>
                <DropdownItem key="4 days">4 days</DropdownItem>
                <DropdownItem key="5 days">5 days</DropdownItem>
                <DropdownItem key="6 days">6 days</DropdownItem>
                <DropdownItem key="7 days">7 days</DropdownItem>
                <DropdownItem key="8 days">8 days</DropdownItem>
                <DropdownItem key="9 days">9 days</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </div>
          </div>
        </div>
        {/* Loading time */}
      </div>
  );
};
  
export default CreateTruckDetails;
  