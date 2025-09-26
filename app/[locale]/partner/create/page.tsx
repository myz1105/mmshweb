"use client";
import React, { useState } from "react";
import { Step } from "@/components/main_components/stepper";
import { Icon } from "@iconify/react";
import { IoIosPerson } from "react-icons/io";
import { Button } from "@heroui/react";
import CreateTruckDetails from "./partner_details";
import { LoadCreationStatus } from "@/app/logistics/loads/create/constants";



const CreatePage: React.FC = () => {
  const handleOnChecked = (value: boolean) => {};
  const [loadCreationState, setLoadCreationState] = useState(
    LoadCreationStatus.EnterLoadDetails,
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
