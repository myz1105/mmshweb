"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableCell,
  TableRow,
} from "@heroui/react";

export default function LoadManager() {
  const [loadTypes, setLoadTypes] = useState<string[]>([]);
  const [packageTypes, setPackageTypes] = useState<string[]>([]);
  
  const [newLoadType, setNewLoadType] = useState("");
  const [newPackageType, setNewPackageType] = useState("");

  useEffect(() => {
    setLoadTypes(["Heavy Load", "Light Load", "Bulk", "Palletized Goods", "Heavy Load", "Light Load", "Bulk", "Palletized Goods"]);
    setPackageTypes(["Fragile", "Boxed Goods", "Liquid Containers", "Frozen Items", "Heavy Load", "Light Load", "Bulk", "Palletized Goods"]);
  }, []);

  function addLoadType(newType: string) {
    if (newType.trim()) {
      setLoadTypes([...loadTypes, newType.trim()]);
      setNewLoadType("");
    }
  }

  function addPackageType(newType: string) {
    if (newType.trim()) {
      setPackageTypes([...packageTypes, newType.trim()]);
      setNewPackageType("");
    }
  }

  return (
    <div className="mb-[150px]">
      <h1 className="mt-2 text-2xl font-semibold">Load Types</h1>

      {/* Load Type Input */}
      <div className="space-y-2">
        <div className="flex items-end gap-2">
          <Input
            label="Add new load type"
            labelPlacement="outside"
            type="text"
            className="flex-grow"
            value={newLoadType}
            onChange={(e) => setNewLoadType(e.target.value)}
          />
          <Button
            onPress={() => addLoadType(newLoadType)}
            className="bg-gray-700 text-white no-margin"
          >
            Add
          </Button>
        </div>


        {/* Load Types  Table */}
        <div className="max-h-[250px] block overflow-y-auto">
          <Table aria-label="Load Types Table">
            <TableHeader>
              <TableColumn>Load Types</TableColumn>
            </TableHeader>
            <TableBody>
              {loadTypes.length > 0 ? (
                loadTypes.map((type, index) => (
                  <TableRow key={index}>
                    <TableCell>{type}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No load types added yet</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <h1 className="mt-[30px] text-2xl font-semibold">Package Types</h1>

      {/* Package Type Input */}
      <div className="space-y-2">
        <div className="flex items-end gap-2">
          <Input
            label="Add new package type"
            labelPlacement="outside"
            type="text"
            className="mt-5"
            value={newPackageType}
            onChange={(e) => setNewPackageType(e.target.value)}
          />
          <Button
            onPress={() => addPackageType(newPackageType)}
            className="bg-gray-700 text-white block mx-auto"
          >
            Add
          </Button>
        </div>

        {/* Package Types Table */}
        <div className="max-h-[250px] block overflow-y-auto">
          <Table aria-label="Package Types Table">
            <TableHeader>
              <TableColumn>Package Types</TableColumn>
            </TableHeader>
            <TableBody>
              {packageTypes.length > 0 ? (
                packageTypes.map((type, index) => (
                  <TableRow key={index}>
                    <TableCell>{type}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No package types added yet</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
