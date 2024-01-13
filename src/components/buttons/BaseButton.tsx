import { ButtonProps, Button, Box, BoxProps } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

export interface BaseButtonProps extends ButtonProps {
  isLoading?: boolean;
  boxProps?: BoxProps;
  href?: string;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  isLoading,
  boxProps = {},
  href = '',
  ...props
}) => {
  let linkProps: BaseButtonProps = {};
  if (href) {
    linkProps = {
      to: href,
      component: Link
    }
  }
  return (
    <Box {...boxProps}>
      <Button disabled={isLoading} {...linkProps} {...props}>
        {isLoading ? <UseAnimations animation={loading} /> : children}
      </Button>
    </Box>
  );
};

export default BaseButton;
