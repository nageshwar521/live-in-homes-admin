import { FormControl } from "@mui/material";
import React from "react";

export interface FieldContainerProps {
  children: any;
}

const FieldContainer: React.FC<FieldContainerProps> = ({ children }) => {
  return <FormControl fullWidth>{children}</FormControl>;
};

export default FieldContainer;
