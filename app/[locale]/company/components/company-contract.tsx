import { Button, Card, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";

// Import the wrapper UI from company-details.tsx

const CompanyContracts: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 pt-5">
      <h5 className="text-md font-semibold mb-2  text-gray-500">
        Employee Contract Sample
      </h5>
      <Card className="shadow rounded-lg p-4 ">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Sample Contract
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This is a sample contract for employees. Please review the terms and
          conditions carefully.
        </p>
        <div className="flex justify-between items-end">
          <div className="flex gap-4">
            <span className="text-sm text-gray-500">Version 1.0</span>
            <span className="text-sm text-gray-500">12 mb</span>
            <span className="text-sm text-gray-500">
              Last updated: 01/01/2023
            </span>
          </div>
          <div className="flex justify-end gap-2 px-3 mt-4">
            <Button isIconOnly variant="flat" size="sm">
              <Icon icon="grommet-icons:document-update" fontSize={20} />
            </Button>
            <Button isIconOnly variant="flat" size="sm">
              <Icon icon="line-md:download" fontSize={20} />
            </Button>

            <Button isIconOnly variant="flat" size="sm" color="danger">
              <Icon icon="line-md:trash" fontSize={20} />
            </Button>
          </div>
        </div>
      </Card>
      <h5 className="text-md font-semibold mb-2 text-gray-500 dark:text-gray-400">
        Partnership Agreement Sample
      </h5>
      <Card className="shadow rounded-lg p-4 ">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Sample Contract
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This is a sample partnership agreement. Please review all partnership
          terms and obligations carefully.
        </p>
        <div className="flex justify-between items-end">
          <div className="flex gap-4">
            <span className="text-sm text-gray-500">Version 1.0</span>
            <span className="text-sm text-gray-500">12 mb</span>
            <span className="text-sm text-gray-500">
              Last updated: 01/01/2023
            </span>
          </div>
          <div className="flex justify-end gap-2 px-3 mt-4">
            <Button isIconOnly variant="flat" size="sm">
              <Icon icon="grommet-icons:document-update" fontSize={20} />
            </Button>
            <Button isIconOnly variant="flat" size="sm">
              <Icon icon="line-md:download" fontSize={20} />
            </Button>
            <Button isIconOnly variant="flat" size="sm" color="danger">
              <Icon icon="line-md:trash" fontSize={20} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CompanyContracts;
