"use client";
import React, { useEffect, useState } from "react";
import CompanyTable from "./components/company-table";
import { useCompany } from "./contexts/company-context";

import { Icon } from "@iconify/react";
import { StarProgressBar, StarRatingInput } from "./utils";

const Companies: React.FC = () => {
  const { companies } = useCompany();
  const [rates, setRates] = useState([3]);
  const [arate, setarate] = useState(0);

  function getAverage(numbers: number[]): number {
    if (numbers.length === 0) return 0; // avoid division by zero
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
  }

  useEffect(() => {
    setarate(getAverage(rates));
  }, [rates]);

  return (
    <div className=" mx-1 h-full p-1 pb-3">
      {companies && <CompanyTable companies={companies} />}
    </div>
  );
};

export default Companies;
