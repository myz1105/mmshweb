import { useClient } from "@/src/contexts/legacy/profile-management/client-context";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
} from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import { StarProgressBar } from "../../company/utils";
import { Icon } from "@iconify/react";
import { iconMap } from "../../company/types";
import {
  statusColorMap,
  statusLabels,
} from "../../company/components/fakeData";
import React from "react";
import { ContractGraph } from "../types";
import { Key } from "@react-types/shared";

interface SortDescriptor {
  column: Key;
  direction: "ascending" | "descending";
}

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Checking", uid: "checking" },
];
interface Column {
  name: string;
  uid: string;
  sortable?: boolean;
}
export const columns: Column[] = [
  { name: "ID", uid: "Id", sortable: true },
  { name: "NAME", uid: "Name", sortable: true },
  { name: "INN", uid: "Inn", sortable: true },
  { name: "OKED", uid: "Oked" },
  { name: "CONTACTS", uid: "Contacts" },
  { name: "STATUS", uid: "Status", sortable: true },
  { name: "ACTIONS", uid: "Actions" },
];
const stateMap = {
  0: "Inactive",
  1: "Processing",
  2: "Active",
};

type ContractCardProps = {
  contract: ContractGraph;
  contNum?: number;
};

const HRContractCard: React.FC<ContractCardProps> = ({ contract, contNum }) => {
  const router = useRouter();
  const logoUrl = contract.Img;
  const { companyId } = useParams();
  return (
    <Card className="w-80 bg-content2">
      <CardHeader className="flex flex-row items-start justify-between p-4">
        <div className="flex flex-col items-start gap-1">
          {logoUrl && (
            <Badge
              content={contract.Status}
              placement="bottom-right"
              size="sm"
              className="px-1 text-[10px] font-semibold border-none"
            >
              <Avatar
                src={logoUrl}
                alt={`${contract.Name} logo`}
                className="w-20 h-20 text-large"
                name={contract.Name.substring(0, 2).toUpperCase()}
              />
            </Badge>
          )}
          <h4 className="text-md font-semibold text-center">
            {contract.Name} {contract.Surname}
          </h4>
          <div className="flex gap-1 items-center">
            <StarProgressBar value={3.5} max={5} size={16} color="primary" />
            <Icon
              icon="mdi:file-document-check"
              className="text-green-700"
              fontSize={16}
            />
            <div className="text-sm text-gray-500 flex items-center">
              <Icon icon="material-symbols:recommend" fontSize={16} /> {10}
            </div>
          </div>
        </div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly variant="light" size="sm" className="p-2 w-auto">
              <Icon icon="ri:more-fill" fontSize={18} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              key="view"
              onPress={() => router.push(`${companyId}/${contract.Id}`)}
            >
              View
            </DropdownItem>
            <DropdownItem key="edit">Edit</DropdownItem>
            <DropdownItem key="delete">Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody>
        <div className="bg-content1 rounded-lg p-4">
          <div className="flex mb-2 flex-col justify-between gap-2 text-sm">
            <div className="mb-2  text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Contacts:</span>
              <div className="flex gap-1 items-center">
                <span className="text-small"> {contract.Contacts}</span>
              </div>
            </div>
            <div className="mb-2 text-gray-600 dark:text-gray-300 flex flex-col ">
              <div className="font-semibold ">Company:</div>
              <div className="text-small">{contract.Company}</div>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between gap-3 p-4 pt-2 mt-2">
        <div className="flex items-center h-fit gap-2">
          <Chip variant="flat" size="sm">
            {contract.Status}
          </Chip>
          <Button isIconOnly variant="light" color="default" size="sm">
            <Icon icon="ic:baseline-chat" fontSize={18} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export default HRContractCard;

export function HRContractBlocks({
  contracts = [],
}: {
  contracts?: ContractGraph[];
}) {
  const router = useRouter();
  const { getImage } = useClient();

  const [filterValue, setFilterValue] = React.useState<string>("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = React.useState<number>(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...contracts];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.Name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.Status),
      );
    }

    return filteredUsers;
  }, [contracts, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof ContractGraph];
      const second = b[sortDescriptor.column as keyof ContractGraph];

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

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<Icon icon="ri:search-line" fontSize={20} />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<Icon icon="mingcute:down-fill" fontSize={18} />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              endContent={<Icon icon="line-md:plus" />}
              onPress={() => {
                router.push("/company/create");
              }}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {contracts.length} companies
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onRowsPerPageChange,
    contracts.length,
    onSearchChange,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? `All ${filteredItems.length} selected`
            : selectedKeys.size === 0
              ? "No items selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages]);

  return (
    <div className="flex flex-col gap-4 w-full p-2 min-w-md h-full pt-3">
      {topContent}
      <div className="flex-grow w-full">
        <div className="flex flex-wrap gap-4  p-2 ">
          {sortedItems.map((contract) => (
            <HRContractCard key={contract.Id} contract={contract} />
          ))}
        </div>
      </div>

      {bottomContent}
    </div>
  );
}
