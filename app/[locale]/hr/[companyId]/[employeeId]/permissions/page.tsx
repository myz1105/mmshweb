"use client";
import {
  Button,
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
import { DataManageRoleControler } from "../../../ui/permission-ui";

const TestPage: React.FC = () => {
  const [rolesValue, setRolesValue] = React.useState<number>(
    DataManageRole.None,
  );

  const tabs = ["Company", "Logistics", "HR", "Accounting"];

  return (
    <div className="flex flex-col items-start p-4 gap-4 overflow-auto">
      <Tabs
        aria-label="Options"
        classNames={{ tab: "w-[120px]", panel: "w-full" }}
      >
        <Tab key={tabs[0]} title={tabs[0]}>
          <DataManageRoleControler
            title="Company Information"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Company Documents"
            value={rolesValue}
            onChange={setRolesValue}
          />
        </Tab>
        <Tab key={tabs[1]} title={tabs[1]}>
          <DataManageRoleControler
            title="Loads"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Shippings"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Logistics Partners"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Logistics Reports"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Logistics Analytics"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Logistics Settings"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Team Control"
            value={rolesValue}
            onChange={setRolesValue}
          />
        </Tab>
        <Tab key={tabs[2]} title={tabs[2]}>
          <DataManageRoleControler
            title="Employees"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="HR Reports"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="HR Analytics"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="HR Settings"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Contracts"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Daily Activation"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Salary"
            value={rolesValue}
            onChange={setRolesValue}
          />
        </Tab>
        <Tab key={tabs[3]} title={tabs[3]}>
          <DataManageRoleControler
            title="Invoices"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Payments"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Accounting Partners"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Accounting Reports"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Accounting Analytics"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Accounting Settings"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Contracts"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Daily Activation"
            value={rolesValue}
            onChange={setRolesValue}
          />
          <DataManageRoleControler
            title="Salary"
            value={rolesValue}
            onChange={setRolesValue}
          />
        </Tab>
      </Tabs>
      <div className="flex justify-end p-4 gap-4 w-full">
        <Button color="default" variant="bordered">
          Back
        </Button>
        <Button color="primary">Save Changes</Button>
      </div>
    </div>
  );
};

export default TestPage;

// ...existing code...
