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

export default function TruckManager() {
  const [trailerType, setTrailerType] = useState<string[]>([]);
  const [trailerLoading, setTrailerLoading] = useState<string[]>([]);
  
  const [newtrailerType, setNewTrailerType] = useState("");
  const [newPackageType, setNewPackageType] = useState("");

  useEffect(() => {
    setTrailerType(["Heavy Load", "Light Load", "Bulk", "Palletized Goods", "Heavy Load", "Light Load", "Bulk", "Palletized Goods"]);
    setTrailerLoading(["Fragile", "Boxed Goods", "Liquid Containers", "Frozen Items", "Heavy Load", "Light Load", "Bulk", "Palletized Goods"]);
  }, []);

  function addTrailerType(newType: string) {
    if (newType.trim()) {
        setTrailerType([...trailerType, newType.trim()]);
        setNewTrailerType("");
    }
  }

  function addPackageType(newType: string) {
    if (newType.trim()) {
      setTrailerLoading([...trailerLoading, newType.trim()]);
      setNewPackageType("");
    }
  }

  return (
    <div className="mb-[150px]">
      <h1 className="mt-2 text-2xl font-semibold">Trailer Types</h1>

      {/* Trailer Type Input */}
      <div className="space-y-2">
        <div className="flex items-end gap-2">
          <Input
            label="Add new trailer type"
            labelPlacement="outside"
            type="text"
            className="flex-grow"
            value={newtrailerType}
            onChange={(e) => setNewTrailerType(e.target.value)}
          />
          <Button
            onPress={() => addTrailerType(newtrailerType)}
            className="bg-gray-700 text-white no-margin"
          >
            Add
          </Button>
        </div>


        {/* Load Types  Table */}
        <div className="max-h-[250px] block overflow-y-auto">
          <Table aria-label="Load Types Table">
            <TableHeader>
              <TableColumn>Trailer Types</TableColumn>
            </TableHeader>
            <TableBody>
              {trailerType.length > 0 ? (
                trailerType.map((type, index) => (
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

      <h1 className="mt-[30px] text-2xl font-semibold">Trailer Loading Direction</h1>

      {/* Trailer loading direction Input */}
      <div className="space-y-2">
        <div className="flex items-end gap-2">
          <Input
            label="Add new Trailer loading direction"
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

        {/* Trailer loading direction Table */}
        <div className="max-h-[250px] block overflow-y-auto">
          <Table aria-label="Package Types Table">
            <TableHeader>
              <TableColumn>Trailer Loading Direction</TableColumn>
            </TableHeader>
            <TableBody>
              {trailerLoading.length > 0 ? (
                trailerLoading.map((type, index) => (
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
