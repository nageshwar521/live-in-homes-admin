const nodeEnv = import.meta.env.MODE;

console.log(nodeEnv, 'nodeEnvs')

export const DRAWER_WIDTH = 240;
export const SESSION_TIMEOUT_STATUS_CODE = 401;
export const apiBaseUrl = nodeEnv === 'development' ? 'http://localhost:4000/api' : 'https://alnlabs.com/api';
export const DATE_DISPLAY_FORMAT = "dddd, MMMM D, YYYY";
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
