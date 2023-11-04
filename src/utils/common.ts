import get from "lodash/get";
import {
  AmenityItem,
  CafeItem,
  CategoryItem,
  ConditionItem,
  LocationItem,
} from "../store/types";
import { POST_STATUS, ROOM_TYPES, apiBaseUrl } from "../constants";
import axios from "axios";

export const loadApiDefaults = () => {
  axios.defaults.baseURL = apiBaseUrl;
};

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

export const getAmenitiesDropdownList = (amenities: AmenityItem[] = []) => {
  return amenities.map((amenityItem: AmenityItem) => {
    return {
      value: amenityItem.id || "",
      title: amenityItem.amenity_name,
      hintText: amenityItem.amenity_description,
      data: amenityItem,
    };
  });
};

export const getConditionsDropdownList = (conditions: ConditionItem[] = []) => {
  return conditions.map((conditionItem: ConditionItem) => {
    return {
      value: conditionItem.id || "",
      title: conditionItem.condition_name,
      hintText: conditionItem.condition_description,
      data: conditionItem,
    };
  });
};

export const getRoomtypesDropdownList = () => {
  return ROOM_TYPES;
};

export const getPostStatustypesDropdownList = () => {
  return POST_STATUS;
};

export const getCategoriesDropdownList = (categories: CategoryItem[] = []) => {
  return categories.map((categoryItem: CategoryItem) => {
    return {
      value: categoryItem.id || "",
      title: categoryItem.category_name,
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

export const generateUserFormData = ({
  userDetails = {},
}: {
  userDetails?: any;
}) => {
  return {
    id: get(userDetails, "id"),
    first_name: get(userDetails, "name"),
    last_name: get(userDetails, "description"),
    phone_number: get(userDetails, "phone_number"),
    gender: get(userDetails, "gender"),
    address: get(userDetails, "address"),
    email_address: get(userDetails, "email_address"),
  };
};

export const generateBranchFormData = ({
  branchDetails = {},
}: {
  branchDetails?: any;
}) => {
  return {
    id: get(branchDetails, "id"),
    branch_name: get(branchDetails, "branch_name"),
    branch_descripton: get(branchDetails, "branch_descripton"),
  };
};

export const generateAmenityFormData = ({
  amenityDetails = {},
}: {
  amenityDetails?: any;
}) => {
  return {
    id: get(amenityDetails, "id"),
    amenity_name: get(amenityDetails, "amenity_name"),
    amenity_descripton: get(amenityDetails, "amenity_descripton"),
  };
};

export const generateCategoryFormData = ({
  categoryDetails = {},
}: {
  categoryDetails?: any;
}) => {
  return {
    id: get(categoryDetails, "id"),
    category_name: get(categoryDetails, "category_name"),
    category_descripton: get(categoryDetails, "category_descripton"),
  };
};

export const generateConditionFormData = ({
  conditionDetails = {},
}: {
  conditionDetails?: any;
}) => {
  return {
    id: get(conditionDetails, "id"),
    condition_name: get(conditionDetails, "condition_name"),
    condition_descripton: get(conditionDetails, "condition_descripton"),
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

export const generatePostFormData = ({
  postDetails = {},
}: {
  postDetails?: any;
}) => {
  return {
    id: get(postDetails, "id", ""),
    title: get(postDetails, "title", ""),
    description: get(postDetails, "description", ""),
    phone_number: get(postDetails, "phone_number", ""),
    address: get(postDetails, "address", ""),
    pincode: get(postDetails, "pincode", 0),
    rent: get(postDetails, "rent", 0),
    status: get(postDetails, "status", ""),
    avail_from: get(postDetails, "avail_from", ""),
    room_type: get(postDetails, "room_type", ""),
    amenities: get(postDetails, "amenities", ""),
    categories: get(postDetails, "categories", ""),
    conditions: get(postDetails, "conditions", ""),
    user_id: get(postDetails, "user_id", ""),
  };
};

export const getCategoryById = ({
  categories = [],
  categoryId,
}: {
  categories: CategoryItem[];
  categoryId: string;
}) => {
  return categories.find((categoryItem: CategoryItem) => {
    return categoryItem.id === categoryId;
  });
};
