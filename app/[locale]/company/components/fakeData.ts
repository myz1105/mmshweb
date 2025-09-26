import { Company } from "../types";

export const companies: Company[] = [
  {
    Id: "1",
    Name: "Alpha Logistics",
    Type: { Id: 1, Shortname: "LLC", Type: "Limited Liability Company" },
    Inn: "123456789",
    Oked: "00123",
    Img: { Name: "alpha.png" },
    Addresses: [
      {
        Id: 1,
        Sattlement: "Tashkent, Uzbekistan",
        Location: "Main St 1",
        IndexCode: 100100,
        Latitude: 41.2995,
        Longitude: 69.2401,
      },
    ],
    Contacts: [
      { Id: 1, Type: "Phone", Data: "+998901234567" },
      { Id: 2, Type: "Web", Data: "alphalogistics.com" },
    ],
    Banks: [
      {
        Name: "National Bank",
        Address: "Tashkent",
        MFO: "00001",
        AccountNumbers: [
          { AccountNumber: "2020202020202020", AccountType: "UZS" },
        ],
      },
    ],
    Documents: [
      {
        Id: 1,
        Name: "License.pdf",
        Filename: "license_alpha.pdf",
        Size: 10240,
        Date: "2025-01-01T10:00:00.000Z",
      },
    ],
    Owner: "owner1",
    State: 0,
  },
  {
    Id: "2",
    Name: "Beta Transport",
    Type: { Id: 2, Shortname: "JSC", Type: "Joint Stock Company" },
    Inn: "234567890",
    Oked: "00234",
    Img: { Name: "beta.png" },
    Addresses: [
      {
        Id: 2,
        Sattlement: "Samarkand, Uzbekistan",
        Location: "Samarkand Ave 2",
        IndexCode: 140100,
        Latitude: 39.6542,
        Longitude: 66.9597,
      },
    ],
    Contacts: [
      { Id: 1, Type: "Phone", Data: "+998902345678" },
      { Id: 2, Type: "Web", Data: "betatransport.com" },
    ],
    Banks: [
      {
        Name: "Samarkand Bank",
        Address: "Samarkand",
        MFO: "00002",
        AccountNumbers: [
          { AccountNumber: "3030303030303030", AccountType: "USD" },
        ],
      },
    ],
    Documents: [
      {
        Id: 2,
        Name: "Registration.pdf",
        Filename: "reg_beta.pdf",
        Size: 20480,
        Date: "2025-02-01T11:00:00.000Z",
      },
    ],
    Owner: "owner2",
    State: 1,
  },
  {
    Id: "3",
    Name: "Gamma Freight",
    Type: { Id: 3, Shortname: "MCHJ", Type: "Masuliyati Cheklangan Jamiyat" },
    Inn: "345678901",
    Oked: "00345",
    Img: { Name: "gamma.png" },
    Addresses: [
      {
        Id: 3,
        Sattlement: "Bukhara, Uzbekistan",
        Location: "Bukhara Rd 3",
        IndexCode: 200100,
        Latitude: 39.7747,
        Longitude: 64.4286,
      },
    ],
    Contacts: [
      { Id: 1, Type: "Phone", Data: "+998903456789" },
      { Id: 2, Type: "Web", Data: "gammafreight.com" },
    ],
    Banks: [
      {
        Name: "Bukhara Bank",
        Address: "Bukhara",
        MFO: "00003",
        AccountNumbers: [
          { AccountNumber: "4040404040404040", AccountType: "EUR" },
        ],
      },
    ],
    Documents: [
      {
        Id: 3,
        Name: "Insurance.pdf",
        Filename: "insurance_gamma.pdf",
        Size: 30720,
        Date: "2025-03-01T12:00:00.000Z",
      },
    ],
    Owner: "owner3",
    State: 2,
  },
  {
    Id: "4",
    Name: "Delta Movers",
    Type: { Id: 4, Shortname: "LLP", Type: "Limited Liability Partnership" },
    Inn: "456789012",
    Oked: "00456",
    Img: { Name: "delta.png" },
    Addresses: [
      {
        Id: 4,
        Sattlement: "Andijan, Uzbekistan",
        Location: "Andijan St 4",
        IndexCode: 170100,
        Latitude: 40.7821,
        Longitude: 72.3442,
      },
    ],
    Contacts: [
      { Id: 1, Type: "Phone", Data: "+998904567890" },
      { Id: 2, Type: "Web", Data: "deltamovers.com" },
    ],
    Banks: [
      {
        Name: "Andijan Bank",
        Address: "Andijan",
        MFO: "00004",
        AccountNumbers: [
          { AccountNumber: "5050505050505050", AccountType: "RUB" },
        ],
      },
    ],
    Documents: [
      {
        Id: 4,
        Name: "Permit.pdf",
        Filename: "permit_delta.pdf",
        Size: 40960,
        Date: "2025-04-01T13:00:00.000Z",
      },
    ],
    Owner: "owner4",
    State: 0,
  },
  {
    Id: "5",
    Name: "Epsilon Cargo",
    Type: { Id: 5, Shortname: "JSC", Type: "Joint Stock Company" },
    Inn: "567890123",
    Oked: "00567",
    Img: { Name: "epsilon.png" },
    Addresses: [
      {
        Id: 5,
        Sattlement: "Namangan, Uzbekistan",
        Location: "Namangan Blvd 5",
        IndexCode: 160100,
        Latitude: 41.0056,
        Longitude: 71.6436,
      },
    ],
    Contacts: [
      { Id: 1, Type: "Phone", Data: "+998905678901" },
      { Id: 2, Type: "Web", Data: "epsiloncargo.com" },
    ],
    Banks: [
      {
        Name: "Namangan Bank",
        Address: "Namangan",
        MFO: "00005",
        AccountNumbers: [
          { AccountNumber: "6060606060606060", AccountType: "USD" },
        ],
      },
    ],
    Documents: [
      {
        Id: 5,
        Name: "Certificate.pdf",
        Filename: "certificate_epsilon.pdf",
        Size: 51200,
        Date: "2025-05-01T14:00:00.000Z",
      },
    ],
    Owner: "owner5",
    State: 1,
  },
  {
    Id: "6",
    Name: "Zeta Express",
    Type: { Id: 6, Shortname: "LLC", Type: "Limited Liability Company" },
    Inn: "678901234",
    Oked: "00678",
    Img: { Name: "zeta.png" },
    Addresses: [
      {
        Id: 6,
        Sattlement: "Fergana, Uzbekistan",
        Location: "Fergana Ave 6",
        IndexCode: 150100,
        Latitude: 40.3894,
        Longitude: 71.7843,
      },
    ],
    Contacts: [
      { Id: 1, Type: "Phone", Data: "+998906789012" },
      { Id: 2, Type: "Web", Data: "zetaexpress.com" },
    ],
    Banks: [
      {
        Name: "Fergana Bank",
        Address: "Fergana",
        MFO: "00006",
        AccountNumbers: [
          { AccountNumber: "7070707070707070", AccountType: "UZS" },
        ],
      },
    ],
    Documents: [
      {
        Id: 6,
        Name: "Agreement.pdf",
        Filename: "agreement_zeta.pdf",
        Size: 61440,
        Date: "2025-06-01T15:00:00.000Z",
      },
    ],
    Owner: "owner6",
    State: 2,
  },
  {
    Id: "7",
    Name: "Eta Shipping",
    Type: { Id: 7, Shortname: "MCHJ", Type: "Masuliyati Cheklangan Jamiyat" },
    Inn: "789012345",
    Oked: "00789",
    Img: { Name: "eta.png" },
    Addresses: [
      {
        Id: 7,
        Sattlement: "Nukus, Uzbekistan",
        Location: "Nukus St 7",
        IndexCode: 230100,
        Latitude: 42.4531,
        Longitude: 59.61,
      },
    ],
    Contacts: [
      { Id: 1, Type: "Phone", Data: "+998907890123" },
      { Id: 2, Type: "Web", Data: "etashipping.com" },
    ],
    Banks: [
      {
        Name: "Nukus Bank",
        Address: "Nukus",
        MFO: "00007",
        AccountNumbers: [
          { AccountNumber: "8080808080808080", AccountType: "EUR" },
        ],
      },
    ],
    Documents: [
      {
        Id: 7,
        Name: "Contract.pdf",
        Filename: "contract_eta.pdf",
        Size: 71680,
        Date: "2025-07-01T16:00:00.000Z",
      },
    ],
    Owner: "owner7",
    State: 0,
  },
  {
    Id: "8",
    Name: "Theta Logistics",
    Type: { Id: 8, Shortname: "LLP", Type: "Limited Liability Partnership" },
    Inn: "890123456",
    Oked: "00890",
    Img: { Name: "theta.png" },
    Addresses: [
      {
        Id: 8,
        Sattlement: "Jizzakh, Uzbekistan",
        Location: "Jizzakh Rd 8",
        IndexCode: 130100,
        Latitude: 40.1158,
        Longitude: 67.8422,
      },
    ],
    Contacts: [
      { Id: 1, Type: "Phone", Data: "+998908901234" },
      { Id: 2, Type: "Web", Data: "thetalogistics.com" },
    ],
    Banks: [
      {
        Name: "Jizzakh Bank",
        Address: "Jizzakh",
        MFO: "00008",
        AccountNumbers: [
          { AccountNumber: "9090909090909090", AccountType: "RUB" },
        ],
      },
    ],
    Documents: [
      {
        Id: 8,
        Name: "Policy.pdf",
        Filename: "policy_theta.pdf",
        Size: 81920,
        Date: "2025-08-01T17:00:00.000Z",
      },
    ],
    Owner: "owner8",
    State: 1,
  },
  {
    Id: "9",
    Name: "Iota Transport",
    Type: { Id: 9, Shortname: "JSC", Type: "Joint Stock Company" },
    Inn: "901234567",
    Oked: "00901",
    Img: { Name: "iota.png" },
    Addresses: [
      {
        Id: 9,
        Sattlement: "Kokand, Uzbekistan",
        Location: "Kokand Ave 9",
        IndexCode: 120100,
        Latitude: 40.5286,
        Longitude: 70.9425,
      },
    ],
    Contacts: [
      { Id: 1, Type: "Phone", Data: "+998909012345" },
      { Id: 2, Type: "Web", Data: "iotatransport.com" },
    ],
    Banks: [
      {
        Name: "Kokand Bank",
        Address: "Kokand",
        MFO: "00009",
        AccountNumbers: [
          { AccountNumber: "1010101010101010", AccountType: "USD" },
        ],
      },
    ],
    Documents: [
      {
        Id: 9,
        Name: "License.pdf",
        Filename: "license_iota.pdf",
        Size: 92160,
        Date: "2025-09-01T18:00:00.000Z",
      },
    ],
    Owner: "owner9",
    State: 2,
  },
  {
    Id: "10",
    Name: "Kappa Freight",
    Type: { Id: 10, Shortname: "LLC", Type: "Limited Liability Company" },
    Inn: "012345678",
    Oked: "01012",
    Img: { Name: "kappa.png" },
    Addresses: [
      {
        Id: 10,
        Sattlement: "Termez, Uzbekistan",
        Location: "Termez St 10",
        IndexCode: 190100,
        Latitude: 37.2242,
        Longitude: 67.278,
      },
    ],
    Contacts: [
      { Id: 1, Type: "Phone", Data: "+998910123456" },
      { Id: 2, Type: "Web", Data: "kappafreight.com" },
    ],
    Banks: [
      {
        Name: "Termez Bank",
        Address: "Termez",
        MFO: "00010",
        AccountNumbers: [
          { AccountNumber: "1111111111111111", AccountType: "UZS" },
        ],
      },
    ],
    Documents: [
      {
        Id: 10,
        Name: "Registration.pdf",
        Filename: "reg_kappa.pdf",
        Size: 102400,
        Date: "2025-10-01T19:00:00.000Z",
      },
    ],
    Owner: "owner10",
    State: 0,
  },
  // ... Add more companies as needed ...
];

export interface CompanyStatus {
  Id: string;
  status: number;
}

export const statusLabels: Record<number, string> = {
  0: "Requested",
  1: "Processing",
  2: "Accepted",
  3: "Denied",
};
export const statusColorMap: Record<number, string> = {
  0: "default",
  1: "warning",
  2: "success",
  3: "danger",
};
export const mycompanies: CompanyStatus[] = [
  {
    Id: "2",
    status: 1,
  },
  {
    Id: "4",
    status: 1,
  },
  {
    Id: "5",
    status: 2,
  },
  {
    Id: "6",
    status: 0,
  },
  {
    Id: "7",
    status: 1,
  },
  {
    Id: "8",
    status: 0,
  },
  {
    Id: "9",
    status: 1,
  },
  {
    Id: "10",
    status: 0,
  },
];
