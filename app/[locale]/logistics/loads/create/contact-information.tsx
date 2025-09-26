import {
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Select,
  SelectItem,
  Avatar,
  Chip,
  Card,
  CardBody,
  User,
  Selection,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";
import { useLoadCreation } from "../contexts/create-load-context";
import { users } from "../utils/fakeLoadData";

const ContactInformation: React.FC = () => {
  const { contractInformation, updateContractInformation } = useLoadCreation();

  return (
    <div className="max-w-3xl flex flex-col justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Contacts, Prices</div>
      <div className="text-xl text-default-600 dark:text-default-400">
        Price information
      </div>
      <div className="flex items-start justify-start gap-3 flex-wrap w-full">
        <div className="flex gap-3 flex-wrap">
          <Input
            variant="faded"
            className="max-w-fit"
            description="Load price which is paid for the load"
            value={
              contractInformation && contractInformation.loadPrice
                ? contractInformation.loadPrice.value
                : ""
            }
            onValueChange={(val) => {
              const price =
                contractInformation && contractInformation.loadPrice
                  ? { ...contractInformation.loadPrice, value: val }
                  : { value: val };

              if (contractInformation) {
                updateContractInformation({
                  ...contractInformation,
                  loadPrice: price,
                });
              } else {
                updateContractInformation({
                  loadPrice: price,
                });
              }
            }}
            endContent={
              <div className="flex items-center">
                <label className="sr-only" htmlFor="currency">
                  Currency
                </label>
                <select
                  className="outline-none border-0 bg-transparent text-default-400 text-small"
                  id="currency"
                  name="currency"
                  value={
                    contractInformation && contractInformation.loadPrice
                      ? contractInformation.loadPrice.unit
                      : undefined
                  }
                  onChange={(val) => {
                    const data =
                      contractInformation && contractInformation.loadPrice
                        ? {
                            ...contractInformation.loadPrice,
                            unit: val.target.value,
                          }
                        : { unit: val.target.value };

                    if (contractInformation) {
                      updateContractInformation({
                        ...contractInformation,
                        loadPrice: data,
                      });
                    } else {
                      updateContractInformation({
                        loadPrice: data,
                      });
                    }
                  }}
                >
                  <option>$</option>
                  <option>Uzs</option>
                </select>
              </div>
            }
            label="Load price"
            labelPlacement="outside"
            type="number"
          />
          <div className="flex gap-3 flex-wrap items-center">
            <Input
              variant="faded"
              className="max-w-fit"
              description="Shipment price min"
              placeholder="min"
              value={
                contractInformation && contractInformation.shippingPrice
                  ? contractInformation.shippingPrice.min
                  : ""
              }
              onValueChange={(val) => {
                const price =
                  contractInformation && contractInformation.shippingPrice
                    ? { ...contractInformation.shippingPrice, min: val }
                    : { min: val };

                if (contractInformation) {
                  updateContractInformation({
                    ...contractInformation,
                    shippingPrice: price,
                  });
                } else {
                  updateContractInformation({
                    shippingPrice: price,
                  });
                }
              }}
              endContent={
                <div className="flex items-center">
                  <label className="sr-only" htmlFor="currency">
                    Currency
                  </label>
                  <select
                    className="outline-none border-0 bg-transparent text-default-400 text-small"
                    id="currency"
                    name="currency"
                    value={
                      contractInformation && contractInformation.shippingPrice
                        ? contractInformation.shippingPrice.unit
                        : undefined
                    }
                    onChange={(val) => {
                      const data =
                        contractInformation && contractInformation.shippingPrice
                          ? {
                              ...contractInformation.shippingPrice,
                              unit: val.target.value,
                            }
                          : { unit: val.target.value };

                      if (contractInformation) {
                        updateContractInformation({
                          ...contractInformation,
                          shippingPrice: data,
                        });
                      } else {
                        updateContractInformation({
                          shippingPrice: data,
                        });
                      }
                    }}
                  >
                    <option>$</option>
                    <option>Uzs</option>
                  </select>
                </div>
              }
              label="Shipment price minimum"
              labelPlacement="outside"
              type="number"
            />
            <span>-</span>
            <Input
              variant="faded"
              className="max-w-fit"
              description="Shipment price maximum"
              placeholder="max"
              value={
                contractInformation && contractInformation.shippingPrice
                  ? contractInformation.shippingPrice.max
                  : ""
              }
              onValueChange={(val) => {
                const price =
                  contractInformation && contractInformation.shippingPrice
                    ? { ...contractInformation.shippingPrice, max: val }
                    : { max: val };

                if (contractInformation) {
                  updateContractInformation({
                    ...contractInformation,
                    shippingPrice: price,
                  });
                } else {
                  updateContractInformation({
                    shippingPrice: price,
                  });
                }
              }}
              endContent={
                <div className="flex items-center">
                  <label className="sr-only" htmlFor="currency">
                    Currency
                  </label>
                  <select
                    className="outline-none border-0 bg-transparent text-default-400 text-small"
                    id="currency"
                    name="currency"
                    value={
                      contractInformation && contractInformation.shippingPrice
                        ? contractInformation.shippingPrice.unit
                        : undefined
                    }
                    onChange={(val) => {
                      const data =
                        contractInformation && contractInformation.shippingPrice
                          ? {
                              ...contractInformation.shippingPrice,
                              unit: val.target.value,
                            }
                          : { unit: val.target.value };

                      if (contractInformation) {
                        updateContractInformation({
                          ...contractInformation,
                          shippingPrice: data,
                        });
                      } else {
                        updateContractInformation({
                          shippingPrice: data,
                        });
                      }
                    }}
                  >
                    <option>$</option>
                    <option>Uzs</option>
                  </select>
                </div>
              }
              label="Shipment price max"
              labelPlacement="outside"
              type="number"
            />
          </div>
        </div>
      </div>
      <Divider className="my-5 " />
      <div className="text-xl text-default-600 dark:text-default-400">
        Partner and load managers
      </div>
      <div className="flex gap-3 flex-col w-full">
        <Card className="max-w-md border dark:border-gray-600" shadow="none">
          <CardBody>
            <div className="flex items-start justify-start gap-3 flex-col w-full">
              <div>Creator</div>
              <User
                name="Milana Alimova"
                description="Adminstrator"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              ></User>
              <Select
                classNames={{
                  base: "max-w-md",
                  trigger: "py-2",
                }}
                isMultiline={true}
                items={users}
                label="Manager (Owner)"
                labelPlacement="outside"
                placeholder="Select a manager(s)"
                selectedKeys={
                  contractInformation && contractInformation.manager
                    ? new Set([String(contractInformation.manager.id)])
                    : new Set([])
                }
                onSelectionChange={(val) => {
                  const selectedId = val.anchorKey; // Get the selected ID

                  const selectedPartner = users.find(
                    (user) => user.id === Number(selectedId),
                  ); // Find the selected partner object

                  if (contractInformation) {
                    updateContractInformation({
                      ...contractInformation,
                      manager: selectedPartner,
                    });
                  } else {
                    updateContractInformation({ manager: selectedPartner });
                  }
                }}
                renderValue={(items) => {
                  return (
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <div key={item.key} className="flex gap-2 items-center">
                          <Avatar
                            alt={
                              item.data?.firstname + " " + item.data?.lastname
                            }
                            className="flex-shrink-0"
                            size="sm"
                            src={item.data?.image}
                          />
                          <div className="flex flex-col">
                            <span className="text-small">
                              {item.data?.firstname + " " + item.data?.lastname}
                            </span>
                            <span className="text-tiny text-default-400">
                              {item.data?.role}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }}
                selectionMode="single"
                variant="flat"
              >
                {(user) => (
                  <SelectItem key={user.id} textValue={user.firstname}>
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={user.firstname}
                        className="flex-shrink-0"
                        size="sm"
                        src={user.image}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">
                          {user.firstname + " " + user.lastname}
                        </span>
                        <span className="text-tiny text-default-400">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
            </div>
          </CardBody>
        </Card>

        <Select
          items={users}
          label="Partner"
          labelPlacement="outside"
          placeholder="Select a partner"
          variant="faded"
          className="max-w-md"
          classNames={{
            innerWrapper: " py-1",
            trigger: "h-fit",
          }}
          selectedKeys={
            contractInformation && contractInformation.partner
              ? new Set([String(contractInformation.partner.id)])
              : new Set([])
          }
          onSelectionChange={(val) => {
            const selectedId = val.anchorKey; // Get the selected ID

            const selectedPartner = users.find(
              (user) => user.id === Number(selectedId),
            ); // Find the selected partner object

            if (contractInformation) {
              updateContractInformation({
                ...contractInformation,
                partner: selectedPartner,
              });
            } else {
              updateContractInformation({ partner: selectedPartner });
            }
          }}
          renderValue={(items) => {
            return (
              <div className="flex flex-wrap">
                {items.map((user) => (
                  <div className="flex gap-2 items-center" key={user.data?.id}>
                    <Avatar
                      alt={user.data?.firstname}
                      className="flex-shrink-0"
                      size="sm"
                      src={user.data?.image}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">
                        {user.data?.firstname + " " + user.data?.lastname}
                      </span>
                      <span className="text-tiny text-default-400">
                        {user.data?.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            );
          }}
        >
          {(user) => (
            <SelectItem key={user.id} textValue={user.firstname}>
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={user.firstname}
                  className="flex-shrink-0"
                  size="sm"
                  src={user.image}
                />
                <div className="flex flex-col">
                  <span className="text-small">
                    {user.firstname + " " + user.lastname}
                  </span>
                  <span className="text-tiny text-default-400">
                    {user.role}
                  </span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
      </div>
      <Divider className="my-5 " />
    </div>
  );
};

export default ContactInformation;
