import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridWrapper } from "../../components/aggrid/AgGridWrapper";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import React, { useEffect, useState } from "react";
import {
  addCafeRequest,
  deleteCafeRequest,
  fetchCafeListRequest,
  updateCafeRequest,
} from "../../store/slices/cafeSlice";
import Modal from "../../components/Modal";
import CafeDetails from "./CafeDetails";
import ActionButtons from "../../components/aggrid/ActionButtons";
import {
  generateCafeFormData,
  getLocationsDropdownList,
} from "../../utils/common";
import { get } from "lodash";
import BaseButton from "../../components/buttons/BaseButton";
import Alert from "@mui/material/Alert";
import { Box, CardMedia, SelectChangeEvent } from "@mui/material";
import { fetchLocationListRequest } from "../../store/slices/locationSlice";
import FilterDropdown from "../../components/form/FilterDropdown";
import FlexGrow from "../../components/FlexGrow";

export interface RowDetailsInterface {
  nodeItem?: any;
  colDef?: any;
  formData: any;
}

const LocationColumn: React.FC<ICellRendererParams> = ({ value, ...props }) => {
  return <span>{get(value, "name", "")}</span>;
};

const LgoColumn: React.FC<ICellRendererParams> = ({ value, ...props }) => {
  return (
    <CardMedia
      component="img"
      sx={{ width: 151, objectFit: "contain" }}
      image={value}
    />
  );
};

const CafeList = () => {
  const {
    cafeList,
    errorResponse,
    status: addCafeStatus,
  } = useAppSelector((state: RootState) => state.cafes);
  const [isAddCafeFormOpen, setIsCafeFormOpen] = useState(false);
  const [isDeleteCafeOpen, setIsDeleteCafeOpen] = useState(false);
  const [rowDetails, setRowDetails] = useState<RowDetailsInterface | null>(
    null
  );
  const [cafeLocation, setCafeLocation] = useState("");
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [modalType, setModalType] = useState<any>("create");
  const { locationList, status: locationApiStatus } = useAppSelector(
    (state) => state.locations
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCafeListRequest({ locationId: cafeLocation }));
  }, [cafeLocation]);

  const handleGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const handleDetailsClose = () => {
    setIsCafeFormOpen(false);
  };

  useEffect(() => {
    dispatch(fetchLocationListRequest());
  }, []);

  const colDef: ColDef[] = [
    { field: "logoUrl", headerName: "Logo", cellRenderer: LgoColumn },
    { field: "name", headerName: "Name", sortable: true, unSortIcon: true },
    { field: "phone_number", headerName: "Phone Number" },
    { field: "address", headerName: "Address" },
    { field: "location", headerName: "Location", cellRenderer: LocationColumn },
    {
      field: "",
      cellRenderer: ActionButtons,
    },
  ];

  const handleAddCafe = (data: any) => {
    dispatch(addCafeRequest(data));
  };

  const handleAddCafeClick = () => {
    setModalType("create");
    setIsCafeFormOpen(true);
    const cafeDetails = generateCafeFormData({});
    setRowDetails({ formData: cafeDetails });
  };

  const handleUpdateCafe = (data: any) => {
    console.log("handleUpdateCafe");
    dispatch(updateCafeRequest(data));
  };

  const handleDeleteCafe = () => {
    console.log(rowDetails?.formData);
    setIsDeleteCafeOpen(false);
    dispatch(deleteCafeRequest({ id: rowDetails?.formData.id }));
  };

  const handleSubmitForm = (data: any) => {
    if (modalType === "edit") {
      handleUpdateCafe({ id: rowDetails?.formData.id, data });
    } else {
      handleAddCafe(data);
    }
  };
  // console.log(cafeList, "cafeList");

  const handleActionButtonClick = (
    action: string,
    nodeItem: any,
    colDef: any
  ) => {
    if (action === "edit") {
      setModalType("edit");
      setIsCafeFormOpen(true);
      const cafeDetails = generateCafeFormData({
        cafeDetails: get(nodeItem, "data"),
        locations: locationList,
      });
      setRowDetails({ formData: cafeDetails, nodeItem, colDef });
    } else if (action === "delete") {
      setModalType("delete");
      setIsDeleteCafeOpen(true);
      const cafeDetails = generateCafeFormData({
        cafeDetails: get(nodeItem, "data"),
        locations: locationList,
      });
      setRowDetails({ formData: cafeDetails, nodeItem, colDef });
    }
  };

  const handleLocationFilterChange = (e: SelectChangeEvent<any>) => {
    setCafeLocation(e.target.value);
  };

  const handleLocationFilterClear = (option: any) => {
    setCafeLocation(option.id);
  };

  const locationOptions = getLocationsDropdownList(locationList);

  // console.log(locationList, "locationList");

  return (
    <>
      {isAddCafeFormOpen ? (
        <Modal
          title="Cafe Details"
          isOpen={isAddCafeFormOpen}
          onClose={handleDetailsClose}
        >
          {get(errorResponse, "message", "") ? (
            <Alert severity="error">{get(errorResponse, "message", "")}</Alert>
          ) : null}
          <CafeDetails
            mode={modalType}
            rowDetails={rowDetails}
            onClose={() => setIsCafeFormOpen(false)}
            onSubmit={handleSubmitForm}
          />
        </Modal>
      ) : null}
      {isDeleteCafeOpen ? (
        <Modal
          title="Delete Cafe"
          isOpen
          onClose={() => setIsDeleteCafeOpen(false)}
        >
          <div>Do you want to delete the cafe?</div>
          <Box display="flex" flexDirection="row" justifyContent="flex-end">
            <BaseButton onClick={() => setIsDeleteCafeOpen(false)}>
              Cancel
            </BaseButton>
            <BaseButton variant="contained" onClick={handleDeleteCafe}>
              Delete
            </BaseButton>
          </Box>
        </Modal>
      ) : null}
      <Box display="flex" flexDirection="row" marginBottom="20px">
        <Box>
          <FilterDropdown
            label="Filter:"
            value={cafeLocation}
            onChange={handleLocationFilterChange}
            onClearFilter={handleLocationFilterClear}
            options={locationOptions}
          />
        </Box>
        <FlexGrow />
        <Box>
          <BaseButton variant="contained" onClick={handleAddCafeClick}>
            Add Cafe
          </BaseButton>
        </Box>
      </Box>
      <AgGridWrapper
        domLayout="autoHeight"
        rowData={cafeList}
        columnDefs={colDef}
        context={{
          onActionButtonClick: handleActionButtonClick,
        }}
        onGridReady={handleGridReady}
      />
    </>
  );
};

export default CafeList;
