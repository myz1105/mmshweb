import {
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  DateRangePicker,
  TimeInput,
  Checkbox,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { today, getLocalTimeZone, Time } from "@internationalized/date";
import { AddressSelectorBox } from "@/components/mini_components/addressselector";
import { LoadReadyState, Workdays } from "../utils/types";
import { useLoadCreation } from "../contexts/create-load-context";

const WorkdayDescriptions: { [key in Workdays]: string } = {
  [Workdays.Everyday]: "Everyday",
  [Workdays.onlyWorkDays]: "Only work days",
};

const LoadReadyStateDescriptions: { [key in LoadReadyState]: string } = {
  [LoadReadyState.LoadIsReadyAt]: "Ready for loading",
  [LoadReadyState.Always]: "Constantly",
  [LoadReadyState.NotReadyYet]: "No load, request a rate",
};

const CreateLoadRoute: React.FC = () => {
  const [loadReadyState, setLoadReadyState] = useState<LoadReadyState>(
    LoadReadyState.LoadIsReadyAt,
  );
  const [workdayState, setWorkdayState] = useState<Workdays>(
    Workdays.onlyWorkDays,
  );

  const { loadRoute, updateLoadRoute } = useLoadCreation();

  return (
    <div className="max-w-3xl flex flex-col justify-start items-start gap-3 p-4">
      <div className="text-2xl font-semibold mb-5">Load route</div>
      <div className="text-xl text-default-600 dark:text-default-400">When</div>
      <div className="flex items-start justify-start gap-3 flex-wrap w-full">
        <div>
          <div className="px-2 mb-[6px] text-sm">Load state</div>
          <ButtonGroup variant="faded">
            <Button>
              {loadRoute && loadRoute.when
                ? LoadReadyStateDescriptions[
                    loadRoute.when.state as LoadReadyState
                  ]
                : LoadReadyStateDescriptions[LoadReadyState.LoadIsReadyAt]}
            </Button>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button isIconOnly className="-m-1">
                  <Icon
                    icon="subway:down-2"
                    className="text-default-600 dark:text-default-400"
                    fontSize={10}
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                selectedKeys={
                  loadRoute && loadRoute.when
                    ? new Set([loadRoute.when.state])
                    : new Set([LoadReadyState.LoadIsReadyAt])
                }
                selectionMode="single"
                onSelectionChange={(key) => {
                  const selectedOptionValue = Array.from(key)[0];
                  setLoadReadyState(selectedOptionValue as LoadReadyState);
                  const when =
                    loadRoute && loadRoute.when
                      ? {
                          ...loadRoute.when,
                          state: selectedOptionValue as LoadReadyState,
                        }
                      : { state: selectedOptionValue as LoadReadyState };
                  if (loadRoute) {
                    updateLoadRoute({ ...loadRoute, when: when });
                  } else {
                    updateLoadRoute({ when: when });
                  }
                }}
              >
                {Object.values(LoadReadyState)
                  .filter(
                    (value): value is LoadReadyState =>
                      typeof value === "number",
                  ) // Filter to only numeric values
                  .map((state) => (
                    <DropdownItem key={state}>
                      {LoadReadyStateDescriptions[state]}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
          <div className="text-xs  px-2 py-1 text-default-600 dark:text-default-400">
            Select load state
          </div>
        </div>
        {loadReadyState == LoadReadyState.LoadIsReadyAt && (
          <DateRangePicker
            label="Date interval"
            className="w-[320px]"
            variant="faded"
            visibleMonths={2}
            fullWidth={false}
            description="Select date range"
            labelPlacement="outside"
            minValue={today(getLocalTimeZone())}
            value={
              loadRoute && loadRoute.when
                ? loadRoute.when.dateInterval
                : undefined
            }
            onChange={(val) => {
              const when =
                loadRoute && loadRoute.when
                  ? {
                      ...loadRoute.when,
                      dateInterval: val,
                    }
                  : { dateInterval: val };
              if (loadRoute) {
                updateLoadRoute({ ...loadRoute, when: when });
              } else {
                updateLoadRoute({ when: when });
              }
            }}
          />
        )}

        {loadReadyState == LoadReadyState.Always && (
          <div>
            <div className="px-2 mb-[6px] text-sm">Workday</div>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button variant="faded">
                  {WorkdayDescriptions[workdayState]}
                  <Icon
                    icon="subway:down-2"
                    className="text-default-600 dark:text-default-400"
                    fontSize={10}
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                selectedKeys={new Set([workdayState])}
                selectionMode="single"
                onSelectionChange={(key) => {
                  const selectedOptionValue = Array.from(key)[0];
                  setWorkdayState(selectedOptionValue as Workdays);
                  const when =
                    loadRoute && loadRoute.when
                      ? {
                          ...loadRoute.when,
                          uploadValidation: selectedOptionValue as Workdays,
                        }
                      : { uploadValidation: selectedOptionValue as Workdays };
                  if (loadRoute) {
                    updateLoadRoute({ ...loadRoute, when: when });
                  } else {
                    updateLoadRoute({ when: when });
                  }
                }}
              >
                {Object.values(Workdays)
                  .filter(
                    (value): value is Workdays => typeof value === "number",
                  ) // Filter to only numeric values
                  .map((state) => (
                    <DropdownItem key={state}>
                      {WorkdayDescriptions[state]}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </Dropdown>
            <div className="text-xs px-2 py-1 text-default-600 dark:text-default-400">
              Select workday
            </div>
          </div>
        )}
      </div>
      <Divider className="my-5" />
      <div className="text-xl text-default-600 dark:text-default-400">
        Loading
      </div>
      <div className="flex items-end justify-start gap-3 flex-wrap w-full">
        <div>
          <AddressSelectorBox
            value={
              loadRoute && loadRoute.uploading
                ? loadRoute.uploading.address
                : undefined
            }
            onChange={(val) => {
              const uploading =
                loadRoute && loadRoute.uploading
                  ? {
                      ...loadRoute.uploading,
                      address: val,
                    }
                  : { address: val };
              if (loadRoute) {
                updateLoadRoute({ ...loadRoute, uploading: uploading });
              } else {
                updateLoadRoute({ uploading: uploading });
              }
            }}
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <Input
            className="w-80"
            variant="faded"
            description="Write address of the loading place"
            endContent={
              <Button isIconOnly variant="light" className="-mr-2" size="sm">
                <Icon
                  icon="line-md:map-marker-plus"
                  className="text-default-600 dark:text-default-400"
                  fontSize={20}
                />
              </Button>
            }
            label="Address in the locality"
            labelPlacement="outside"
            type="text"
            value={
              loadRoute && loadRoute.uploading
                ? loadRoute.uploading.location
                : ""
            }
            onChange={(val) => {
              const uploading =
                loadRoute && loadRoute.uploading
                  ? {
                      ...loadRoute.uploading,
                      location: val.target.value,
                    }
                  : { location: val.target.value };
              if (loadRoute) {
                updateLoadRoute({ ...loadRoute, uploading: uploading });
              } else {
                updateLoadRoute({ uploading: uploading });
              }
            }}
          />
        </div>
      </div>
      <div className="flex items-start justify-start gap-3 flex-wrap w-full">
        <TimeInput
          label="From"
          labelPlacement="outside"
          variant="faded"
          fullWidth={false}
          defaultValue={new Time(8)}
          value={
            loadRoute &&
            loadRoute.uploading &&
            loadRoute.uploading.uploadingTime &&
            loadRoute.uploading.uploadingTime.from
              ? new Time(
                  loadRoute.uploading.uploadingTime.from.hour,
                  loadRoute.uploading.uploadingTime.from.minute,
                  loadRoute.uploading.uploadingTime.from.second,
                )
              : null
          }
          onChange={(val) => {
            const uploadingTime =
              loadRoute &&
              loadRoute.uploading &&
              loadRoute.uploading.uploadingTime
                ? {
                    ...loadRoute.uploading.uploadingTime,
                    from: { ...val },
                  }
                : { from: { ...val } };
            if (loadRoute && loadRoute.uploading) {
              updateLoadRoute({
                ...loadRoute,
                uploading: {
                  ...loadRoute.uploading,
                  uploadingTime: uploadingTime,
                },
              });
            } else {
              if (loadRoute) {
                updateLoadRoute({
                  ...loadRoute,
                  uploading: { uploadingTime: uploadingTime },
                });
              } else {
                updateLoadRoute({
                  uploading: { uploadingTime: uploadingTime },
                });
              }
            }
          }}
        />
        <TimeInput
          label="To"
          labelPlacement="outside"
          variant="faded"
          fullWidth={false}
          defaultValue={new Time(17)}
          value={
            loadRoute &&
            loadRoute.uploading &&
            loadRoute.uploading.uploadingTime &&
            loadRoute.uploading.uploadingTime.to
              ? new Time(
                  loadRoute.uploading.uploadingTime.to.hour,
                  loadRoute.uploading.uploadingTime.to.minute,
                  loadRoute.uploading.uploadingTime.to.second,
                )
              : null
          }
          onChange={(val) => {
            const uploadingTime =
              loadRoute &&
              loadRoute.uploading &&
              loadRoute.uploading.uploadingTime
                ? {
                    ...loadRoute.uploading.uploadingTime,
                    to: { ...val },
                  }
                : { to: { ...val } };
            if (loadRoute && loadRoute.uploading) {
              updateLoadRoute({
                ...loadRoute,
                uploading: {
                  ...loadRoute.uploading,
                  uploadingTime: uploadingTime,
                },
              });
            } else {
              if (loadRoute) {
                updateLoadRoute({
                  ...loadRoute,
                  uploading: { uploadingTime: uploadingTime },
                });
              } else {
                updateLoadRoute({
                  uploading: { uploadingTime: uploadingTime },
                });
              }
            }
          }}
        />
        <Checkbox
          className="self-end"
          isSelected={
            loadRoute &&
            loadRoute.uploading &&
            loadRoute.uploading.uploadingTime
              ? loadRoute.uploading.uploadingTime.isAlways
              : undefined
          }
          onValueChange={(val) => {
            const uploadingTime =
              loadRoute &&
              loadRoute.uploading &&
              loadRoute.uploading.uploadingTime
                ? {
                    ...loadRoute.uploading.uploadingTime,
                    isAlways: val,
                  }
                : { isAlways: val };
            if (loadRoute && loadRoute.uploading) {
              updateLoadRoute({
                ...loadRoute,
                uploading: {
                  ...loadRoute.uploading,
                  uploadingTime: uploadingTime,
                },
              });
            } else {
              if (loadRoute) {
                updateLoadRoute({
                  ...loadRoute,
                  uploading: { uploadingTime: uploadingTime },
                });
              } else {
                updateLoadRoute({
                  uploading: { uploadingTime: uploadingTime },
                });
              }
            }
          }}
        >
          24 hours a day
        </Checkbox>
      </div>
      <Divider className="my-5" />
      <div className="text-xl text-default-600 dark:text-default-400">
        Unloading
      </div>
      <div className="flex items-end justify-start gap-3 flex-wrap w-full">
        <div>
          <AddressSelectorBox
            value={
              loadRoute && loadRoute.downloading
                ? loadRoute.downloading.address
                : undefined
            }
            onChange={(val) => {
              const uploading =
                loadRoute && loadRoute.downloading
                  ? {
                      ...loadRoute.downloading,
                      address: val,
                    }
                  : { address: val };
              if (loadRoute) {
                updateLoadRoute({ ...loadRoute, downloading: uploading });
              } else {
                updateLoadRoute({ downloading: uploading });
              }
            }}
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <Input
            className="w-80"
            variant="faded"
            description="Write address of the loading place"
            endContent={
              <Button isIconOnly variant="light" className="-mr-2" size="sm">
                <Icon
                  icon="line-md:map-marker-plus"
                  className="text-default-600 dark:text-default-400"
                  fontSize={20}
                />
              </Button>
            }
            label="Address in the locality"
            labelPlacement="outside"
            type="text"
            value={
              loadRoute && loadRoute.downloading
                ? loadRoute.downloading.location
                : ""
            }
            onChange={(event) => {
              const val = event.target.value
                .toLowerCase()
                .replace(/(^\w|\s*,\s*\w)/g, (char) => char.toUpperCase());

              const uploading =
                loadRoute && loadRoute.downloading
                  ? {
                      ...loadRoute.downloading,
                      location: val,
                    }
                  : { location: val };
              if (loadRoute) {
                updateLoadRoute({ ...loadRoute, downloading: uploading });
              } else {
                updateLoadRoute({ downloading: uploading });
              }
            }}
          />
        </div>
      </div>
      <div className="flex items-start justify-start gap-3 flex-wrap w-full">
        <DateRangePicker
          label="Date range"
          className="w-[320px]"
          variant="faded"
          visibleMonths={2}
          fullWidth={false}
          labelPlacement="outside"
          minValue={today(getLocalTimeZone())}
          value={
            loadRoute &&
            loadRoute.downloading &&
            loadRoute.downloading.downloadingTime &&
            loadRoute.downloading.downloadingTime.dateRange
              ? loadRoute.downloading.downloadingTime.dateRange
              : undefined
          }
          onChange={(val) => {
            const when =
              loadRoute &&
              loadRoute.downloading &&
              loadRoute.downloading.downloadingTime
                ? {
                    ...loadRoute.downloading.downloadingTime,
                    dateRange: val,
                  }
                : { dateRange: val };
            if (loadRoute && loadRoute.downloading) {
              updateLoadRoute({
                ...loadRoute,
                downloading: {
                  ...loadRoute.downloading,
                  downloadingTime: when,
                },
              });
            } else {
              if (loadRoute) {
                updateLoadRoute({
                  ...loadRoute,
                  downloading: { downloadingTime: when },
                });
              } else {
                updateLoadRoute({ downloading: { downloadingTime: when } });
              }
            }
          }}
        />
        <TimeInput
          label="From"
          labelPlacement="outside"
          variant="faded"
          fullWidth={false}
          defaultValue={new Time(8)}
          value={
            loadRoute &&
            loadRoute.downloading &&
            loadRoute.downloading.downloadingTime &&
            loadRoute.downloading.downloadingTime.timeRange
              ? loadRoute.downloading.downloadingTime.timeRange.to
              : undefined
          }
          onChange={(val) => {
            const when =
              loadRoute &&
              loadRoute.downloading &&
              loadRoute.downloading.downloadingTime &&
              loadRoute.downloading.downloadingTime.timeRange
                ? {
                    ...loadRoute.downloading.downloadingTime.timeRange,
                    from: { ...val },
                  }
                : { from: { ...val } };
            if (
              loadRoute &&
              loadRoute.downloading &&
              loadRoute.downloading.downloadingTime
            ) {
              updateLoadRoute({
                ...loadRoute,
                downloading: {
                  ...loadRoute.downloading,
                  downloadingTime: {
                    ...loadRoute.downloading.downloadingTime,
                    timeRange: when,
                  },
                },
              });
            } else {
              if (loadRoute && loadRoute.downloading) {
                updateLoadRoute({
                  ...loadRoute,
                  downloading: {
                    ...loadRoute.downloading,
                    downloadingTime: { timeRange: when },
                  },
                });
              } else {
                if (loadRoute) {
                  updateLoadRoute({
                    ...loadRoute,
                    downloading: { downloadingTime: { timeRange: when } },
                  });
                } else {
                  updateLoadRoute({
                    downloading: { downloadingTime: { timeRange: when } },
                  });
                }
              }
            }
          }}
        />
        <TimeInput
          label="To"
          labelPlacement="outside"
          variant="faded"
          fullWidth={false}
          defaultValue={new Time(17)}
          value={
            loadRoute &&
            loadRoute.downloading &&
            loadRoute.downloading.downloadingTime &&
            loadRoute.downloading.downloadingTime.timeRange
              ? loadRoute.downloading.downloadingTime.timeRange.from
              : undefined
          }
          onChange={(val) => {
            const when =
              loadRoute &&
              loadRoute.downloading &&
              loadRoute.downloading.downloadingTime &&
              loadRoute.downloading.downloadingTime.timeRange
                ? {
                    ...loadRoute.downloading.downloadingTime.timeRange,
                    to: { ...val },
                  }
                : { to: { ...val } };
            if (
              loadRoute &&
              loadRoute.downloading &&
              loadRoute.downloading.downloadingTime
            ) {
              updateLoadRoute({
                ...loadRoute,
                downloading: {
                  ...loadRoute.downloading,
                  downloadingTime: {
                    ...loadRoute.downloading.downloadingTime,
                    timeRange: when,
                  },
                },
              });
            } else {
              if (loadRoute && loadRoute.downloading) {
                updateLoadRoute({
                  ...loadRoute,
                  downloading: {
                    ...loadRoute.downloading,
                    downloadingTime: { timeRange: when },
                  },
                });
              } else {
                if (loadRoute) {
                  updateLoadRoute({
                    ...loadRoute,
                    downloading: { downloadingTime: { timeRange: when } },
                  });
                } else {
                  updateLoadRoute({
                    downloading: { downloadingTime: { timeRange: when } },
                  });
                }
              }
            }
          }}
        />
        <Checkbox
          className="self-end"
          onVolumeChange={(val) => {
            const when =
              loadRoute &&
              loadRoute.downloading &&
              loadRoute.downloading.downloadingTime &&
              loadRoute.downloading.downloadingTime.timeRange
                ? {
                    ...loadRoute.downloading.downloadingTime.timeRange,
                    isAlways: val,
                  }
                : { isAlways: val };
            if (
              loadRoute &&
              loadRoute.downloading &&
              loadRoute.downloading.downloadingTime
            ) {
              updateLoadRoute({
                ...loadRoute,
                downloading: {
                  ...loadRoute.downloading,
                  downloadingTime: {
                    ...loadRoute.downloading.downloadingTime,
                    timeRange: when,
                  },
                },
              });
            } else {
              if (loadRoute && loadRoute.downloading) {
                updateLoadRoute({
                  ...loadRoute,
                  downloading: {
                    ...loadRoute.downloading,
                    downloadingTime: { timeRange: when },
                  },
                });
              } else {
                if (loadRoute) {
                  updateLoadRoute({
                    ...loadRoute,
                    downloading: { downloadingTime: { timeRange: when } },
                  });
                } else {
                  updateLoadRoute({
                    downloading: { downloadingTime: { timeRange: when } },
                  });
                }
              }
            }
          }}
          isSelected={
            loadRoute &&
            loadRoute.downloading &&
            loadRoute.downloading.downloadingTime &&
            loadRoute.downloading.downloadingTime.timeRange
              ? loadRoute.downloading.downloadingTime.timeRange.isAlways
              : undefined
          }
        >
          24 hours a day
        </Checkbox>
      </div>
      <Divider className="my-5 " />
    </div>
  );
};

export default CreateLoadRoute;
