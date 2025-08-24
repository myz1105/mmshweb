"use client";
import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Accordion,
  AccordionItem,
  Avatar,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import CompanyTable from "../company/components/company-table";
import UserTable from "./components/user-table";

const MainPage: React.FC = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="max-h-max mx-1 h-full p-1 pb-3">
      <Accordion selectionMode="multiple" defaultExpandedKeys={["1"]}>
        <AccordionItem
          key="1"
          aria-label="Companies"
          subtitle="4 new company requests"
          title="Companies"
        ></AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Janelle Lenard"
          subtitle="3 incompleted steps"
          title="Users"
        >
          <UserTable />
        </AccordionItem>
      </Accordion>

      <div></div>
    </div>
  );
};

export default MainPage;
