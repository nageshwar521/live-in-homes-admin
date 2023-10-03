import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridWrapper } from "../../components/aggrid/AgGridWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../store";
import { useEffect, useState } from "react";
import {
  addDrinkRequest,
  deleteDrinkRequest,
  fetchDrinksListRequest,
  updateDrinkRequest,
} from "../../store/slices/drinkSlice";
import Modal from "../../components/Modal";
import DrinkDetails from "./DrinkDetails";
import ActionButtons from "../../components/aggrid/ActionButtons";
import { generateDrinkFormData } from "../../utils/common";
import { get } from "lodash";
import Row from "../../components/layout/Row";
import BaseButton from "../../components/buttons/BaseButton";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
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

const DrinkColumn: React.FC<ICellRendererParams> = ({ value, ...props }) => {
  return (
    <span>{`${get(value, "name", "")}, ${get(
      value,
      "location.name",
      ""
    )}`}</span>
  );
};

const DrinksList = () => {
  const { drinkList, status, errorResponse } = useAppSelector(
    (state: RootState) => state.drinks
  );
  const [isAddDrinkFormOpen, setIsDrinkFormOpen] = useState(false);
  const [isDeleteDrinkOpen, setIsDeleteDrinkOpen] = useState(false);
  const [rowDetails, setRowDetails] = useState<RowDetailsInterface | null>(
    null
  );
  const [modalType, setModalType] = useState<any>("create");
  const [drink, setDrink] = useState<any>("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDrinksListRequest({ drinkId: drink }));
  }, [drink]);

  const handleDetailsClose = () => {
    setIsDrinkFormOpen(false);
  };

  const colDef: ColDef[] = [
    { field: "name", headerName: "Name", sortable: true, unSortIcon: true },
    { field: "price", headerName: "Price", sortable: true, unSortIcon: true },
    {
      field: "quantity",
      headerName: "Quantity",
      sortable: true,
      unSortIcon: true,
    },
    {
      field: "units",
      headerName: "Units",
      sortable: true,
      unSortIcon: true,
    },
    {
      field: "",
      cellRenderer: ActionButtons,
    },
  ];

  const handleAddDrink = (data: any) => {
    dispatch(addDrinkRequest(data));
  };

  const handleAddDrinkClick = () => {
    setModalType("create");
    setIsDrinkFormOpen(true);
    const drinkDetails = generateDrinkFormData({});
    setRowDetails({ formData: drinkDetails });
  };

  const handleUpdateDrink = (data: any) => {
    dispatch(updateDrinkRequest(data));
  };

  const handleDeleteDrink = () => {
    console.log(rowDetails?.formData);
    setIsDeleteDrinkOpen(false);
    dispatch(deleteDrinkRequest({ id: rowDetails?.formData.id }));
  };

  const handleSubmitForm = (data: any) => {
    if (modalType === "edit") {
      handleUpdateDrink({ id: rowDetails?.formData.id, data });
    } else {
      handleAddDrink(data);
    }
  };
  // console.log(drinkList, "drinkList");

  const handleActionButtonClick = (
    action: string,
    nodeItem: any,
    colDef: any
  ) => {
    if (action === "edit") {
      setModalType("edit");
      setIsDrinkFormOpen(true);
      const drinkDetails = generateDrinkFormData({
        drinkDetails: get(nodeItem, "data"),
      });
      setRowDetails({ formData: drinkDetails, nodeItem, colDef });
    } else if (action === "delete") {
      setIsDeleteDrinkOpen(true);
      const drinkDetails = generateDrinkFormData({
        drinkDetails: get(nodeItem, "data"),
      });
      setRowDetails({ formData: drinkDetails, nodeItem, colDef });
    }
  };

  const handleDrinkChange = (e: SelectChangeEvent<any>) => {
    setDrink(e.target.value);
  };

  const handleLocationFilterClear = (option: any) => {
    setDrink(option.id);
  };

  return (
    <>
      {isAddDrinkFormOpen ? (
        <Modal
          title="Drink Details"
          isOpen={isAddDrinkFormOpen}
          onClose={handleDetailsClose}
        >
          {get(errorResponse, "message", "") ? (
            <Alert severity="error">{get(errorResponse, "message", "")}</Alert>
          ) : null}
          <DrinkDetails
            mode={modalType}
            rowDetails={rowDetails}
            onClose={() => setIsDrinkFormOpen(false)}
            onSubmit={handleSubmitForm}
          />
        </Modal>
      ) : null}
      {isDeleteDrinkOpen ? (
        <Modal
          title="Delete Drink"
          isOpen
          onClose={() => setIsDeleteDrinkOpen(false)}
        >
          <div>Do you want to delete the drink?</div>
          <Row justifyContent="flex-end">
            <BaseButton onClick={() => setIsDeleteDrinkOpen(false)}>
              Cancel
            </BaseButton>
            <BaseButton variant="contained" onClick={handleDeleteDrink}>
              Submit
            </BaseButton>
          </Row>
        </Modal>
      ) : null}
      <Box display="flex" flexDirection="row" marginBottom="20px">
        <Box />
        <FlexGrow />
        <Box>
          <BaseButton variant="contained" onClick={handleAddDrinkClick}>
            Add Drink
          </BaseButton>
        </Box>
      </Box>
      <Box>
        <AgGridWrapper
          domLayout="autoHeight"
          rowData={drinkList}
          columnDefs={colDef}
          context={{
            onActionButtonClick: handleActionButtonClick,
          }}
        />
      </Box>
    </>
  );
};

export default DrinksList;
