import get from "lodash/get";
import { CafeItem, CategoryItem, LocationItem } from "../store/types";

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

export const getCategoriesDropdownList = (categories: CategoryItem[] = []) => {
  return categories.map((categoryItem: CategoryItem) => {
    return {
      value: categoryItem?.id || "",
      title: `${categoryItem.name}, ${get(categoryItem, "location.name")}`,
      data: categoryItem,
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

export const generateBranchFormData = ({
  branchDetails = {},
}: {
  branchDetails?: any;
}) => {
  return {
    id: get(branchDetails, "id"),
    first_name: get(branchDetails, "name"),
    last_name: get(branchDetails, "description"),
    phone_number: get(branchDetails, "phone_number"),
    gender: get(branchDetails, "gender"),
    address: get(branchDetails, "address"),
    start_date: get(branchDetails, "start_date"),
    email_address: get(branchDetails, "email_address"),
  };
};

export const generateDrinkFormData = ({
  drinkDetails = {},
}: {
  drinkDetails?: any;
}) => {
  return {
    id: get(drinkDetails, "id"),
    first_name: get(drinkDetails, "name"),
    last_name: get(drinkDetails, "description"),
    phone_number: get(drinkDetails, "phone_number"),
    gender: get(drinkDetails, "gender"),
    address: get(drinkDetails, "address"),
    start_date: get(drinkDetails, "start_date"),
    email_address: get(drinkDetails, "email_address"),
  };
};
