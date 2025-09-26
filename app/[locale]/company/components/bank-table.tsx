import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@heroui/react";
import { Selection } from "@heroui/react";
import { Icon } from "@iconify/react";

// Define User type

interface ContactType {
  Id: any;
  Type: string;
  Data: string;
}

// Define the columns structure
interface Column {
  name: string;
  uid: string;
  sortable?: boolean;
}

// Define the sort descriptor type
import { Key } from "@react-types/shared";
import { useRouter } from "next/navigation";
import { useClient } from "@/contexts/profile-management/client-context";
import { Bank, BankAccount } from "../contexts/create-company-context";

interface SortDescriptor {
  column: Key;
  direction: "ascending" | "descending";
}

export const columns: Column[] = [
  { name: "BANK NAME", uid: "Name", sortable: true },
  { name: "MFO", uid: "MFO", sortable: true },
  { name: "ACCOUNT NUMBER", uid: "AccountNumbers" },
  { name: "ACTIONS", uid: "Actions" },
];

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Checking", uid: "checking" },
];

export function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

// Icon components remain unchanged...

const statusColorMap: Record<string, string> = {
  active: "success",
  paused: "danger",
  checking: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["Name", "MFO", "AccountNumbers", "Actions"];

export default function BankTable({ banks }: { banks: Bank[] }) {
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = React.useState<number>(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...banks];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.Name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [banks, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Bank];
      const second = b[sortDescriptor.column as keyof Bank];

      let cmp = 0;
      if (first === undefined && second === undefined) {
        cmp = 0;
      } else if (first === undefined) {
        cmp = -1;
      } else if (second === undefined) {
        cmp = 1;
      } else {
        cmp = first < second ? -1 : first > second ? 1 : 0;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((bank: Bank, columnKey: string) => {
    const cellValue = bank[columnKey as keyof Bank];
    switch (columnKey) {
      case "Name":
        return <p className="text-bold text-small capitalize">{bank.Name}</p>;
      case "MFO":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{bank.MFO}</p>
          </div>
        );
      case "AccountNumbers":
        return (
          <div className="flex flex-col gap-1">
            {Array.isArray(bank.AccountNumbers)
              ? bank.AccountNumbers.map((cont: BankAccount) => (
                  <div key={cont.AccountNumber}>
                    {cont.AccountNumber} {cont.AccountType}
                  </div>
                ))
              : null}
          </div>
        );
      case "Actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <Icon
                    icon="akar-icons:more-vertical"
                    className="dark:text-gray-300 text-gray-600"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="view">View</DropdownItem>
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem key="delete">Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return <div />;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  return (
    <Table
      isHeaderSticky
      aria-label="Example table with custom cells, pagination and sorting"
      classNames={{
        wrapper: "h-full",
        base: "h-full",
      }}
      selectedKeys={selectedKeys}
      selectionMode="single"
      sortDescriptor={sortDescriptor}
      onSelectionChange={setSelectedKeys}
      onSortChange={(descriptor: SortDescriptor) =>
        setSortDescriptor(descriptor)
      }
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No loads found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.Name}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey.toString())}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
