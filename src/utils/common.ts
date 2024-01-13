import get from "lodash/get";
import {
  AmenityItem,
  CafeItem,
  CategoryItem,
  ConditionItem,
  LocationItem,
} from "../store/types";
import {
  POST_STATUS,
  ROOM_TYPES,
  SESSION_TIMEOUT_STATUS_CODE,
  apiBaseUrl,
} from "../constants";
import axiosLib, {
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import dayjs, { FormatObject } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { intersectionBy } from "lodash";
import { getCookie, removeCookie } from "./cookies";
import { NavigateFunction } from "react-router-dom";
import { store } from "../store";
import { userLoginRequest } from "../store/slices/authSlice";

dayjs.extend(localizedFormat);

export const loadApiDefaults = (navigate: NavigateFunction) => {
  axiosLib.defaults.baseURL = apiBaseUrl;
  axiosLib.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      // console.log(config);
      const token = getCookie("accessToken");

      if (token) {
        (
          config.headers as AxiosRequestHeaders
        ).Authorization = `Bearer ${token}`;
      }

      return config;
    }
  );

  axiosLib.interceptors.response.use(
    (respose: AxiosResponse<any, any>) => {
      return respose;
    },
    (error) => {
      if (SESSION_TIMEOUT_STATUS_CODE === error.response.status) {
        removeCookie('accessToken');
        store.dispatch(userLoginRequest({}));
        navigate("auth/login");
      }
      return Promise.reject(error);
    }
  );

  axiosLib.defaults.headers.post["Content-Type"] = "application/json";
};

export const axios = axiosLib;

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
    id: get(cafeDetails, "id", ""),
    name: get(cafeDetails, "name", ""),
    logoUrl: get(cafeDetails, "logoUrl", ""),
    description: get(cafeDetails, "description", ""),
    phone_number: get(cafeDetails, "phone_number", ""),
    address: get(cafeDetails, "address", ""),
    location: get(cafeDetails, "location.id", ""),
    pincode: get(cafeDetails, "pincode", ""),
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
    id: get(employeeDetails, "id", ""),
    first_name: get(employeeDetails, "name", ""),
    last_name: get(employeeDetails, "description", ""),
    phone_number: get(employeeDetails, "phone_number", ""),
    gender: get(employeeDetails, "gender", ""),
    address: get(employeeDetails, "address", ""),
    start_date: get(employeeDetails, "start_date", ""),
    email_address: get(employeeDetails, "email_address", ""),
    cafe: getCafeById({ cafes, cafeId: get(employeeDetails, "cafe") })?.id,
  };
};

export const generateUserFormData = ({
  userDetails = {},
}: {
  userDetails?: any;
}) => {
  return {
    id: get(userDetails, "id", ""),
    first_name: get(userDetails, "name", ""),
    last_name: get(userDetails, "description", ""),
    phone_number: get(userDetails, "phone_number", ""),
    gender: get(userDetails, "gender", ""),
    address: get(userDetails, "address", ""),
    email_address: get(userDetails, "email_address", ""),
    username: get(userDetails, "username", ""),
  };
};

export const generateBranchFormData = ({
  branchDetails = {},
}: {
  branchDetails?: any;
}) => {
  return {
    id: get(branchDetails, "id", ""),
    branch_name: get(branchDetails, "branch_name", ""),
    branch_descripton: get(branchDetails, "branch_descripton", ""),
  };
};

export const generateAmenityFormData = ({
  amenityDetails = {},
}: {
  amenityDetails?: any;
}) => {
  return {
    id: get(amenityDetails, "id", ""),
    amenity_name: get(amenityDetails, "amenity_name", ""),
    amenity_descripton: get(amenityDetails, "amenity_descripton", ""),
  };
};

export const generateCategoryFormData = ({
  categoryDetails = {},
}: {
  categoryDetails?: any;
}) => {
  return {
    id: get(categoryDetails, "id", ""),
    category_name: get(categoryDetails, "category_name", ""),
    category_description: get(categoryDetails, "category_description", ""),
  };
};

export const generateConditionFormData = ({
  conditionDetails = {},
}: {
  conditionDetails?: any;
}) => {
  return {
    id: get(conditionDetails, "id", ""),
    condition_name: get(conditionDetails, "condition_name", ""),
    condition_description: get(conditionDetails, "condition_description", ""),
  };
};

export const generateDrinkFormData = ({
  drinkDetails = {},
}: {
  drinkDetails?: any;
}) => {
  return {
    id: get(drinkDetails, "id", ""),
    first_name: get(drinkDetails, "name", ""),
    last_name: get(drinkDetails, "description", ""),
    phone_number: get(drinkDetails, "phone_number", ""),
    gender: get(drinkDetails, "gender", ""),
    address: get(drinkDetails, "address", ""),
    start_date: get(drinkDetails, "start_date", ""),
    email_address: get(drinkDetails, "email_address", ""),
  };
};

export const generatePostFormData = ({
  amenities = [],
  conditions = [],
  postDetails = {},
}: {
  amenities?: any[];
  conditions?: any[];
  postDetails: any;
}) => {
  const savedAmenities = get(postDetails, "amenities", []);
  const selectedAmenities = intersectionBy(
    amenities,
    savedAmenities.map((item: any) => ({ id: item })),
    "id"
  );
  console.log(selectedAmenities, "selectedAmenities");
  const savedConditions = get(postDetails, "conditions", []);
  const selectedConditions = intersectionBy(
    conditions,
    savedConditions.map((item: any) => ({ id: item })),
    "id"
  );
  console.log(selectedConditions, "selectedConditions");
  return {
    id: get(postDetails, "id", ""),
    title: get(postDetails, "title", ""),
    description: get(postDetails, "description", ""),
    phone_number: get(postDetails, "phone_number", ""),
    address: get(postDetails, "address", ""),
    pincode: get(postDetails, "pincode", ""),
    rent: get(postDetails, "rent", ""),
    status: get(postDetails, "status", ""),
    avail_from: get(postDetails, "avail_from", ""),
    room_type: get(postDetails, "room_type", ""),
    amenities: selectedAmenities,
    category: get(postDetails, "category", ""),
    conditions: selectedConditions,
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

export const getDateDisplayFormat = (
  date: string | Date,
  options: FormatObject = {}
) => {
  return dayjs.isDayjs(date)
    ? dayjs().format(get(options, "format", ""))
    : dayjs(date).format(get(options, "format", ""));
};

export const getSessionExpiryTimeStamp = (time: string) => {
  let timestamp = 1000 * 60 * 60;
  const timeUnit = time.slice(-1);
  const timeCount = +time.slice(0, -1) || 1;
  switch(timeUnit) {
    case "h":
      timestamp = timeCount * 60 * 60 * 1000;
    case "d":
      timestamp = timeCount * 60 * 60 * 24 * 1000;
    case "m":
      timestamp = timeCount * 60 * 1000;
    default:
  }
  return timestamp;
}
