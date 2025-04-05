"use client";
import React from "react";
import CompanyTable from "../main/components/company-table";
import { useCompany } from "./contexts/company-context";

const Companies: React.FC = () => {
  const { companies } = useCompany();

  return (
    <div className=" mx-1 h-full p-1 pb-3">
      {companies && <CompanyTable companies={companies} />}
    </div>
  );
};

export default Companies;
