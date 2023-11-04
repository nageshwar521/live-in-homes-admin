export const DRAWER_WIDTH = 240;

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const DATE_DISPLAY_FORMAT = "DD-MM-YYYY";

export const DATE_API_FORMAT = "YYYY-MM-DD";

export const units = {
  litre: {
    shortName: "l",
  },
  milliLitre: {
    shortName: "ml",
  },
};

export const ROOM_TYPES = [
  { value: "hdb", title: "HDB" },
  { value: "condo", title: "Condo" },
  { value: "landed_house", title: "Landed House" },
];

export const POST_STATUS = [
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
];
