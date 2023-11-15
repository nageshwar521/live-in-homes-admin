import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridWrapper } from "../../components/aggrid/AgGridWrapper";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import React, { useEffect, useState } from "react";
import {
  addConditionRequest,
  deleteConditionRequest,
  fetchConditionListRequest,
  updateConditionRequest,
} from "../../store/slices/conditionSlice";
import Modal from "../../components/Modal";
import ConditionDetails from "./ConditionDetails";
import ActionButtons from "../../components/aggrid/ActionButtons";
import { generateConditionFormData } from "../../utils/common";
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

const ConditionList = () => {
  const {
    conditionList,
    errorResponse,
    status: addConditionStatus,
  } = useAppSelector((state: RootState) => state.conditions);
  const [isAddConditionFormOpen, setIsConditionFormOpen] = useState(false);
  const [isDeleteConditionOpen, setIsDeleteConditionOpen] = useState(false);
  const [rowDetails, setRowDetails] = useState<RowDetailsInterface | null>(
    null
  );
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [modalType, setModalType] = useState<any>("create");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchConditionListRequest({}));
  }, []);

  const handleGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const handleDetailsClose = () => {
    setIsConditionFormOpen(false);
  };

  const colDef: ColDef[] = [
    {
      field: "condition_name",
      headerName: "Name",
      sortable: true,
      unSortIcon: true,
    },
    { field: "condition_description", headerName: "Description" },
    {
      field: "",
      cellRenderer: ActionButtons,
    },
  ];

  const handleAddCondition = (data: any) => {
    dispatch(addConditionRequest(data));
  };

  const handleAddConditionClick = () => {
    setModalType("create");
    setIsConditionFormOpen(true);
    const conditionDetails = generateConditionFormData({});
    setRowDetails({ formData: conditionDetails });
  };

  const handleUpdateCondition = (data: any) => {
    console.log("handleUpdateCondition");
    dispatch(updateConditionRequest(data));
  };

  const handleDeleteCondition = () => {
    console.log(rowDetails?.formData);
    setIsDeleteConditionOpen(false);
    dispatch(deleteConditionRequest({ id: rowDetails?.formData.id }));
  };

  const handleSubmitForm = (data: any) => {
    if (modalType === "edit") {
      handleUpdateCondition({ id: rowDetails?.formData.id, data });
    } else {
      handleAddCondition(data);
    }
  };
  // console.log(conditionList, "conditionList");

  const handleActionButtonClick = (
    action: string,
    nodeItem: any,
    colDef: any
  ) => {
    if (action === "edit") {
      setModalType("edit");
      setIsConditionFormOpen(true);
      const conditionDetails = generateConditionFormData({
        conditionDetails: get(nodeItem, "data"),
      });
      setRowDetails({ formData: conditionDetails, nodeItem, colDef });
    } else if (action === "delete") {
      setModalType("delete");
      setIsDeleteConditionOpen(true);
      const conditionDetails = generateConditionFormData({
        conditionDetails: get(nodeItem, "data"),
      });
      setRowDetails({ formData: conditionDetails, nodeItem, colDef });
    }
  };

  // console.log(locationList, "locationList");

  return (
    <>
      {isAddConditionFormOpen ? (
        <Modal
          title="Condition Details"
          isOpen={isAddConditionFormOpen}
          onClose={handleDetailsClose}
        >
          {get(errorResponse, "message", "") ? (
            <Alert severity="error">{get(errorResponse, "message", "")}</Alert>
          ) : null}
          <ConditionDetails
            mode={modalType}
            rowDetails={rowDetails}
            onClose={() => setIsConditionFormOpen(false)}
            onSubmit={handleSubmitForm}
          />
        </Modal>
      ) : null}
      {isDeleteConditionOpen ? (
        <Modal
          title="Delete Condition"
          isOpen
          onClose={() => setIsDeleteConditionOpen(false)}
        >
          <div>Do you want to delete the condition?</div>
          <Box display="flex" flexDirection="row" justifyContent="flex-end">
            <BaseButton onClick={() => setIsDeleteConditionOpen(false)}>
              Cancel
            </BaseButton>
            <BaseButton variant="contained" onClick={handleDeleteCondition}>
              Delete
            </BaseButton>
          </Box>
        </Modal>
      ) : null}
      <Box display="flex" flexDirection="row" marginBottom="20px">
        <FlexGrow />
        <Box>
          <BaseButton variant="contained" onClick={handleAddConditionClick}>
            Add Condition
          </BaseButton>
        </Box>
      </Box>
      <AgGridWrapper
        domLayout="autoHeight"
        rowData={conditionList}
        columnDefs={colDef}
        context={{
          onActionButtonClick: handleActionButtonClick,
        }}
        onGridReady={handleGridReady}
      />
    </>
  );
};

export default ConditionList;
