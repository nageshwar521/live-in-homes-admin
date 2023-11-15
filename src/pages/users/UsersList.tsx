import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridWrapper } from "../../components/aggrid/AgGridWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addUserRequest,
  deleteUserRequest,
  fetchUserListRequest,
  updateUserRequest,
} from "../../store/slices/userSlice";
import Modal from "../../components/Modal";
import UserDetails from "./UserDetails";
import ActionButtons from "../../components/aggrid/ActionButtons";
import { generateUserFormData, getCafesDropdownList } from "../../utils/common";
import { get } from "lodash";
import Row from "../../components/layout/Row";
import BaseButton from "../../components/buttons/BaseButton";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Alert from "@mui/material/Alert";
import FilterDropdown from "../../components/form/FilterDropdown";
import Box from "@mui/material/Box";
import { fetchCafeListRequest } from "../../store/slices/cafeSlice";
import { SelectChangeEvent } from "@mui/material";
import FlexGrow from "../../components/FlexGrow";
import { RowDetailsInterface } from "./types";

dayjs.extend(duration);

const getDurationFormat = (duration: duration.Duration) => {
  const years = get(duration, "years", "");
  const months = get(duration, "months", "");
  const days = get(duration, "days", "");
  let message = "";
  if (years && duration.years()) {
    message = `${duration.years()} years`;
  } else if (months && duration.months()) {
    message = `${duration.months()} months`;
  } else if (days && duration.days()) {
    message = `${duration.days()} days`;
  }
  return message;
};

function monthToComparableNumber(date: string) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }
  const yearNumber = Number.parseInt(date.substring(6, 10));
  const monthNumber = Number.parseInt(date.substring(3, 5));
  const dayNumber = Number.parseInt(date.substring(0, 2));
  return yearNumber * 10000 + monthNumber * 100 + dayNumber;
}

function dateComparator(date1: string, date2: string) {
  const date1Number = monthToComparableNumber(
    dayjs(date1).format("DD-MM-YYYY")
  );
  const date2Number = monthToComparableNumber(
    dayjs(date2).format("DD-MM-YYYY")
  );
  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }
  return date1Number - date2Number;
}

const StartDateColumn: React.FC<ICellRendererParams> = ({ value }) => {
  // console.log(props);
  const startDate = dayjs(value);
  const todayDate = dayjs(new Date());
  const duration = dayjs.duration(todayDate.diff(startDate));
  return <span>{getDurationFormat(duration)}</span>;
};

const CafeColumn: React.FC<ICellRendererParams> = ({ value, ...props }) => {
  return (
    <span>{`${get(value, "name", "")}, ${get(
      value,
      "location.name",
      ""
    )}`}</span>
  );
};

const UserList = () => {
  const { userList, status, errorResponse } = useAppSelector(
    (state: RootState) => state.users
  );
  const [isAddUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [rowDetails, setRowDetails] = useState<RowDetailsInterface | null>(
    null
  );
  const [modalType, setModalType] = useState<any>("create");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserListRequest({}));
  }, []);

  useEffect(() => {
    dispatch(fetchCafeListRequest({}));
  }, []);

  const handleDetailsClose = () => {
    setIsUserFormOpen(false);
  };

  const colDef: ColDef[] = [
    { field: "username", headerName: "Username" },
    { field: "name", headerName: "Name", sortable: true, unSortIcon: true },
    { field: "email_address", headerName: "Email Address" },
    { field: "phone_number", headerName: "Phone Number" },
    {
      field: "",
      cellRenderer: ActionButtons,
    },
  ];

  const handleAddUser = (data: any) => {
    dispatch(addUserRequest(data));
  };

  const handleAddUserClick = () => {
    setModalType("create");
    setIsUserFormOpen(true);
    const userDetails = generateUserFormData({});
    setRowDetails({ formData: userDetails });
  };

  const handleUpdateUser = (data: any) => {
    dispatch(updateUserRequest(data));
  };

  const handleDeleteUser = () => {
    console.log(rowDetails?.formData);
    setIsDeleteUserOpen(false);
    dispatch(deleteUserRequest({ id: rowDetails?.formData.id }));
  };

  const handleSubmitForm = (data: any) => {
    if (modalType === "edit") {
      handleUpdateUser({ id: rowDetails?.formData.id, data });
    } else {
      handleAddUser(data);
    }
  };
  // console.log(userList, "userList");

  const handleActionButtonClick = (
    action: string,
    nodeItem: any,
    colDef: any
  ) => {
    if (action === "edit") {
      setModalType("edit");
      setIsUserFormOpen(true);
      const userDetails = generateUserFormData({
        userDetails: get(nodeItem, "data"),
      });
      setRowDetails({ formData: userDetails, nodeItem, colDef, isEdit: true });
    } else if (action === "delete") {
      setIsDeleteUserOpen(true);
      const userDetails = generateUserFormData({
        userDetails: get(nodeItem, "data"),
      });
      setRowDetails({ formData: userDetails, nodeItem, colDef });
    }
  };

  return (
    <>
      {isAddUserFormOpen ? (
        <Modal
          title="User Details"
          isOpen={isAddUserFormOpen}
          onClose={handleDetailsClose}
        >
          {get(errorResponse, "message", "") ? (
            <Alert severity="error">{get(errorResponse, "message", "")}</Alert>
          ) : null}
          <UserDetails
            mode={modalType}
            rowDetails={rowDetails}
            onClose={() => setIsUserFormOpen(false)}
            onSubmit={handleSubmitForm}
          />
        </Modal>
      ) : null}
      {isDeleteUserOpen ? (
        <Modal
          title="Delete User"
          isOpen
          onClose={() => setIsDeleteUserOpen(false)}
        >
          <div>Do you want to delete the user?</div>
          <Row justifyContent="flex-end">
            <BaseButton onClick={() => setIsDeleteUserOpen(false)}>
              Cancel
            </BaseButton>
            <BaseButton variant="contained" onClick={handleDeleteUser}>
              Submit
            </BaseButton>
          </Row>
        </Modal>
      ) : null}
      <Box display="flex" flexDirection="row" marginBottom="20px">
        <FlexGrow />
        <Box>
          <BaseButton variant="contained" onClick={handleAddUserClick}>
            Add User
          </BaseButton>
        </Box>
      </Box>
      <Box>
        <AgGridWrapper
          domLayout="autoHeight"
          rowData={userList}
          columnDefs={colDef}
          context={{
            onActionButtonClick: handleActionButtonClick,
          }}
        />
      </Box>
    </>
  );
};

export default UserList;
