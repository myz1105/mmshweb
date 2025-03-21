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
interface CompanyType {
  id: number;
  name: string;
  type: string;
  inn: string;
  oked: string;
  contacts: any;
  status: string;
  img: string;
  addresses: string[];
}

interface ContactType {
  type: string;
  data: string;
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

interface SortDescriptor {
  column: Key;
  direction: "ascending" | "descending";
}

export const columns: Column[] = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "TYPE", uid: "type", sortable: true },
  { name: "INN", uid: "inn", sortable: true },
  { name: "OKED", uid: "oked" },
  { name: "CONTACTS", uid: "contacts" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Checking", uid: "checking" },
];

export const users: CompanyType[] = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    type: "IT Services",
    inn: "123456789",
    oked: "6201",
    contacts: [
      { type: "email", data: "info@techsolutions.com" },
      { type: "phone", data: "+1234567890" },
    ],
    img: "https://i.pravatar.cc/150?u=company1",
    addresses: ["123 Tech Street, Silicon Valley, CA"],
    status: "active",
  },
  {
    id: 2,
    name: "Green Energy Co.",
    type: "Renewable Energy",
    inn: "987654321",
    oked: "3511",
    contacts: [
      { type: "email", data: "contact@greenenergy.com" },
      { type: "phone", data: "+9876543210" },
    ],
    img: "https://i.pravatar.cc/150?u=company2",
    addresses: ["456 Green Avenue, Austin, TX"],
    status: "paused",
  },
  {
    id: 3,
    name: "HealthCare Plus",
    type: "Healthcare",
    inn: "456123789",
    oked: "8610",
    contacts: [
      { type: "email", data: "support@healthcareplus.com" },
      { type: "phone", data: "+4561237890" },
    ],
    img: "https://i.pravatar.cc/150?u=company3",
    addresses: ["789 Wellness Blvd, Miami, FL"],
    status: "checking",
  },
  {
    id: 4,
    name: "EduTech Innovators",
    type: "Education Technology",
    inn: "321654987",
    oked: "8542",
    contacts: [
      { type: "email", data: "hello@edutech.com" },
      { type: "phone", data: "+3216549870" },
    ],
    img: "https://i.pravatar.cc/150?u=company4",
    addresses: ["101 Learning Lane, Boston, MA"],
    status: "active",
  },
  {
    id: 5,
    name: "AgriGrow Ltd.",
    type: "Agriculture",
    inn: "654789321",
    oked: "0111",
    contacts: [
      { type: "email", data: "info@agrigrow.com" },
      { type: "phone", data: "+6547893210" },
    ],
    img: "https://i.pravatar.cc/150?u=company5",
    addresses: ["202 Farming Road, Des Moines, IA"],
    status: "paused",
  },
  {
    id: 1,
    name: "Tech Solutions Inc.",
    type: "IT Services",
    inn: "123456789",
    oked: "6201",
    contacts: [
      { type: "email", data: "info@techsolutions.com" },
      { type: "phone", data: "+1234567890" },
    ],
    img: "https://i.pravatar.cc/150?u=company1",
    addresses: ["123 Tech Street, Silicon Valley, CA"],
    status: "active",
  },
  {
    id: 2,
    name: "Green Energy Co.",
    type: "Renewable Energy",
    inn: "987654321",
    oked: "3511",
    contacts: [
      { type: "email", data: "contact@greenenergy.com" },
      { type: "phone", data: "+9876543210" },
    ],
    img: "https://i.pravatar.cc/150?u=company2",
    addresses: ["456 Green Avenue, Austin, TX"],
    status: "paused",
  },
  {
    id: 3,
    name: "HealthCare Plus",
    type: "Healthcare",
    inn: "456123789",
    oked: "8610",
    contacts: [
      { type: "email", data: "support@healthcareplus.com" },
      { type: "phone", data: "+4561237890" },
    ],
    img: "https://i.pravatar.cc/150?u=company3",
    addresses: ["789 Wellness Blvd, Miami, FL"],
    status: "checking",
  },
  {
    id: 4,
    name: "EduTech Innovators",
    type: "Education Technology",
    inn: "321654987",
    oked: "8542",
    contacts: [
      { type: "email", data: "hello@edutech.com" },
      { type: "phone", data: "+3216549870" },
    ],
    img: "https://i.pravatar.cc/150?u=company4",
    addresses: ["101 Learning Lane, Boston, MA"],
    status: "active",
  },
  {
    id: 5,
    name: "AgriGrow Ltd.",
    type: "Agriculture",
    inn: "654789321",
    oked: "0111",
    contacts: [
      { type: "email", data: "info@agrigrow.com" },
      { type: "phone", data: "+6547893210" },
    ],
    img: "https://i.pravatar.cc/150?u=company5",
    addresses: ["202 Farming Road, Des Moines, IA"],
    status: "paused",
  },
  {
    id: 1,
    name: "Tech Solutions Inc.",
    type: "IT Services",
    inn: "123456789",
    oked: "6201",
    contacts: [
      { type: "email", data: "info@techsolutions.com" },
      { type: "phone", data: "+1234567890" },
    ],
    img: "https://i.pravatar.cc/150?u=company1",
    addresses: ["123 Tech Street, Silicon Valley, CA"],
    status: "active",
  },
  {
    id: 2,
    name: "Green Energy Co.",
    type: "Renewable Energy",
    inn: "987654321",
    oked: "3511",
    contacts: [
      { type: "email", data: "contact@greenenergy.com" },
      { type: "phone", data: "+9876543210" },
    ],
    img: "https://i.pravatar.cc/150?u=company2",
    addresses: ["456 Green Avenue, Austin, TX"],
    status: "paused",
  },
  {
    id: 3,
    name: "HealthCare Plus",
    type: "Healthcare",
    inn: "456123789",
    oked: "8610",
    contacts: [
      { type: "email", data: "support@healthcareplus.com" },
      { type: "phone", data: "+4561237890" },
    ],
    img: "https://i.pravatar.cc/150?u=company3",
    addresses: ["789 Wellness Blvd, Miami, FL"],
    status: "checking",
  },
  {
    id: 4,
    name: "EduTech Innovators",
    type: "Education Technology",
    inn: "321654987",
    oked: "8542",
    contacts: [
      { type: "email", data: "hello@edutech.com" },
      { type: "phone", data: "+3216549870" },
    ],
    img: "https://i.pravatar.cc/150?u=company4",
    addresses: ["101 Learning Lane, Boston, MA"],
    status: "active",
  },
  {
    id: 5,
    name: "AgriGrow Ltd.",
    type: "Agriculture",
    inn: "654789321",
    oked: "0111",
    contacts: [
      { type: "email", data: "info@agrigrow.com" },
      { type: "phone", data: "+6547893210" },
    ],
    img: "https://i.pravatar.cc/150?u=company5",
    addresses: ["202 Farming Road, Des Moines, IA"],
    status: "paused",
  },
  {
    id: 1,
    name: "Tech Solutions Inc.",
    type: "IT Services",
    inn: "123456789",
    oked: "6201",
    contacts: [
      { type: "email", data: "info@techsolutions.com" },
      { type: "phone", data: "+1234567890" },
    ],
    img: "https://i.pravatar.cc/150?u=company1",
    addresses: ["123 Tech Street, Silicon Valley, CA"],
    status: "active",
  },
  {
    id: 2,
    name: "Green Energy Co.",
    type: "Renewable Energy",
    inn: "987654321",
    oked: "3511",
    contacts: [
      { type: "email", data: "contact@greenenergy.com" },
      { type: "phone", data: "+9876543210" },
    ],
    img: "https://i.pravatar.cc/150?u=company2",
    addresses: ["456 Green Avenue, Austin, TX"],
    status: "paused",
  },
  {
    id: 3,
    name: "HealthCare Plus",
    type: "Healthcare",
    inn: "456123789",
    oked: "8610",
    contacts: [
      { type: "email", data: "support@healthcareplus.com" },
      { type: "phone", data: "+4561237890" },
    ],
    img: "https://i.pravatar.cc/150?u=company3",
    addresses: ["789 Wellness Blvd, Miami, FL"],
    status: "checking",
  },
  {
    id: 4,
    name: "EduTech Innovators",
    type: "Education Technology",
    inn: "321654987",
    oked: "8542",
    contacts: [
      { type: "email", data: "hello@edutech.com" },
      { type: "phone", data: "+3216549870" },
    ],
    img: "https://i.pravatar.cc/150?u=company4",
    addresses: ["101 Learning Lane, Boston, MA"],
    status: "active",
  },
  {
    id: 5,
    name: "AgriGrow Ltd.",
    type: "Agriculture",
    inn: "654789321",
    oked: "0111",
    contacts: [
      { type: "email", data: "info@agrigrow.com" },
      { type: "phone", data: "+6547893210" },
    ],
    img: "https://i.pravatar.cc/150?u=company5",
    addresses: ["202 Farming Road, Des Moines, IA"],
    status: "paused",
  },
  {
    id: 1,
    name: "Tech Solutions Inc.",
    type: "IT Services",
    inn: "123456789",
    oked: "6201",
    contacts: [
      { type: "email", data: "info@techsolutions.com" },
      { type: "phone", data: "+1234567890" },
    ],
    img: "https://i.pravatar.cc/150?u=company1",
    addresses: ["123 Tech Street, Silicon Valley, CA"],
    status: "active",
  },
  {
    id: 2,
    name: "Green Energy Co.",
    type: "Renewable Energy",
    inn: "987654321",
    oked: "3511",
    contacts: [
      { type: "email", data: "contact@greenenergy.com" },
      { type: "phone", data: "+9876543210" },
    ],
    img: "https://i.pravatar.cc/150?u=company2",
    addresses: ["456 Green Avenue, Austin, TX"],
    status: "paused",
  },
  {
    id: 3,
    name: "HealthCare Plus",
    type: "Healthcare",
    inn: "456123789",
    oked: "8610",
    contacts: [
      { type: "email", data: "support@healthcareplus.com" },
      { type: "phone", data: "+4561237890" },
    ],
    img: "https://i.pravatar.cc/150?u=company3",
    addresses: ["789 Wellness Blvd, Miami, FL"],
    status: "checking",
  },
  {
    id: 4,
    name: "EduTech Innovators",
    type: "Education Technology",
    inn: "321654987",
    oked: "8542",
    contacts: [
      { type: "email", data: "hello@edutech.com" },
      { type: "phone", data: "+3216549870" },
    ],
    img: "https://i.pravatar.cc/150?u=company4",
    addresses: ["101 Learning Lane, Boston, MA"],
    status: "active",
  },
  {
    id: 5,
    name: "AgriGrow Ltd.",
    type: "Agriculture",
    inn: "654789321",
    oked: "0111",
    contacts: [
      { type: "email", data: "info@agrigrow.com" },
      { type: "phone", data: "+6547893210" },
    ],
    img: "https://i.pravatar.cc/150?u=company5",
    addresses: ["202 Farming Road, Des Moines, IA"],
    status: "paused",
  },
  {
    id: 1,
    name: "Tech Solutions Inc.",
    type: "IT Services",
    inn: "123456789",
    oked: "6201",
    contacts: [
      { type: "email", data: "info@techsolutions.com" },
      { type: "phone", data: "+1234567890" },
    ],
    img: "https://i.pravatar.cc/150?u=company1",
    addresses: ["123 Tech Street, Silicon Valley, CA"],
    status: "active",
  },
  {
    id: 2,
    name: "Green Energy Co.",
    type: "Renewable Energy",
    inn: "987654321",
    oked: "3511",
    contacts: [
      { type: "email", data: "contact@greenenergy.com" },
      { type: "phone", data: "+9876543210" },
    ],
    img: "https://i.pravatar.cc/150?u=company2",
    addresses: ["456 Green Avenue, Austin, TX"],
    status: "paused",
  },
  {
    id: 3,
    name: "HealthCare Plus",
    type: "Healthcare",
    inn: "456123789",
    oked: "8610",
    contacts: [
      { type: "email", data: "support@healthcareplus.com" },
      { type: "phone", data: "+4561237890" },
    ],
    img: "https://i.pravatar.cc/150?u=company3",
    addresses: ["789 Wellness Blvd, Miami, FL"],
    status: "checking",
  },
  {
    id: 4,
    name: "EduTech Innovators",
    type: "Education Technology",
    inn: "321654987",
    oked: "8542",
    contacts: [
      { type: "email", data: "hello@edutech.com" },
      { type: "phone", data: "+3216549870" },
    ],
    img: "https://i.pravatar.cc/150?u=company4",
    addresses: ["101 Learning Lane, Boston, MA"],
    status: "active",
  },
  {
    id: 5,
    name: "AgriGrow Ltd.",
    type: "Agriculture",
    inn: "654789321",
    oked: "0111",
    contacts: [
      { type: "email", data: "info@agrigrow.com" },
      { type: "phone", data: "+6547893210" },
    ],
    img: "https://i.pravatar.cc/150?u=company5",
    addresses: ["202 Farming Road, Des Moines, IA"],
    status: "paused",
  },
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

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "inn",
  "contacts",
  "status",
  "actions",
];

export default function CompanyTable() {
  const router = useRouter();
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
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
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof CompanyType];
      const second = b[sortDescriptor.column as keyof CompanyType];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user: CompanyType, columnKey: string) => {
      const cellValue = user[columnKey as keyof CompanyType];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.img }}
              description={user.inn}
              name={user.name + " " + user.type}
            />
          );
        case "inn":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{user.inn}</p>
            </div>
          );
        case "contacts":
          return (
            <div className="flex flex-col gap-1">
              {user.contacts.map((cont: ContactType) => (
                <div key={cont.type}>
                  {cont.type}: {cont.data}
                </div>
              ))}
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[user.status] as "success" | "danger" | "warning"
              }
              size="sm"
              variant="flat"
            >
              {user.status}
            </Chip>
          );
        case "actions":
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
          return cellValue !== undefined ? cellValue : null; // Ensure a valid return
      }
    },
    [],
  );

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
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<Icon icon="mingcute:down-fill" fontSize={18} />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
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
            Total {users.length} users
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
    visibleColumns,
    onRowsPerPageChange,
    users.length,
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
    <Table
      isHeaderSticky
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "h-full",
        base: "h-full",
      }}
      selectedKeys={selectedKeys}
      selectionMode="single"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
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
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey.toString())}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
