import React, { useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  MenuTriggerAction,
} from "@heroui/react";
import { Key } from "@react-types/shared";
import { Address, getPlaces, Result } from "@/types/api";
import { Icon } from "@iconify/react";

export type FieldState = {
  selectedKey: Key | null;
  inputValue: string;
  items: Result[];
};

export default function AddressBox({
  value,
  onChange,
}: {
  value?: FieldState;
  onChange: (result: FieldState) => void;
}) {
  const [fieldState, setFieldState] = React.useState<FieldState>(
    value
      ? value
      : {
          selectedKey: "",
          inputValue: "",
          items: [],
        },
  );
  const onSelectionChange = (key: Key | null) => {
    const selectedItem = fieldState.items.find(
      (e) =>
        e.address.component.map((component) => component.name).join(", ") +
          e.tags.join(":") ===
        key,
    );

    const newInputValue = selectedItem
      ? selectedItem.address.component
          .map((component) => component.name)
          .join(", ")
      : "";

    // Update the local state first
    setFieldState((prevState) => ({
      ...prevState,
      inputValue: newInputValue,
      selectedKey: key,
    }));

    // Then call onChange
    onChange({
      inputValue: newInputValue,
      selectedKey: key,
      items: fieldState.items,
    });
  };

  const onInputChange = async (value: string) => {
    await getPlaces(value).then((result) => {
      setFieldState((prevState) => ({
        inputValue: value,
        selectedKey: value === "" ? null : prevState.selectedKey,
        items: result.results ? result.results : [],
      }));
    });
  };

  // Show entire list if user opens the menu manually
  const onOpenChange = async (
    isOpen: boolean,
    menuTrigger: MenuTriggerAction,
  ) => {
    if (menuTrigger === "manual" && isOpen) {
      await getPlaces(fieldState.inputValue).then((result) => {
        setFieldState({
          inputValue: fieldState.inputValue,
          selectedKey: fieldState.selectedKey,
          items: result.results ? result.results : [],
        });
      });
    }
  };

  return (
    <Autocomplete
      inputValue={fieldState.inputValue}
      items={fieldState.items}
      variant="faded"
      placeholder="Search a settlement"
      description="Select settlement"
      selectorIcon={
        <Icon
          icon="ic:baseline-search"
          className="text-default-600 dark:text-default-400"
        />
      }
      selectedKey={fieldState.selectedKey}
      onInputChange={onInputChange}
      onOpenChange={onOpenChange}
      onSelectionChange={onSelectionChange}
    >
      {(item) => {
        var key = item.address.component
          .map((component) => component.name)
          .join(", ");
        return (
          <AutocompleteItem
            key={key + item.tags.join(":")}
            description={item.address.component
              .map((com) => com.name)
              .join(", ")}
          >
            {item.address.formatted_address}
          </AutocompleteItem>
        );
      }}
    </Autocomplete>
  );
}

export function AddressSelectorBox({
  value,
  onChange,
}: {
  value?: Address;
  onChange: (result?: Address) => void;
}) {
  const [fieldState, setFieldState] = React.useState<FieldState>(
    value
      ? {
          selectedKey: "",
          inputValue: value.formatted_address,
          items: [],
        }
      : {
          selectedKey: "",
          inputValue: "",
          items: [],
        },
  );

  const onSelectionChange = (key: Key | null) => {
    const selectedItem = fieldState.items.find(
      (e) =>
        e.address.component.map((component) => component.name).join(", ") +
          e.tags.join(":") ===
        key,
    );

    const newInputValue = selectedItem
      ? selectedItem.address.formatted_address
      : "";

    // Update the local state first
    setFieldState((prevState) => ({
      ...prevState,
      inputValue: newInputValue,
      selectedKey: key,
    }));

    // Then call onChange
    if (selectedItem) onChange(selectedItem.address);
    else onChange(undefined);
  };

  const onInputChange = async (value: string) => {
    await getPlaces(value).then((result) => {
      setFieldState((prevState) => ({
        inputValue: value,
        selectedKey: value === "" ? null : prevState.selectedKey,
        items: result.results ? result.results : [],
      }));
    });
  };

  // Show entire list if user opens the menu manually
  const onOpenChange = async (
    isOpen: boolean,
    menuTrigger: MenuTriggerAction,
  ) => {
    if (menuTrigger === "manual" && isOpen) {
      await getPlaces(fieldState.inputValue).then((result) => {
        setFieldState({
          inputValue: fieldState.inputValue,
          selectedKey: fieldState.selectedKey,
          items: result.results ? result.results : [],
        });
      });
    }
  };

  return (
    <Autocomplete
      inputValue={fieldState.inputValue}
      items={fieldState.items}
      variant="faded"
      placeholder="Search a settlement"
      description="Select settlement"
      selectorIcon={
        <Icon
          icon="ic:baseline-search"
          className="text-default-600 dark:text-default-400"
        />
      }
      selectedKey={fieldState.selectedKey}
      onInputChange={onInputChange}
      onOpenChange={onOpenChange}
      onSelectionChange={onSelectionChange}
    >
      {(item) => {
        var key = item.address.component
          .map((component) => component.name)
          .join(", ");
        return (
          <AutocompleteItem
            key={key + item.tags.join(":")}
            description={item.address.component
              .map((com) => com.name)
              .join(", ")}
          >
            {item.address.formatted_address}
          </AutocompleteItem>
        );
      }}
    </Autocomplete>
  );
}
