import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridWrapper } from "../../components/aggrid/AgGridWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../store";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addEmployeeRequest,
  deleteEmployeeRequest,
  fetchEmployeeListRequest,
  updateEmployeeRequest,
} from "../../store/slices/employeeSlice";
import Modal from "../../components/Modal";
import EmployeeDetails from "./EmployeeDetails";
import ActionButtons from "../../components/aggrid/ActionButtons";
import {
  generateEmployeeFormData,
  getCafesDropdownList,
} from "../../utils/common";
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

dayjs.extend(duration);

export interface RowDetailsInterface {
  nodeItem?: any;
  colDef?: any;
  formData: any;
}

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

const EmployeeList = () => {
  const { employeeList, status, errorResponse } = useAppSelector(
    (state: RootState) => state.employees
  );
  const [isAddEmployeeFormOpen, setIsEmployeeFormOpen] = useState(false);
  const [isDeleteEmployeeOpen, setIsDeleteEmployeeOpen] = useState(false);
  const [rowDetails, setRowDetails] = useState<RowDetailsInterface | null>(
    null
  );
  const [modalType, setModalType] = useState<any>("create");
  const { cafeList, status: cafeApiStatus } = useAppSelector(
    (state) => state.cafes
  );
  const [cafe, setCafe] = useState<any>("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployeeListRequest({ cafeId: cafe }));
  }, [cafe]);

  useEffect(() => {
    dispatch(fetchCafeListRequest({}));
  }, []);

  const handleDetailsClose = () => {
    setIsEmployeeFormOpen(false);
  };

  const colDef: ColDef[] = [
    { field: "employeeId", headerName: "Employee Id" },
    { field: "name", headerName: "Name", sortable: true, unSortIcon: true },
    { field: "email_address", headerName: "Email Address" },
    { field: "phone_number", headerName: "Phone Number" },
    { field: "cafe", headerName: "Cafe", cellRenderer: CafeColumn },
    {
      field: "",
      cellRenderer: ActionButtons,
    },
  ];

  const handleAddEmployee = (data: any) => {
    dispatch(addEmployeeRequest(data));
  };

  const handleAddEmployeeClick = () => {
    setModalType("create");
    setIsEmployeeFormOpen(true);
    const employeeDetails = generateEmployeeFormData({});
    setRowDetails({ formData: employeeDetails });
  };

  const handleUpdateEmployee = (data: any) => {
    dispatch(updateEmployeeRequest(data));
  };

  const handleDeleteEmployee = () => {
    console.log(rowDetails?.formData);
    setIsDeleteEmployeeOpen(false);
    dispatch(deleteEmployeeRequest({ id: rowDetails?.formData.id }));
  };

  const handleSubmitForm = (data: any) => {
    if (modalType === "edit") {
      handleUpdateEmployee({ id: rowDetails?.formData.id, data });
    } else {
      handleAddEmployee(data);
    }
  };
  // console.log(employeeList, "employeeList");

  const handleActionButtonClick = (
    action: string,
    nodeItem: any,
    colDef: any
  ) => {
    if (action === "edit") {
      setModalType("edit");
      setIsEmployeeFormOpen(true);
      const employeeDetails = generateEmployeeFormData({
        employeeDetails: get(nodeItem, "data"),
        cafes: cafeList,
      });
      setRowDetails({ formData: employeeDetails, nodeItem, colDef });
    } else if (action === "delete") {
      setIsDeleteEmployeeOpen(true);
      const employeeDetails = generateEmployeeFormData({
        employeeDetails: get(nodeItem, "data"),
        cafes: cafeList,
      });
      setRowDetails({ formData: employeeDetails, nodeItem, colDef });
    }
  };

  const handleCafeChange = (e: SelectChangeEvent<any>) => {
    setCafe(e.target.value);
  };

  const handleLocationFilterClear = (option: any) => {
    setCafe(option.id);
  };

  const locationOptions = getCafesDropdownList(cafeList);

  return (
    <>
      {isAddEmployeeFormOpen ? (
        <Modal
          title="Employee Details"
          isOpen={isAddEmployeeFormOpen}
          onClose={handleDetailsClose}
        >
          {get(errorResponse, "message", "") ? (
            <Alert severity="error">{get(errorResponse, "message", "")}</Alert>
          ) : null}
          <EmployeeDetails
            mode={modalType}
            rowDetails={rowDetails}
            onClose={() => setIsEmployeeFormOpen(false)}
            onSubmit={handleSubmitForm}
          />
        </Modal>
      ) : null}
      {isDeleteEmployeeOpen ? (
        <Modal
          title="Delete Employee"
          isOpen
          onClose={() => setIsDeleteEmployeeOpen(false)}
        >
          <div>Do you want to delete the employee?</div>
          <Row justifyContent="flex-end">
            <BaseButton onClick={() => setIsDeleteEmployeeOpen(false)}>
              Cancel
            </BaseButton>
            <BaseButton variant="contained" onClick={handleDeleteEmployee}>
              Submit
            </BaseButton>
          </Row>
        </Modal>
      ) : null}
      <Box display="flex" flexDirection="row" marginBottom="20px">
        <Box>
          <FilterDropdown
            label="Filter:"
            value={cafe}
            onChange={handleCafeChange}
            options={locationOptions}
            onClearFilter={handleLocationFilterClear}
          />
        </Box>
        <FlexGrow />
        <Box>
          <BaseButton variant="contained" onClick={handleAddEmployeeClick}>
            Add Employee
          </BaseButton>
        </Box>
      </Box>
      <Box>
        <AgGridWrapper
          domLayout="autoHeight"
          rowData={employeeList}
          columnDefs={colDef}
          context={{
            onActionButtonClick: handleActionButtonClick,
          }}
        />
      </Box>
    </>
  );
};

export default EmployeeList;
