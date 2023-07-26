import { ButtonProps, Button, Box, BoxProps } from "@mui/material";
import React from "react";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

export interface BaseButtonProps extends ButtonProps {
  isLoading?: boolean;
  boxProps?: BoxProps;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  isLoading,
  boxProps = {},
  ...props
}) => {
  return (
    <Box {...boxProps}>
      <Button disabled={isLoading} {...props}>
        {isLoading ? <UseAnimations animation={loading} /> : children}
      </Button>
    </Box>
  );
};

export default BaseButton;
