"use client";
import React, { useState } from "react";
import { Step } from "@/components/main_components/stepper";
import { Icon } from "@iconify/react";
import { IoIosPerson } from "react-icons/io";
import { Button } from "@heroui/react";
import CreateTruckDetails from "./truck_details";

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

export enum LoadCreationStatus {
  EnterLoadDetails,
  EnterRoute,
  EnterTraileDetails,
}

const CreatePage: React.FC = () => {
  const handleOnChecked = (value: boolean) => {};
  const [loadCreationState, setLoadCreationState] = useState(
    LoadCreationStatus.EnterLoadDetails
  );
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  return (

    <div className="flex h-full ">
      <div className="grow overflow-auto pb-[100px]">
        <div>
          {loadCreationState === LoadCreationStatus.EnterLoadDetails && (
            <CreateTruckDetails />
          )}
          <div className="flex justify-between max-w-3xl gap-6 px-6">
            <Button variant="bordered">
              <Icon icon="material-symbols:cancel-outline" fontSize={18} />{" "}
              Cancel
            </Button>
            <div className="flex gap-3">
              <Button
                className=" min-w-[100px]"
                variant="bordered"
                onPress={() => {
                  if (loadCreationState === LoadCreationStatus.EnterLoadDetails)
                    setLoadCreationState(LoadCreationStatus.EnterTraileDetails);
                  else if (loadCreationState === LoadCreationStatus.EnterRoute)
                    setLoadCreationState(LoadCreationStatus.EnterLoadDetails);
                  else setLoadCreationState(LoadCreationStatus.EnterRoute);
                }}
              >
                <Icon icon="material-symbols:arrow-back" fontSize={20} />
                Back
              </Button>
              <Button
                className=" min-w-[100px]"
                variant="solid"
                color="success"
                onPress={() => {
                  if (loadCreationState === LoadCreationStatus.EnterLoadDetails)
                    setLoadCreationState(LoadCreationStatus.EnterRoute);
                  else if (loadCreationState === LoadCreationStatus.EnterRoute)
                    setLoadCreationState(LoadCreationStatus.EnterTraileDetails);
                  else
                    setLoadCreationState(LoadCreationStatus.EnterLoadDetails);
                }}
              >
                Next{" "}
                <Icon icon="material-symbols:arrow-forward" fontSize={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col py-8 px-6  ring-1 ring-gray-900/5 border border-default-200 bg-gradient-to-br from-white to-violet-50 dark:from-default-50 dark:to-black ">
        <h1 className="pt-2 text-xl font-semibold text-center">
          Authentication
        </h1>
        <Step
          width={300}
          isChecked={true}
          title="Load details"
          description="22T, 103 m3, 3000$ "
          stepNumber={1}
          isFocused={false}
        />
        <Step
          width={300}
          isChecked={true}
          value={50}
          title="Route"
          description="Rossiya - Uzbekistan cal;kd;als as;ldj as;ldj alskdkjash dkasjh dkjash dkjas kjdgaskjhdgkasjgd"
          icon={<IoIosPerson size={30} />}
          isFocused={true}
        />
        <Step
          width={300}
          isChecked={false}
          value={50}
          title="Route"
          description="Rossiya - Uzbekistan cal;kd;als as;ldj as;ldj alskdkjash dkasjh dkjash dkjas kjdgaskjhdgkasjgd"
          icon={<IoIosPerson size={30} />}
        />
        <Step
          width={300}
          isChecked={false}
          value={50}
          title="Route"
          description="Rossiya - Uzbekistan cal;kd;als as;ldj as;ldj alskdkjash dkasjh dkjash dkjas kjdgaskjhdgkasjgd"
          icon={<IoIosPerson size={30} />}
        />
        <Button color="success" className="mt-5 font-bold text-current">
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreatePage;
