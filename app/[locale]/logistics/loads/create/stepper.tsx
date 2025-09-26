"use client";
import React, { use, useEffect, useState } from "react";
import { Step } from "@/components/main_components/stepper";
import {
  Avatar,
  Badge,
  Chip,
  Divider,
  Progress,
  Spinner,
  User,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { IoIosPerson } from "react-icons/io";
import { Button, Input, Checkbox, Link } from "@heroui/react";
import { useLoadCreation } from "../contexts/create-load-context";
import { LoadCreationStatus } from "./constants";
import {
  LoadStatus,
  LoadStatusDescription,
  LoadVisibility,
  LoadVisibilityDescription,
} from "../utils/types";

interface CheckIconProps {
  size?: number;
  height?: number;
  width?: number;
  [key: string]: any;
}

export const CheckIcon: React.FC<CheckIconProps> = ({
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill="currentColor"
      />
    </svg>
  );
};

const CreateLoadStepper: React.FC = () => {
  const {
    loadCreationState,
    canSave,
    loadDetails,
    loadRoute,
    trailerDetails,
    contractInformation,
    loadVisibility,
    isLoadDetailsValid,
    isLoadRouteValid,
    isTrailerDetailsValid,
    isContactInformationValid,
    isLoadVisibilityValid,
    loadDetailsCompilationPercentage,
    loadRouteCompilationPercentage,
    trailerDetailsCompilationPercentage,
    contactInformationCompilationPercentage,
    loadVisibilityCompilationPercentage,
    isOnSaving,
  } = useLoadCreation();

  return (
    <div className="hidden overflow-auto lg:flex lg:visible h-full  flex-col py-8 px-6  ring-1 ring-gray-900/5 border border-default-200 bg-gradient-to-br from-white to-violet-50 dark:from-default-50 dark:to-black">
      <h1 className="pt-2 text-xl font-semibold text-center">
        Create new load
      </h1>
      <Step
        width={300}
        isChecked={isLoadDetailsValid}
        title="Load details"
        description={
          <div className="my-1">
            <div className="flex gap-1 flex-wrap my-1">
              {loadDetailsCompilationPercentage > 0 && (
                <div className="flex gap-1">
                  {loadDetails.name && (
                    <span className="font-semibold">{loadDetails.name}</span>
                  )}
                  {loadDetails.weight && loadDetails.weight.value > 0 && (
                    <span className="font-semibold">
                      {loadDetails.weight.value}
                      {loadDetails.weight.unit}
                    </span>
                  )}
                  {loadDetails.volume && loadDetails.volume.value > 0 && (
                    <span className="font-semibold">
                      {loadDetails.volume.value}m<sup>3</sup>
                    </span>
                  )}
                </div>
              )}
              {loadDetails.package && (
                <div className="flex gap-1">
                  Pack:
                  {loadDetails.package.name && (
                    <span className="font-semibold">
                      {loadDetails.package.name}
                    </span>
                  )}
                  {loadDetails.package.quantity && (
                    <span className="font-semibold">
                      {loadDetails.package.quantity}
                      pc
                    </span>
                  )}
                  {loadDetails.package.diameter &&
                    loadDetails.package.diameter.value > 0 && (
                      <span className="font-semibold flex">
                        <Icon icon="lucide:diameter" />
                        {loadDetails.package.diameter.value}
                        {loadDetails.package.diameter.unit}
                      </span>
                    )}
                  {loadDetails.package.length &&
                    loadDetails.package.length.value > 0 && (
                      <span className="font-semibold flex">
                        <Icon icon="lucide:ruler-dimension-line" />
                        {loadDetails.package.length.value}
                        {loadDetails.package.length.unit}
                      </span>
                    )}
                  {loadDetails.package.width &&
                    loadDetails.package.width.value > 0 && (
                      <span className="font-semibold flex">
                        <Icon icon="akar-icons:width" />
                        {loadDetails.package.width.value}
                        {loadDetails.package.width.unit}
                      </span>
                    )}
                  {loadDetails.package.height &&
                    loadDetails.package.height.value > 0 && (
                      <span className="font-semibold flex">
                        <Icon icon="ic:baseline-height" />
                        {loadDetails.package.height.value}
                        {loadDetails.package.height.unit}
                      </span>
                    )}
                </div>
              )}
            </div>
          </div>
        }
        isFocused={loadCreationState === LoadCreationStatus.EnterLoadDetails}
        icon={<Icon icon="fluent:document-cube-20-regular" fontSize={35} />}
        value={loadDetailsCompilationPercentage}
      />
      <Step
        width={300}
        isChecked={isLoadRouteValid}
        title="Load route"
        description={
          <div className="my-1">
            <div className="flex gap-1 flex-wrap my-1">
              {loadRouteCompilationPercentage > 0 && (
                <div className="flex gap-3">
                  {loadRoute.when && loadRoute.when.dateInterval && (
                    <div className="flex items-center gap-1">
                      <Icon icon="bi:calendar3-range" />
                      <span className="font-semibold">
                        {loadRoute.when.dateInterval.start.day}/
                        {loadRoute.when.dateInterval.start.month}-
                        {loadRoute.when.dateInterval.end.day}/
                        {loadRoute.when.dateInterval.end.month}
                      </span>
                    </div>
                  )}
                  {loadRoute.uploading && loadRoute.uploading.address && (
                    <div className="flex items-center">
                      <Icon icon="fa-solid:truck-loading" />
                      <Icon icon="mingcute:arrow-up-fill" />
                      <span className="font-semibold">
                        {loadRoute.uploading.address?.formatted_address}
                      </span>
                    </div>
                  )}
                  {loadRoute.downloading && loadRoute.downloading.address && (
                    <div className="flex items-center ">
                      <Icon icon="fa-solid:truck-loading" />
                      <Icon icon="mingcute:arrow-down-fill" />
                      <span className="font-semibold">
                        {loadRoute.downloading.address?.formatted_address}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        }
        isFocused={loadCreationState === LoadCreationStatus.EnterRoute}
        icon={<Icon icon="material-symbols:route" fontSize={35} />}
        value={loadRouteCompilationPercentage}
      />
      <Step
        width={300}
        isChecked={isTrailerDetailsValid}
        title="Trailer details"
        description={
          <div className="my-1">
            <div className="flex flex-wrap gap-3">
              {trailerDetails &&
                trailerDetails.trailerTypes &&
                trailerDetails.trailerTypes.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Icon
                      icon="fa-solid:trailer"
                      className="flex-none"
                      fontSize={18}
                    />
                    <span className="font-semibold">
                      {trailerDetails.trailerTypes
                        .map((t: { name: string }) => t.name)
                        .join(", ")}
                    </span>
                  </div>
                )}
              {trailerDetails && trailerDetails.loadingFeature && (
                <div className="flex items-start gap-1">
                  <div className="relative">
                    <Icon
                      icon="mdi:arrow"
                      className="absolute -left-1  -top-2"
                    />
                    <Icon
                      icon="ph:shipping-container"
                      className="flex-none"
                      fontSize={18}
                    />
                  </div>
                  <span className="font-semibold">
                    {trailerDetails.loadingFeature
                      .map((t: { name: string }) => t.name)
                      .join(", ")}
                  </span>
                </div>
              )}
              {trailerDetails && trailerDetails.unloadingFeature && (
                <div className="flex items-start gap-1">
                  <div className="relative">
                    <Icon
                      icon="ph:shipping-container"
                      className="flex-none"
                      fontSize={18}
                    />
                    <Icon
                      icon="mdi:arrow"
                      className="absolute -right-1  -top-2 "
                    />
                  </div>

                  <span className="font-semibold">
                    {trailerDetails.unloadingFeature
                      .map((t: { name: string }) => t.name)
                      .join(", ")}
                  </span>
                </div>
              )}
              {trailerDetails &&
                trailerDetails.permissions &&
                trailerDetails.permissions.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="icon-park-outline:permissions"
                      className="flex-none"
                      fontSize={18}
                    />

                    <span className="font-semibold">
                      {trailerDetails.permissions
                        .map((t: { name: string }) => t.name)
                        .join(", ")}
                    </span>
                  </div>
                )}
              {trailerDetails &&
                trailerDetails.requirements &&
                trailerDetails.requirements.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="pajamas:requirements"
                      className="flex-none"
                      fontSize={18}
                    />

                    <span className="font-semibold">
                      {trailerDetails.requirements
                        .map((t: { name: string }) => t.name)
                        .join(", ")}
                    </span>
                  </div>
                )}

              {trailerDetails && trailerDetails.isTwoDriverRequired && (
                <div className="flex items-center gap-1">
                  <Icon
                    icon="healthicons:truck-driver"
                    className="flex-none"
                    fontSize={20}
                  />
                  <span className="font-semibold">2</span>
                </div>
              )}
              {trailerDetails && trailerDetails.numberOfCars > 0 && (
                <div className="flex items-center gap-1">
                  <Icon icon="ri:truck-line" fontSize={20} />
                  <span className="font-semibold">
                    {trailerDetails.numberOfCars}
                  </span>
                </div>
              )}
              {trailerDetails && trailerDetails.adr && (
                <div className="flex items-center gap-1">
                  <span className="font-semibold">
                    ADR:{trailerDetails.adr}
                  </span>
                </div>
              )}
              {trailerDetails && trailerDetails.numberOfRequiredBelts > 0 && (
                <div className="flex items-center gap-1">
                  <Icon icon="ph:belt" fontSize={20} />
                  <span className="font-semibold">
                    {trailerDetails.numberOfRequiredBelts}
                  </span>
                </div>
              )}
            </div>
          </div>
        }
        isFocused={loadCreationState === LoadCreationStatus.EnterTraileDetails}
        icon={
          <Icon icon="fluent:document-table-truck-24-regular" fontSize={35} />
        }
        value={trailerDetailsCompilationPercentage}
      />
      <Step
        width={300}
        isChecked={isContactInformationValid}
        title="Contacts and price information"
        description={
          <div className="flex gap-3 flex-wrap my-1">
            {contractInformation && contractInformation.loadPrice && (
              <div className="flex items-center gap-1">
                <Icon icon="solar:delivery-bold" fontSize={20} />
                <span className="font-semibold">
                  {contractInformation.loadPrice.value}
                  {contractInformation.loadPrice.unit}
                </span>
              </div>
            )}
            {contractInformation && contractInformation.shippingPrice && (
              <div className="flex items-center gap-1">
                <Icon
                  icon="material-symbols:delivery-truck-speed-outline"
                  fontSize={20}
                />

                <span className="font-semibold">
                  {contractInformation.shippingPrice.min &&
                    contractInformation.shippingPrice.min}
                  {contractInformation.shippingPrice.min &&
                    contractInformation.shippingPrice.min &&
                    "-"}
                  {contractInformation.shippingPrice.max &&
                    contractInformation.shippingPrice.max}

                  {" " + contractInformation.shippingPrice.unit}
                </span>
              </div>
            )}
            {contractInformation && contractInformation.manager && (
              <div className="flex items-end gap-1">
                <Icon icon="raphael:customer" fontSize={20} />
                <span className="font-semibold">
                  {contractInformation.manager.firstname +
                    " " +
                    contractInformation.manager.lastname}
                </span>
              </div>
            )}
            {contractInformation && contractInformation.partner && (
              <div className="flex items-end gap-1">
                <Icon icon="fluent:building-people-20-regular" fontSize={20} />
                <span className="font-semibold">
                  {contractInformation.partner.firstname +
                    " " +
                    contractInformation.partner.lastname}
                </span>
              </div>
            )}
          </div>
        }
        isFocused={
          loadCreationState === LoadCreationStatus.EnterContactAndPrices
        }
        icon={<Icon icon="ic:outline-contact-phone" fontSize={35} />}
        value={contactInformationCompilationPercentage}
      />
      <Step
        width={300}
        isChecked={isLoadVisibilityValid}
        title="Load information visibility"
        description={
          <div className="my-1">
            <div className="flex gap-1 flex-wrap my-1">
              {loadVisibility && (
                <div className="flex items-center gap-1">
                  {loadVisibility.visibility === 0 && (
                    <Icon icon="mdi:users-outline" fontSize={20} />
                  )}
                  {loadVisibility.visibility === 1 && (
                    <Icon
                      icon="material-symbols:groups-outline"
                      fontSize={20}
                    />
                  )}
                  {loadVisibility.visibility === 2 && (
                    <Icon icon="icon-park-outline:every-user" fontSize={20} />
                  )}
                  {loadVisibility.visibility === 3 && (
                    <Icon icon="weui:me-outlined" fontSize={20} />
                  )}
                  <span className="font-semibold">
                    {
                      LoadVisibilityDescription[
                        loadVisibility.visibility as LoadVisibility
                      ]
                    }
                  </span>
                </div>
              )}
              {loadVisibility && (
                <div className="flex items-center gap-1">
                  {loadVisibility.status === 0 && (
                    <Icon icon="fontisto:checkbox-active" fontSize={15} />
                  )}
                  {loadVisibility.status === 1 && (
                    <Icon icon="ep:finished" fontSize={18} />
                  )}
                  {loadVisibility.status === 2 && (
                    <Icon icon="fluent-mdl2:blocked-2" fontSize={18} />
                  )}
                  <span className="font-semibold">
                    {LoadStatusDescription[loadVisibility.status as LoadStatus]}
                  </span>
                </div>
              )}
            </div>
          </div>
        }
        isFocused={
          loadCreationState === LoadCreationStatus.SetLoadVisibilityAndStatus
        }
        icon={<Icon icon="tdesign:task-visible" fontSize={35} />}
        value={loadVisibilityCompilationPercentage}
      />
      <Button
        color="success"
        className="mt-5 font-bold text-current"
        // isDisabled={canSave === false}
        startContent={isOnSaving && <Spinner />}
        isDisabled={!canSave}
        onPress={() => {}}
      >
        Save
      </Button>
    </div>
  );
};

export default CreateLoadStepper;
