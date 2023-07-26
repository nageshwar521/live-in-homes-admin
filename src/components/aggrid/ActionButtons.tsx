import { ICellRendererParams } from "ag-grid-community";
import BaseButton from "../buttons/BaseButton";
import { Box } from "@mui/material";

const ActionButtons = (props: ICellRendererParams) => {
  const invokeParentMethod = (action: string) => {
    props.context.onActionButtonClick(action, props.node, props.colDef);
  };

  return (
    <Box display="flex" flexDirection="row">
      <BaseButton onClick={invokeParentMethod.bind(null, "edit")}>
        Edit
      </BaseButton>
      <BaseButton onClick={invokeParentMethod.bind(null, "delete")}>
        Delete
      </BaseButton>
    </Box>
  );
};

export default ActionButtons;
