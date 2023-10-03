import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridWrapper } from "../../components/aggrid/AgGridWrapper";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import React, { useEffect, useState } from "react";
import {
  addBranchRequest,
  deleteBranchRequest,
  fetchBranchListRequest,
  updateBranchRequest,
} from "../../store/slices/branchSlice";
import Modal from "../../components/Modal";
import BranchDetails from "./BranchDetails";
import ActionButtons from "../../components/aggrid/ActionButtons";
import {
  generateBranchFormData,
  getLocationsDropdownList,
} from "../../utils/common";
import { get } from "lodash";
import BaseButton from "../../components/buttons/BaseButton";
import Alert from "@mui/material/Alert";
import { Box, CardMedia, SelectChangeEvent } from "@mui/material";
import { fetchLocationListRequest } from "../../store/slices/locationSlice";
import FilterDropdown from "../../components/form/FilterDropdown";
import FlexGrow from "../../components/FlexGrow";
import styled from "@emotion/styled";
import { RowDetailsInterface } from "./types";

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

const LocationColumn: React.FC<ICellRendererParams> = ({ value, ...props }) => {
  return <span>{get(value, "name", "")}</span>;
};

const LgoColumn: React.FC<ICellRendererParams> = ({ value, ...props }) => {
  return (
    <ImageWrapper>
      <CardMedia
        component="img"
        sx={{ width: 40, objectFit: "contain" }}
        image={value}
      />
    </ImageWrapper>
  );
};

const BranchList = () => {
  const {
    branchList,
    errorResponse,
    status: addBranchStatus,
  } = useAppSelector((state: RootState) => state.);
  const [isAddBranchFormOpen, setIsBranchFormOpen] = useState(false);
  const [isDeleteBranchOpen, setIsDeleteBranchOpen] = useState(false);
  const [rowDetails, setRowDetails] = useState<RowDetailsInterface | null>(
    null
  );
  const [branchLocation, setBranchLocation] = useState("");
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [modalType, setModalType] = useState<any>("create");
  const { locationList, status: locationApiStatus } = useAppSelector(
    (state) => state.locations
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBranchListRequest({ locationId: branchLocation }));
  }, [branchLocation]);

  const handleGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const handleDetailsClose = () => {
    setIsBranchFormOpen(false);
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

  const handleAddBranch = (data: any) => {
    dispatch(addBranchRequest(data));
  };

  const handleAddBranchClick = () => {
    setModalType("create");
    setIsBranchFormOpen(true);
    const branchDetails = generateBranchFormData({});
    setRowDetails({ formData: branchDetails });
  };

  const handleUpdateBranch = (data: any) => {
    console.log("handleUpdateBranch");
    dispatch(updateBranchRequest(data));
  };

  const handleDeleteBranch = () => {
    console.log(rowDetails?.formData);
    setIsDeleteBranchOpen(false);
    dispatch(deleteBranchRequest({ id: rowDetails?.formData.id }));
  };

  const handleSubmitForm = (data: any) => {
    if (modalType === "edit") {
      handleUpdateBranch({ id: rowDetails?.formData.id, data });
    } else {
      handleAddBranch(data);
    }
  };
  // console.log(branchList, "branchList");

  const handleActionButtonClick = (
    action: string,
    nodeItem: any,
    colDef: any
  ) => {
    if (action === "edit") {
      setModalType("edit");
      setIsBranchFormOpen(true);
      const branchDetails = generateBranchFormData({
        branchDetails: get(nodeItem, "data"),
      });
      setRowDetails({ formData: branchDetails, nodeItem, colDef });
    } else if (action === "delete") {
      setModalType("delete");
      setIsDeleteBranchOpen(true);
      const branchDetails = generateBranchFormData({
        branchDetails: get(nodeItem, "data"),
      });
      setRowDetails({ formData: branchDetails, nodeItem, colDef });
    }
  };

  const handleLocationFilterChange = (e: SelectChangeEvent<any>) => {
    setBranchLocation(e.target.value);
  };

  const handleLocationFilterClear = (option: any) => {
    setBranchLocation(option.id);
  };

  const locationOptions = getLocationsDropdownList(locationList);

  // console.log(locationList, "locationList");

  return (
    <>
      {isAddBranchFormOpen ? (
        <Modal
          title="Branch Details"
          isOpen={isAddBranchFormOpen}
          onClose={handleDetailsClose}
        >
          {get(errorResponse, "message", "") ? (
            <Alert severity="error">{get(errorResponse, "message", "")}</Alert>
          ) : null}
          <BranchDetails
            mode={modalType}
            rowDetails={rowDetails}
            onClose={() => setIsBranchFormOpen(false)}
            onSubmit={handleSubmitForm}
          />
        </Modal>
      ) : null}
      {isDeleteBranchOpen ? (
        <Modal
          title="Delete Branch"
          isOpen
          onClose={() => setIsDeleteBranchOpen(false)}
        >
          <div>Do you want to delete the branch?</div>
          <Box display="flex" flexDirection="row" justifyContent="flex-end">
            <BaseButton onClick={() => setIsDeleteBranchOpen(false)}>
              Cancel
            </BaseButton>
            <BaseButton variant="contained" onClick={handleDeleteBranch}>
              Delete
            </BaseButton>
          </Box>
        </Modal>
      ) : null}
      <Box display="flex" flexDirection="row" marginBottom="20px">
        <Box>
          <FilterDropdown
            label="Filter:"
            value={branchLocation}
            onChange={handleLocationFilterChange}
            onClearFilter={handleLocationFilterClear}
            options={locationOptions}
          />
        </Box>
        <FlexGrow />
        <Box>
          <BaseButton variant="contained" onClick={handleAddBranchClick}>
            Add Branch
          </BaseButton>
        </Box>
      </Box>
      <AgGridWrapper
        domLayout="autoHeight"
        rowData={branchList}
        columnDefs={colDef}
        context={{
          onActionButtonClick: handleActionButtonClick,
        }}
        onGridReady={handleGridReady}
      />
    </>
  );
};

export default BranchList;
