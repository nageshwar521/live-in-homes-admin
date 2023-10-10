import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridWrapper } from "../../components/aggrid/AgGridWrapper";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import React, { useEffect, useState } from "react";
import {
  addCategoryRequest,
  deleteCategoryRequest,
  fetchCategoryListRequest,
  updateCategoryRequest,
} from "../../store/slices/categorySlice";
import Modal from "../../components/Modal";
import CategoryDetails from "./CategoryDetails";
import ActionButtons from "../../components/aggrid/ActionButtons";
import { generateCategoryFormData } from "../../utils/common";
import { get } from "lodash";
import BaseButton from "../../components/buttons/BaseButton";
import Alert from "@mui/material/Alert";
import { Box, CardMedia, SelectChangeEvent } from "@mui/material";
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

const CategoryList = () => {
  const {
    categoryList,
    errorResponse,
    status: addCategoryStatus,
  } = useAppSelector((state: RootState) => state.categories);
  const [isAddCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false);
  const [rowDetails, setRowDetails] = useState<RowDetailsInterface | null>(
    null
  );
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [modalType, setModalType] = useState<any>("create");

  const dispatch = useAppDispatch();

  const handleGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const handleDetailsClose = () => {
    setIsCategoryFormOpen(false);
  };

  const colDef: ColDef[] = [
    {
      field: "category_name",
      headerName: "Name",
      sortable: true,
      unSortIcon: true,
    },
    { field: "category_description", headerName: "Description" },
    {
      field: "",
      cellRenderer: ActionButtons,
    },
  ];

  useEffect(() => {
    dispatch(fetchCategoryListRequest({}));
  }, []);

  const handleAddCategory = (data: any) => {
    dispatch(addCategoryRequest(data));
  };

  const handleAddCategoryClick = () => {
    setModalType("create");
    setIsCategoryFormOpen(true);
    const categoryDetails = generateCategoryFormData({});
    setRowDetails({ formData: categoryDetails });
  };

  const handleUpdateCategory = (data: any) => {
    console.log("handleUpdateCategory");
    dispatch(updateCategoryRequest(data));
  };

  const handleDeleteCategory = () => {
    console.log(rowDetails?.formData);
    setIsDeleteCategoryOpen(false);
    dispatch(deleteCategoryRequest({ id: rowDetails?.formData.id }));
  };

  const handleSubmitForm = (data: any) => {
    if (modalType === "edit") {
      handleUpdateCategory({ id: rowDetails?.formData.id, data });
    } else {
      handleAddCategory(data);
    }
  };
  // console.log(categoryList, "categoryList");

  const handleActionButtonClick = (
    action: string,
    nodeItem: any,
    colDef: any
  ) => {
    if (action === "edit") {
      setModalType("edit");
      setIsCategoryFormOpen(true);
      const categoryDetails = generateCategoryFormData({
        categoryDetails: get(nodeItem, "data"),
      });
      setRowDetails({ formData: categoryDetails, nodeItem, colDef });
    } else if (action === "delete") {
      setModalType("delete");
      setIsDeleteCategoryOpen(true);
      const categoryDetails = generateCategoryFormData({
        categoryDetails: get(nodeItem, "data"),
      });
      setRowDetails({ formData: categoryDetails, nodeItem, colDef });
    }
  };

  // console.log(locationList, "locationList");

  return (
    <>
      {isAddCategoryFormOpen ? (
        <Modal
          title="Category Details"
          isOpen={isAddCategoryFormOpen}
          onClose={handleDetailsClose}
        >
          {get(errorResponse, "message", "") ? (
            <Alert severity="error">{get(errorResponse, "message", "")}</Alert>
          ) : null}
          <CategoryDetails
            mode={modalType}
            rowDetails={rowDetails}
            onClose={() => setIsCategoryFormOpen(false)}
            onSubmit={handleSubmitForm}
          />
        </Modal>
      ) : null}
      {isDeleteCategoryOpen ? (
        <Modal
          title="Delete Category"
          isOpen
          onClose={() => setIsDeleteCategoryOpen(false)}
        >
          <div>Do you want to delete the category?</div>
          <Box display="flex" flexDirection="row" justifyContent="flex-end">
            <BaseButton onClick={() => setIsDeleteCategoryOpen(false)}>
              Cancel
            </BaseButton>
            <BaseButton variant="contained" onClick={handleDeleteCategory}>
              Delete
            </BaseButton>
          </Box>
        </Modal>
      ) : null}
      <Box display="flex" flexDirection="row" marginBottom="20px">
        <FlexGrow />
        <Box>
          <BaseButton variant="contained" onClick={handleAddCategoryClick}>
            Add Category
          </BaseButton>
        </Box>
      </Box>
      <AgGridWrapper
        domLayout="autoHeight"
        rowData={categoryList}
        columnDefs={colDef}
        context={{
          onActionButtonClick: handleActionButtonClick,
        }}
        onGridReady={handleGridReady}
      />
    </>
  );
};

export default CategoryList;
