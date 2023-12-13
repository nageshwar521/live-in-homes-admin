import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridWrapper } from "../../components/aggrid/AgGridWrapper";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import React, { useEffect, useState } from "react";
import {
  addAmenityRequest,
  deleteAmenityRequest,
  fetchAmenityListRequest,
  updateAmenityRequest,
} from "../../store/slices/amenitySlice";
import Modal from "../../components/Modal";
import AmenityDetails from "./AmenityDetails";
import ActionButtons from "../../components/aggrid/ActionButtons";
import { generateAmenityFormData } from "../../utils/common";
import { get } from "lodash";
import BaseButton from "../../components/buttons/BaseButton";
import Alert from "@mui/material/Alert";
import { Box, CardMedia, SelectChangeEvent } from "@mui/material";
import FilterDropdown from "../../components/form/FilterDropdown";
import FlexGrow from "../../components/FlexGrow";
import styled from "@emotion/styled";
import { RowDetailsInterface } from "./types";
import { AmenityItem } from "../../store/types";
import { fetchCategoryListRequest } from "../../store/slices/categorySlice";

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

export const defaultAmenityValues: AmenityItem = {
  amenity_name: "",
  amenity_description: "",
};

const LocationColumn: React.FC<ICellRendererParams> = ({ value, ...props }) => {
  return <span>{get(value, "name", "")}</span>;
};

const AmenityList = () => {
  const {
    amenityList,
    errorResponse,
    status: addAmenityStatus,
  } = useAppSelector((state: RootState) => state.amenities);
  const [isAddAmenityFormOpen, setIsAmenityFormOpen] = useState(false);
  const [isDeleteAmenityOpen, setIsDeleteAmenityOpen] = useState(false);
  const [rowDetails, setRowDetails] = useState<RowDetailsInterface | null>(
    null
  );
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [modalType, setModalType] = useState<any>("create");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAmenityListRequest({}));
    dispatch(fetchCategoryListRequest({}));
  }, []);

  const handleGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const handleDetailsClose = () => {
    setIsAmenityFormOpen(false);
  };

  const colDef: ColDef[] = [
    {
      field: "amenity_name",
      headerName: "Name",
      sortable: true,
      unSortIcon: true,
    },
    { field: "amenity_description", headerName: "Description" },
    { field: "amenity_category", headerName: "Category" },
    {
      field: "",
      cellRenderer: ActionButtons,
    },
  ];

  const handleAddAmenity = (data: any) => {
    console.log(data, 'data');
    dispatch(addAmenityRequest({ ...defaultAmenityValues, ...data }));
  };

  const handleAddAmenityClick = () => {
    setModalType("create");
    setIsAmenityFormOpen(true);
    const amenityDetails = generateAmenityFormData({});
    setRowDetails({ formData: amenityDetails });
  };

  const handleUpdateAmenity = (data: any) => {
    console.log("handleUpdateAmenity");
    dispatch(updateAmenityRequest({ ...defaultAmenityValues, ...data }));
  };

  const handleDeleteAmenity = () => {
    console.log(rowDetails?.formData);
    setIsDeleteAmenityOpen(false);
    dispatch(deleteAmenityRequest({ id: rowDetails?.formData.id }));
  };

  const handleSubmitForm = (data: any) => {
    if (modalType === "edit") {
      handleUpdateAmenity({ id: rowDetails?.formData.id, data });
    } else {
      handleAddAmenity(data);
    }
  };
  // console.log(amenityList, "amenityList");

  const handleActionButtonClick = (
    action: string,
    nodeItem: any,
    colDef: any
  ) => {
    if (action === "edit") {
      setModalType("edit");
      setIsAmenityFormOpen(true);
      const amenityDetails = generateAmenityFormData({
        amenityDetails: get(nodeItem, "data"),
      });
      setRowDetails({ formData: amenityDetails, nodeItem, colDef });
    } else if (action === "delete") {
      setModalType("delete");
      setIsDeleteAmenityOpen(true);
      const amenityDetails = generateAmenityFormData({
        amenityDetails: get(nodeItem, "data"),
      });
      setRowDetails({ formData: amenityDetails, nodeItem, colDef });
    }
  };

  // console.log(locationList, "locationList");

  return (
    <>
      {isAddAmenityFormOpen ? (
        <Modal
          title="Amenity Details"
          isOpen={isAddAmenityFormOpen}
          onClose={handleDetailsClose}
        >
          {get(errorResponse, "message", "") ? (
            <Alert severity="error">{get(errorResponse, "message", "")}</Alert>
          ) : null}
          <AmenityDetails
            mode={modalType}
            rowDetails={rowDetails}
            onClose={() => setIsAmenityFormOpen(false)}
            onSubmit={handleSubmitForm}
          />
        </Modal>
      ) : null}
      {isDeleteAmenityOpen ? (
        <Modal
          title="Delete Amenity"
          isOpen
          onClose={() => setIsDeleteAmenityOpen(false)}
        >
          <div>Do you want to delete the amenity?</div>
          <Box display="flex" flexDirection="row" justifyContent="flex-end">
            <BaseButton onClick={() => setIsDeleteAmenityOpen(false)}>
              Cancel
            </BaseButton>
            <BaseButton variant="contained" onClick={handleDeleteAmenity}>
              Delete
            </BaseButton>
          </Box>
        </Modal>
      ) : null}
      <Box display="flex" flexDirection="row" marginBottom="20px">
        <FlexGrow />
        <Box>
          <BaseButton variant="contained" onClick={handleAddAmenityClick}>
            Add Amenity
          </BaseButton>
        </Box>
      </Box>
      <AgGridWrapper
        domLayout="autoHeight"
        rowData={amenityList}
        columnDefs={colDef}
        context={{
          onActionButtonClick: handleActionButtonClick,
        }}
        onGridReady={handleGridReady}
      />
    </>
  );
};

export default AmenityList;
