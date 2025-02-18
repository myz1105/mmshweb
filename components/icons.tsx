import * as React from "react";

import { IconSvgProps } from "@/types";
export const MMSHLogo: React.FC<IconSvgProps> = ({
  size = 100,
  width,
  height,
  ...props
}) => (
  <svg
    version="1.1"
    viewBox="0 0 2048 2048"
    width={size || width}
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      transform="translate(818,991)"
      d="m0 0h33l19 3 20 8 9 4 1 2v7l-5 9-9 12-9 16-6 15-4 18-1 9v45l2 23 4 27 2 31v11l-2 16-3 12h19v-14l2-8v-2l-5-2-4-4-2-9v-11l1-8 2-2 135-1h150l6 2 1 4v19l-2 8-7 6-2 1 2 12v8h22l-5-11-3-17v-42l6-26 2-11 1-14v-40l-3-22-5-18-8-16-11-13-6-7v-12l2-3 12-4 12-6 12-3 8-1h40l7 2 1 12v175l20-1v-23l2-105 3-3 11-3 27-4h15l4 13 5 28-1 3-12 2-42 3v88h34l13-10 6-3 4-1h14l9 3 11 6 5 1 66 1 6 1-7-12-9-11-7-7-13-8-14-5-11-2h-18l-9 1h-11l-1-4 5-5 14-5 15-3h22l14 3 10 4 16 10 6 5-2-11-5-19-3-6-9-4-31-6-38-6-5-2 1-4 22-1h86l-4-7-14-18-8-7-6-3-17-2-68-3-1-3 8-3 21-2 19-1h24l18 2 9 4 12 11 9 11 10 11 6 7 9 4 28 8 16 6 7 6 3 8 3 16 5 29 1 3 12 6 6 8 3 9 2 18v8l-2 12-6 12-7 6-10 3-20 4-5 4-8 16-5 5-3 2 27 3 13 3 3 3-2 6-9 3-22 3-37 3-81 4-61 2-84 2-60 1h-249l-121-2-89-2-114-4-86-4-30-2-9-3-1-1v-5l5-4 11-3 27-2-9-7-7-8-8-14-26-1-8-2-5-4-5-9-3-13v-22l3-13 6-10 8-6 4-2h3l4-33 4-20 3-6 8-5 21-7 23-7 8-6 9-10 11-14 11-12 10-6 9-2 17-1h26l34 2 8 2v4l-22 2-46 2-13 2-9 5-14 14-11 14-2 3h107v4l-7 2-53 8-12 3-8 5-4 6-4 17-1 9 11-8 14-7 9-2 10-1h11l20 2 19 5 6 3 1 6-1 1-12-1-7-1h-23l-15 4-16 8-9 7-4 2-2 4-7 8-8 13 78-1 10-7 9-4 5-1h14l10 4 8 8 1 2 16-1 20 1v-87l-43-3-12-2-2-2v-8l4-15 6-17 3-4h9l30 5 12 3 2 1 1 6 2 124h18l1-12 1-169 4-4z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1e3 480)"
      d="m0 0h48l29 3 24 4 32 8 32 11 29 13 22 12 21 13 21 16 14 12 12 11 11 11 7 8 15 16 11 14 8 10 10 15 11 19 8 16 9 20 10 26 7 23 6 26 4 26 2 21 1 36-2 31-4 28-7 32-5 16-4 1-19-5-24-4-12-1h-28l-24 3-7 1v-12l-8-15-12-21-1-3v-9l2-20-16-1-9-4-8-5-7-1-14 7-20 1-15 3-7-4-12-13-9-11-7-7-3-5v-24l2-5 4-5 1-7-7-1-2-10v-4l14-9 16-12 5-4h2v-16l3-6 6-5 8-3 26-2 15-5 10-2 12-1h14l1 7v13l12 3 27 8h2l2-10 5-1h8l8 2 9 7 10 3h12l10-1-5-17-4-10-15-1-6-3-4-5-3-10-1-6-5 2-4 5-4 13-2 1-8-7-3-6-3-11-4-7-8-7-5-2-11-1-2 1 4 9 5 5 8 5 6 3-1 10-5 8-5 2-10-4 1-4 9-3 1-2-4-4-14-9-8-8v-2l-5 1-5 4-3 1-12 1-8 12-7 10-3 6-12 2h-11l-9-2-5-4-3-8v-11l3-7 6-4h18l10 1 1-7-6-5 2-11 3-3 16-4 7-9 6-7 9-3 19 2-2-15-11 4-4-1-4-9-10-5 2-10 4-4 16-8 3-3-2-5-9-8-16-12-15-10-21-12-16-8-20-9-36-12-24-6-24-4-30-3h-31l-25 2-25 4-26 6-20 6-28 11-33 16-16 10-10 8h-2v2l13 1 15 4 14 8h17l-1-3-4-2-15-1v-9l-11-1-3-1 2-4 8-7 8-4 10-1 7 2 6 5 4 6h14l8-4 4-3 4 1v6l-4 5-6 3-10 2h-6l1 10h10l12-3 6-3 9-2 1-4v-2l-4-2-3-3 5-5 3-2h19l3 1-2 5-6 5v8l1 2 11 2v-15l6-4 11-4 5-1h15l15 5 15 8 2 2v9l8 6-1 5-4 4-13 1-4 10-11-2-21-5 2-4 18-10h2l-2-4-8-4h-12l-11 4-6 6-10 2 2 7-10 7-6 1-4-7v-2l-19 7-16 9-7 5h-2l3 12 5 5 13 3 7 1 1 5 1 14 5-1 3-3 5-10 8-5 11-2v-14l2-12 4-4 2-1 14 1 10 3 3 3v9l-1 5 6-1 16-7h3l1 18 3 3 10 7v7l-2 6-9 3 2 5 10 5 2 3v6l-5 1-12-3-6-3-3-4 5-8v-4l-7 3-6 2h-8l-5-3v-2l-9-1-3 2 1 6 8 4-2 5-13-1-20 20-10 5-10 9-11 10-3 4-1 7-5 6-13 9-10 8-3 4-2 12v10l-6-1-8-4-1-1-1-11-26-1-14 2-12 4-10 7-8 16-2 7v8l4 8 3 2 16-1 8-4 10-7 5-3h2l1 10-5 11-1 3 11 1 7 2 1 1 2 24 2 6 29 4 2-6 6-8 7-4 6-1 10 2 6 4 8 7 2 1 10-1 6-2 3-2 6 1 8 7 7 14 9 1h13l4 4 6 12 2 13 4 6 14 4 23 2 14 1 5 8v3l-8-1-23-4h-11l-6 1-2-1h-13l-27 5-17 3-2-1-5-13-4-5-8-4h-10l-7 4-5 8-4 19v45l-1 4h-8l-19-8-4-9-7-11-9-11-7-10-3-10 1-12 3-12 7-8 9-5-1-22-18-1-7-1-9-8-9-11-9-6-18-5-3-8-8-1-3 3-14-2-13-5-8-6-5-9 1-9 1-5-9-13-7-11-3-7-2-13-1-2-4-1-1 10 2 9 6 11 5 8v10l-8-1-6-4-6-9-5-10-1-4v-21l-3-5-11-6-1-3v-10l-1-1-9 25-7 26-5 25-2 15-1 14v47l3 29 6 31 7 25 1 4-9 3-18 5-5-1-8-28-6-30-3-23-2-36 1-27 3-28 6-32 8-29 7-20 12-28 12-23 13-21 12-17 11-14 11-13 11-12 14-14 8-7 13-11 16-12 16-11 13-8 23-13 29-13 28-10 25-7 29-6 23-3z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(941,926)"
      d="m0 0 5 2 4 6 3 15 1 19 3 1 3-15 3-3 24-5 20-4 12-1 5 5 2 18 1-2 2-15 2-5h13l48 9 2 6 2 10 3 1 1-20 3-14 4-6 2-2 4 1 3 4 3 13v74l2-1 1-7 2-2 10-1h12l1 3 1 22v12l-1 11-3 1h-18l-3-2-1-5-1-21-2-1v12l1 17 4 2 3 5 3 21v6l-8 3-16 5-10 6 4-1 11-5 9-2 13 1 14 7 7 7 5 9 3 7 2 20v44l-2 2h-77l-2-7-1-9-1 15-7 1-3-1-3-37-2-12-2-1h-15l-12 5-4 1h-13l-16-6h-17l-2 14-2 29-1 7-1 1h-7l-2-1-1-12-2 13-8 1-68-1-4-2 1-58 2-8 6-12 6-7 11-7 11-3h8l12 3 11 5-8-5-11-4-13-3-1-1v-15l2-13 7-8 1-28h-3v22l-2 5-2 2h-17l-4-2v-45l3-2h12l8 1 2 2 2 7 1-74 3-12 2-4z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1042,1369)"
      d="m0 0h20l14 4 13 9 8 9 7 14 2 8v18l-5 15-7 11-10 9-9 5-13 4h-20l-13-4-11-7-9-9-8-15-2-8v-20l3-10 6-11 9-10 10-7 11-4z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(604,1371)"
      d="m0 0h27l17 28 8 14 6-9 13-22 7-11h26l1 1v100l-1 1h-26l-1-52-13 22-10 16-4-1-10-16-12-20-1-1v52h-27z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(484,1371)"
      d="m0 0h27l10 17 12 20 2 4h2l10-17 14-23 1-1h26v102h-26l-1-52-13 22-8 13-4 4-5-6-13-22-7-11v51l-1 1h-26l-1-2v-99z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1157,1369)"
      d="m0 0h20l14 4 12 8 7 7 2 5-16 9-3 2-5-1-9-6-8-2-11 1-9 4-7 8-3 11 1 11 3 8 4 5 9 5 4 1h14l8-3 7-6 1-3h-24v-23h51l1 1v11l-2 14-5 12-6 8-9 8-11 5-9 2h-20l-13-4-8-4-10-9-6-8-5-10-2-10v-16l3-12 6-11 9-10 10-7 11-4z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(808,1370)"
      d="m0 0 25 1 1 1v37h28v-38h27v101l-1 1h-26v-39h-28v39h-27v-102z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(748,1369)"
      d="m0 0h18l10 3 9 6 7 7 3 5v3l-19 11-5-1-4-6-4-2h-8l-6 2 1 7 8 4 20 7 10 6 5 4 4 7 1 4v14l-4 10-5 6-10 6-9 3h-22l-10-3-11-7-6-7-3-5 1-5 16-9 5-2 6 8 8 4h11l6-2-1-7-8-4-21-7-10-7-6-7-3-7-1-9 2-9 5-9 8-7 8-4z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1297,1369)"
      d="m0 0h18l10 3 8 5 8 8 2 3v6l-10 5-7 5-5-1-4-5-6-3h-9l-4 4 1 5 10 5 18 6 12 7 6 8 2 6v14l-4 10-5 6-7 5-9 3-5 1h-20l-10-3-8-5-6-5-6-9 1-4 11-7 8-5 4 2 4 6 8 4h12l4-2 1-5-4-4-23-8-11-6-5-5-5-8-1-4v-12l3-9 4-6 7-6z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1514,1369)"
      d="m0 0h21l13 4 11 7 8 8 2 6-16 9-5 3-4-2-5-5-6-3-10-1-9 2-8 5-5 8-2 7v10l4 11 4 5 10 5h16l8-4 5-6 6 2 13 8 4 3-2 4-7 8-9 6-12 5-6 1h-19l-10-3-8-4-10-8-8-11-5-12-1-6v-19l4-13 6-10 7-8 11-7 9-4z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(963,1015)"
      d="m0 0h127l4 1v31l-1 7-2 1h-53l-7-1-16 1h-55l-1-6v-33z"
    />
    <path
      transform="translate(720,981)"
      d="m0 0h37l26 4 13 4v4l-38 3-17 4-13 7-12 12-4 5-4 2-20-1-15-1h-12l-32 2h-12l1-4 9-8 18-11 17-9 18-6 18-4z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1298,981)"
      d="m0 0h37l27 4 22 6 16 7 18 10 14 10 5 4 1 4h-13l-28-2h-14l-29 2h-8l-6-4-9-11-8-6-13-6-14-3-36-3-3-3 11-4 21-4z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1413,1189)"
      d="m0 0h32l10 1 4 4v3h54l11 1 2 5-1 14-1 5-3 1h-122l-6-2-5-17-5-11v-3z"
    />
    <path
      transform="translate(604,1189)"
      d="m0 0h35l30 1 2 2-7 18-3 11-7 2h-123l-2-6v-18l1-1 13-1h51l2-4 3-3z"
    />
    <path
      transform="translate(1348,1370)"
      d="m0 0 76 1 1 1v23l-1 2h-25v76h-26l-1-76h-23l-1-1z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(937,1371)"
      d="m0 0h26l1 1v75l34 1 1 1v24h-61l-1-1z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1008,1080)"
      d="m0 0h40l10 1 2 6 4 40v6l-5 1h-8l-10-3-5-4-7-2h-7l-8 4-5 4h-19v-15l3-28 2-9z"
    />
    <path
      transform="translate(946,1242)"
      d="m0 0h161l1 1 1 10-2 6-2 1h-154l-5-2-1-3v-9z"
    />
    <path
      transform="translate(1255,1370)"
      d="m0 0 3 2v100l-1 1h-25l-1-1v-101z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1434,1371)"
      d="m0 0h26v102h-26z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1050,1394)"
      d="m0 0 10 1 10 5 7 8 3 9v9l-3 10-8 9-9 4h-15l-10-5-7-8-3-10v-8l3-10 7-8 9-5z"
    />
    <path
      transform="translate(709,1185)"
      d="m0 0h8l5 3 4 5 5 12 2 14v10l-3 14-4 10-4 5-5 3-7-1-6-5-5-12-2-8-1-11v-9l2-15 4-9 5-5z"
    />
    <path
      transform="translate(1335,1185)"
      d="m0 0h9l8 7 5 11 2 11v19l-3 12-5 10-7 6h-6l-8-7-5-13-2-12v-21l2-10 5-9z"
    />
    <path
      transform="translate(1175,1516)"
      d="m0 0h11l8 4 6 10 2 9v9l-2 9-6 9-6 4-9 1-8-2-7-8-3-6-1-5v-13l3-10 6-8z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1283,1190)"
      d="m0 0h28l-5 23-2 11h-24l-15-1-3-5-5-16-4-10 8-1z"
    />
    <path
      transform="translate(743,1190)"
      d="m0 0h30l27 2-1 6-4 9-5 16-18 1h-22l-3-17z"
    />
    <path
      transform="translate(609,1238)"
      d="m0 0h39l4 6 2 10 7 6-2 4-1 1-7 1-41 1h-22l9-9 10-19z"
    />
    <path
      transform="translate(757,1237)"
      d="m0 0h28l12 1 3 4 5 17-1 1-24 1h-38l2-6 3-7 4-9z"
    />
    <path
      transform="translate(1289,1516)"
      d="m0 0h12l6 3 5 6 2 4v9l-9 16-11 15-5 2-4-2 8-11 4-6-9-1-6-4-5-8v-10l3-6 5-5z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(850,1516)"
      d="m0 0 6 2 13 18 11 16v2h2v-37l6-1 2 1v53l-4 1-5-4-14-20-8-12-2-2v16l-1 21h-7v-53z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(840,1200)"
      d="m0 0h6l5 6 3 12v17l-2 11-3 5-5 3-6-2-3-5-2-5-1-6v-18l2-10 3-5z"
    />
    <path
      transform="translate(1208,1200)"
      d="m0 0h6l5 6 2 5 1 6v21l-2 9-5 6h-7l-4-4-3-8-1-6v-14l2-12 3-6z"
    />
    <path
      transform="translate(941,1516)"
      d="m0 0h13l8 3 7 6 1 5-2 2-5-1-8-6-3-1h-10l-8 4-4 6-2 7 1 10 6 8 5 3 10 1 8-3 6-5 4-1 2 2-1 5-8 7-10 3-13-1-9-5-7-9-2-7v-12l4-9 5-6 8-5z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1e3 1517)"
      d="m0 0h33v5l-2 2h-23v16h23v6l-1 1h-22v16h25v6l-1 1h-31l-1-10z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(752,1516)"
      d="m0 0h12l8 4 4 6v4l-7-1-5-4-2-1h-7l-4 2-1 7 5 4 15 6 7 6 1 2v9l-4 6-6 4-4 1-13-1-8-5-3-5 1-5 3-1 5 4v2l5 2 2 1h7l6-3 1-6-3-4-16-6-6-4-3-4v-9l3-6z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path transform="translate(1206,1007)" d="m0 0 3 1v176l-5 1v-177z" />
    <path transform="translate(846,1007)" d="m0 0 5 1-1 176h-5v-176z" />
    <path
      transform="translate(1177,1523)"
      d="m0 0h7l6 4 3 5 1 6v12l-2 7-4 5-4 2h-6l-6-4-4-8v-16l3-8z"
    />
    <path
      transform="translate(1110,1516)"
      d="m0 0h10l6 3 4 5 2 5-1 9-4 6-12 14-4 3 8 1h12l2 1v7h-35v-6l9-10 13-13 3-6v-6l-1-4-10-1-6 4-1 1h-5l-1-5 8-7z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1195,628)"
      d="m0 0h6l3 7 4 11 5 6v2l4 2 3 3-1 5-4 3-3 1h-19l-2-2 1-6 4-5 3-2-2-4-10-11-1-4 5-5z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1244,1516)"
      d="m0 0 3 1v53l-4 1-3-1v-45l-12 3-1-1v-5l5-3z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1281,623)"
      d="m0 0 7 6 7 8 1 7-4 5-3 1h-19l-4-4 4-4 6-3h3l1-14z"
    />
    <path
      transform="translate(1291,1523)"
      d="m0 0h8l5 3 2 4v8l-4 5-7 2-6-2-4-4-1-8 4-6z"
    />
    <path
      transform="translate(813,1516)"
      d="m0 0h2l1 6-1 48h-7v-53z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(1495,1108)"
      d="m0 0h14l5 3 2 6v4l-3 1h-21l-2-1v-9l2-3z"
    />
    <path
      transform="translate(545,1108)"
      d="m0 0h13l3 2 1 3v8l-2 1h-22l-2-3 1-7 4-3z"
    />
    <path
      transform="translate(1180,643)"
      d="m0 0 8 1 4 4-1 5-8 7-8 3-6 1-1-4 2-8 6-7z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      transform="translate(887,674)"
      d="m0 0h10l3 2 2 5v4h-15l-10-1-2-1 1-4 7-4z"
    />
    <path
      transform="translate(882,689)"
      d="m0 0h9l-1 4-7 11-4 4-4-2-1-1v-7l4-6z"
    />
    <path transform="translate(841,592)" d="m0 0h2l-1 9-2 1h-18l1-7 7-2z" />
    <path transform="translate(1072,1101)" d="m0 0h2l2 7 2 24v14l-3-1-3-28z" />
    <path transform="translate(863,649)" d="m0 0h5l2 2v7l-5 4-6 1-4-9 1-3z" />
    <path
      transform="translate(980,1101)"
      d="m0 0 2 2-2 27-2 15h-3v-12l2-21 2-10z"
    />
    <path
      transform="translate(1e3 685)"
      d="m0 0 5 1-2 4-7 7-6 2-5-5 3-3z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path transform="translate(904,703)" d="m0 0h5l1 4-4 6-11 1-1-4 5-5z" />
    <path transform="translate(918,696)" d="m0 0 9 3 2 6-4 2-8-1-1-1v-8z" />
    <path transform="translate(835,612)" d="m0 0h6l1 5-1 2h-16l-1-4z" />
    <path transform="translate(974,1074)" d="m0 0 5 1 7 4 4 2-5 7-4-2-7-9z" />
    <path transform="translate(1337,703)" d="m0 0 3 2 4 10v3l-8 1-1-1v-12z" />
    <path transform="translate(901,689)" d="m0 0h10l1 2-2 6-5 2h-5z" />
    <path transform="translate(1077,1074)" d="m0 0 3 1-3 5-7 8-7-6 1-2 10-4z" />
    <path transform="translate(730,677)" d="m0 0 3 1-1 4-5 6h-2l1-5z" />
  </svg>
);

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const DiscordIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const TwitterIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
        fill="currentColor"
      />
    </svg>
  );
};

export const GithubIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
