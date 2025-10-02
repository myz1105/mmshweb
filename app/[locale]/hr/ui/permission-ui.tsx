import {
  Card,
  CardBody,
  CardHeader,
  cn,
  Divider,
  Switch,
  SwitchProps,
  Tab,
  Tabs,
} from "@heroui/react";
import React from "react";
import { DataManageRole, DataManageRoleInfo } from "@hr/types";

interface DataManageRoleControlerProps {
  title?: string;
  value: number;
  onChange: (value: number) => void;
}

export const DataManageRoleControler: React.FC<
  DataManageRoleControlerProps
> = ({ title, value, onChange }) => {
  const roles = Object.values(DataManageRole).filter(
    (v) =>
      typeof v === "number" &&
      v !== DataManageRole.All &&
      v !== DataManageRole.None,
  ) as DataManageRole[];

  const handleRoleChange = (checked: boolean, role: DataManageRole) => {
    let newValue: number;
    if (checked) {
      newValue = value | role;
    } else {
      newValue = value & ~role;
    }
    onChange(newValue);
  };

  return (
    <Card className="flex flex-col gap-1 mb-4 p-4 border shadow-sm dark:border-default-200 w-full">
      {title && (
        <CardHeader className="text-medium font-semibold text-default-500  mb-2">
          {title}
        </CardHeader>
      )}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 place-content-stretch">
        {roles.map((role) => (
          <DataManageRoleComponent
            key={role}
            manageRole={role}
            onRoleChange={handleRoleChange}
            checked={(value & role) === role}
          />
        ))}
      </div>
    </Card>
  );
};

interface DataManageRoleComponentProps
  extends Omit<SwitchProps, "onValueChange" | "isSelected"> {
  manageRole: DataManageRole;
  checked: boolean;
  onRoleChange?: (checked: boolean, role: DataManageRole) => void;
}

// ...existing code...
export const DataManageRoleComponent = ({
  manageRole: role,
  onRoleChange,
  checked,
  ...props
}: DataManageRoleComponentProps) => {
  const { name, description } = DataManageRoleInfo[role];

  const handleChange = (value: boolean) => {
    if (onRoleChange) {
      onRoleChange(value, role);
    }
  };

  return (
    <Switch
      isSelected={checked}
      onValueChange={handleChange}
      {...props}
      color="default"
      classNames={{
        base: cn(
          "inline-flex flex-row-reverse  bg-content1 hover:bg-content2 items-center",
          "justify-between items-stretch cursor-pointer rounded-lg gap-2 p-3 border-2 border-transparent",
          "data-[selected=true]:border-default-400 w-full max-w-full ",
        ),
        wrapper:
          "p-0 h-4 overflow-visible self-center group-data-[focus-visible=true]:ring-default-400",
        thumb: cn(
          "w-6 h-6 border-2 shadow-lg",
          "group-data-[hover=true]:border-default-400",
          //selected
          "group-data-[selected=true]:ms-6 ",
          // pressed
          "group-data-[pressed=true]:w-7 ",
          "group-data-pressed:group-data-selected:ms-4 ",
        ),
      }}
    >
      <div className="flex flex-col  min-w-[96px] gap-1 justify-self-start self-start">
        <p className="text-sm">{name}</p>
        <p className="text-tiny text-default-400">{description}</p>
      </div>
    </Switch>
  );
};
