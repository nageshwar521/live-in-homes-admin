import get from "lodash/get";
import { CafeItem, LocationItem } from "../store/types";

export const getLocationsDropdownList = (locations: LocationItem[] = []) => {
  return locations.map((locationItem: LocationItem) => {
    return {
      value: locationItem.id,
      title: locationItem.name,
      data: locationItem,
    };
  });
};

export const getCafesDropdownList = (cafes: CafeItem[] = []) => {
  return cafes.map((cafeItem: CafeItem) => {
    return {
      value: cafeItem?.id || "",
      title: `${cafeItem.name}, ${get(cafeItem, "location.name")}`,
      data: cafeItem,
    };
  });
};

export const getLocationById = ({
  locations = [],
  locationId,
}: {
  locations: LocationItem[];
  locationId: string;
}) => {
  return locations.find((locationItem: LocationItem) => {
    return locationItem.id === locationId;
  });
};

export const getCafeById = ({
  cafes = [],
  cafeId,
}: {
  cafes: CafeItem[];
  cafeId: string;
}) => {
  return cafes.find((cafeItem: CafeItem) => {
    return cafeItem.id === cafeId;
  });
};

export const generateCafeFormData = ({
  cafeDetails = {},
  locations = [],
}: {
  cafeDetails?: any;
  locations?: LocationItem[];
}) => {
  return {
    id: get(cafeDetails, "id"),
    name: get(cafeDetails, "name"),
    logoUrl: get(cafeDetails, "logoUrl"),
    description: get(cafeDetails, "description"),
    phone_number: get(cafeDetails, "phone_number"),
    address: get(cafeDetails, "address"),
    location: get(cafeDetails, "location.id"),
    pincode: get(cafeDetails, "pincode"),
  };
};

export const generateEmployeeFormData = ({
  employeeDetails = {},
  cafes = [],
}: {
  employeeDetails?: any;
  cafes?: CafeItem[];
}) => {
  return {
    id: get(employeeDetails, "id"),
    first_name: get(employeeDetails, "name"),
    last_name: get(employeeDetails, "description"),
    phone_number: get(employeeDetails, "phone_number"),
    gender: get(employeeDetails, "gender"),
    address: get(employeeDetails, "address"),
    start_date: get(employeeDetails, "start_date"),
    email_address: get(employeeDetails, "email_address"),
    cafe: getCafeById({ cafes, cafeId: get(employeeDetails, "cafe") })?.id,
  };
};
