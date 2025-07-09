import {
  Divider,
  Listbox,
  ListboxItem,
  Selection,
  RadioGroup,
  Radio,
  Checkbox,
  Input,
  CheckboxGroup,
} from "@heroui/react";
import TreeView, { TreeNode } from "@/components/main_components/tree-view";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import {
  LoadingUnloadingFeatures,
  Permissions,
  Requirements,
  TrailerTypes,
} from "../utils/fakeLoadData";
import { useLoadCreation } from "../contexts/create-load-context";
import {
  LoadingVolumeFeature,
  LoadingVolumeFeatureDescription,
} from "../utils/types";

const CreateTrailer: React.FC = () => {
  const { trailerDetails, updateTrailerDetails } = useLoadCreation();

  return (
    <div className="max-w-3xl flex flex-col justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Trailer</div>
      <div className="flex items-stretch justify-stretch gap-3 flex-wrap w-full">
        <div className="grow self-stretch flex flex-col gap-1 max-h-[500px] w-full">
          <div className="text-sm text-default-600 dark:text-default-500">
            Trailer
          </div>
          <TreeView
            nodes={TrailerTypes}
            isExtended={true}
            selectionMode="multi"
            onChange={(val) => {
              const types = val.map((e: TreeNode) => {
                return { name: e.name };
              });

              if (trailerDetails) {
                updateTrailerDetails({
                  ...trailerDetails,
                  trailerTypes: types,
                });
              } else {
                updateTrailerDetails({ trailerTypes: types });
              }
            }}
          />
        </div>
        <div className="grow self-stretch flex flex-col gap-1 max-h-[500px]">
          <div className="text-sm text-default-600 dark:text-default-500">
            Loading
          </div>
          <ListboxWrapper>
            <Listbox
              disallowEmptySelection
              aria-label="Multiple selection example"
              selectedKeys={
                trailerDetails && trailerDetails.loadingFeature
                  ? new Set(
                      Array.from(
                        trailerDetails.loadingFeature.map(
                          (e: { name: string }) => {
                            return e.name;
                          },
                        ),
                      ),
                    )
                  : undefined
              }
              selectionMode="multiple"
              variant="flat"
              onSelectionChange={(val) => {
                if (val instanceof Set) {
                  const valuesArray = Array.from(val.values()); // Convert Set to Array
                  const types = valuesArray.map((e) => {
                    return { name: e };
                  });
                  if (trailerDetails) {
                    updateTrailerDetails({
                      ...trailerDetails,
                      loadingFeature: types,
                    });
                  } else {
                    updateTrailerDetails({ loadingFeature: types });
                  }
                } else if (val === "all") {
                  if (trailerDetails) {
                    updateTrailerDetails({
                      ...trailerDetails,
                      loadingFeature: LoadingUnloadingFeatures,
                    });
                  } else {
                    updateTrailerDetails({
                      loadingFeature: LoadingUnloadingFeatures,
                    });
                  }
                }
              }}
              items={LoadingUnloadingFeatures}
            >
              {(item) => <ListboxItem key={item.name}>{item.name}</ListboxItem>}
            </Listbox>
          </ListboxWrapper>
        </div>
        <div className="grow self-stretch flex flex-col gap-1 max-h-[500px]">
          <div className="text-sm text-default-600 dark:text-default-500">
            Unloading
          </div>
          <ListboxWrapper>
            <Listbox
              disallowEmptySelection
              aria-label="Multiple selection example"
              selectedKeys={
                trailerDetails && trailerDetails.unloadingFeature
                  ? new Set(
                      Array.from(
                        trailerDetails.unloadingFeature.map(
                          (e: { name: string }) => {
                            return e.name;
                          },
                        ),
                      ),
                    )
                  : undefined
              }
              selectionMode="multiple"
              variant="flat"
              onSelectionChange={(val) => {
                if (val instanceof Set) {
                  const valuesArray = Array.from(val.values()); // Convert Set to Array
                  const types = valuesArray.map((e) => {
                    return { name: e };
                  });
                  if (trailerDetails) {
                    updateTrailerDetails({
                      ...trailerDetails,
                      unloadingFeature: types,
                    });
                  } else {
                    updateTrailerDetails({ unloadingFeature: types });
                  }
                } else if (val === "all") {
                  if (trailerDetails) {
                    updateTrailerDetails({
                      ...trailerDetails,
                      unloadingFeature: LoadingUnloadingFeatures,
                    });
                  } else {
                    updateTrailerDetails({
                      unloadingFeature: LoadingUnloadingFeatures,
                    });
                  }
                }
              }}
              items={LoadingUnloadingFeatures}
            >
              {(item) => <ListboxItem key={item.name}>{item.name}</ListboxItem>}
            </Listbox>
          </ListboxWrapper>
        </div>
      </div>

      <div className="flex gap-4 items-start flex-wrap mt-3">
        <div className="flex flex-col gap-1 me-2">
          <Input
            variant="faded"
            description="How many do you need the cars"
            endContent={
              <span className="text-default-600 dark:text-default-400">#</span>
            }
            label="Number of cars"
            labelPlacement="outside"
            placeholder="1"
            type="number"
            value={trailerDetails ? trailerDetails.numberOfCars : ""}
            onValueChange={(val) => {
              if (trailerDetails) {
                updateTrailerDetails({
                  ...trailerDetails,
                  numberOfCars: val,
                });
              } else {
                updateTrailerDetails({
                  numberOfCars: val,
                });
              }
            }}
          />
          <Input
            variant="faded"
            description="Enter ADR class"
            endContent={
              <span className="text-default-600 dark:text-default-400">
                class
              </span>
            }
            label="ADR"
            labelPlacement="outside"
            placeholder="1-9"
            type="number"
            value={trailerDetails ? trailerDetails.adr : ""}
            onValueChange={(val) => {
              if (trailerDetails) {
                updateTrailerDetails({
                  ...trailerDetails,
                  adr: val,
                });
              } else {
                updateTrailerDetails({
                  adr: val,
                });
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <RadioGroup
            color="default"
            label="Loading"
            value={
              trailerDetails
                ? LoadingVolumeFeatureDescription[
                    trailerDetails.loadingVolumeFeature as LoadingVolumeFeature
                  ].shortName
                : ""
            }
            onValueChange={(val) => {
              let value: LoadingVolumeFeature;
              if (val == "FTL") {
                value = LoadingVolumeFeature.FTL;
              } else {
                value = LoadingVolumeFeature.FTLOrLTL;
              }
              if (trailerDetails) {
                updateTrailerDetails({
                  ...trailerDetails,
                  loadingVolumeFeature: value,
                });
              } else {
                updateTrailerDetails({
                  loadingVolumeFeature: value,
                });
              }
            }}
          >
            {Object.values(LoadingVolumeFeature)
              .filter(
                (value): value is LoadingVolumeFeature =>
                  typeof value === "number",
              ) // Filter to only numeric values
              .map((state) => (
                <Radio
                  key={
                    LoadingVolumeFeatureDescription[
                      state as LoadingVolumeFeature
                    ].key
                  }
                  description={
                    LoadingVolumeFeatureDescription[
                      state as LoadingVolumeFeature
                    ].shortName
                  }
                  value={
                    LoadingVolumeFeatureDescription[
                      state as LoadingVolumeFeature
                    ].shortName
                  }
                >
                  {
                    LoadingVolumeFeatureDescription[
                      state as LoadingVolumeFeature
                    ].description
                  }
                </Radio>
              ))}
          </RadioGroup>
          <Checkbox
            isSelected={
              trailerDetails ? trailerDetails.isTwoDriverRequired : false
            }
            onValueChange={(val) => {
              if (trailerDetails) {
                updateTrailerDetails({
                  ...trailerDetails,
                  isTwoDriverRequired: val,
                });
              } else {
                updateTrailerDetails({
                  isTwoDriverRequired: val,
                });
              }
            }}
          >
            2 drivers required
          </Checkbox>
        </div>
      </div>
      <div>
        <CheckboxGroup
          color="default"
          label="Permissions"
          orientation="horizontal"
          value={
            trailerDetails && trailerDetails.permissions
              ? Array.from(
                  trailerDetails.permissions.map((r: { name: string }) => {
                    return r.name;
                  }),
                )
              : []
          }
          onValueChange={(val) => {
            const data = val.map((e: string) => {
              return {
                name: e,
              };
            });
            if (trailerDetails) {
              updateTrailerDetails({
                ...trailerDetails,
                permissions: data,
              });
            } else {
              updateTrailerDetails({
                permissions: data,
              });
            }
          }}
        >
          {Permissions.map((r) => {
            return (
              <Checkbox key={r.name} value={r.name}>
                {r.name}
              </Checkbox>
            );
          })}
        </CheckboxGroup>
      </div>
      <div>
        <CheckboxGroup
          color="default"
          label="Requirements"
          orientation="horizontal"
          value={
            trailerDetails && trailerDetails.requirements
              ? Array.from(
                  trailerDetails.requirements.map((r: { name: string }) => {
                    return r.name;
                  }),
                )
              : []
          }
          onValueChange={(val) => {
            const data = val.map((e: string) => {
              return {
                name: e,
              };
            });
            if (trailerDetails) {
              updateTrailerDetails({
                ...trailerDetails,
                requirements: data,
              });
            } else {
              updateTrailerDetails({
                requirements: data,
              });
            }
          }}
        >
          {Requirements.map((r) => {
            return (
              <Checkbox key={r.name} value={r.name}>
                {r.name}
              </Checkbox>
            );
          })}
        </CheckboxGroup>
      </div>
      <div className="flex flex-col gap-1 me-2">
        <Input
          variant="faded"
          description="How many do you belts"
          endContent={
            <span className="text-default-600 dark:text-default-400">#</span>
          }
          label="Belts"
          labelPlacement="outside"
          placeholder="1"
          type="number"
          value={trailerDetails ? trailerDetails.numberOfRequiredBelts : ""}
          onValueChange={(val) => {
            if (trailerDetails) {
              updateTrailerDetails({
                ...trailerDetails,
                numberOfRequiredBelts: val,
              });
            } else {
              updateTrailerDetails({
                numberOfRequiredBelts: val,
              });
            }
          }}
        />
      </div>

      <Divider className="my-5" />
    </div>
  );
};

export default CreateTrailer;

export const ListboxWrapper = ({ children }: { children: any }) => (
  <div className="grow border-small px-1 py-3  overflow-auto rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
