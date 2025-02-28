"use client";
import React, { useEffect, useState } from "react";
import { Divider, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import { use } from "i18next";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index === currentStep ? "active" : ""}`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default Stepper;

interface StepProps {
  onChecked?: (value: boolean) => void;
  isChecked?: boolean;
  width?: number; // Make width optional
  description?: React.ReactNode; // Use ReactNode for better type safety
  title: string;
  value?: number;
  maxValue?: number;
  icon?: React.ReactNode;
  stepNumber?: number;
  isFocused?: boolean;
}

export const Step: React.FC<StepProps> = (arg: Partial<StepProps> = {}) => {
  const [isChecked, setIsChecked] = useState(arg.isChecked ?? false);

  useEffect(() => {
    setIsChecked(arg.isChecked ?? false);
  }, [arg.isChecked]);

  return (
    <li
      className={
        arg.isFocused || arg.isChecked
          ? `flex flex-col max-w-[350px] mb-2`
          : `flex flex-col max-w-[350px] mb-2 opacity-50`
      } // Keep max width fixed
      style={{ width: arg.width ? `${arg.width}px` : "350px" }} // Set dynamic width
    >
      <div className="flex gap-3 my-2 items-start">
        {arg.icon ? (
          arg.icon
        ) : arg.stepNumber ? (
          <div
            className={
              isChecked
                ? "min-h-[35px] min-w-[35px] max-h-[35px] max-w-[35px] flex items-center justify-center rounded-full  font-semibold border-2 border-success"
                : "min-h-[35px] min-w-[35px] max-h-[35px] max-w-[35px] flex items-center justify-center rounded-full  font-semibold border-2  border-default"
            }
          >
            {arg.stepNumber}
          </div>
        ) : (
          ""
        )}
        <div className="w-full grow">
          <h3 className="font-medium leading-tight mb-1">{arg.title}</h3>
          <Progress
            aria-label="Loading..."
            color={isChecked ? "success" : "default"}
            className="max-w-md"
            size="sm"
            value={isChecked ? 100 : arg.value ? arg.value : 0}
            maxValue={isChecked ? 100 : arg.maxValue ? arg.maxValue : 100}
          />
          <div className="text-sm ">{arg.description}</div>
        </div>
        {isChecked && (
          <Icon
            icon="line-md:confirm"
            width={45}
            height={45}
            className="text-success"
          />
        )}
      </div>
    </li>
  );
};
