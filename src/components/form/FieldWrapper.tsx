import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledDiv = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

interface FieldWrapperProps {
  children: ReactNode;
  className?: string;
}

const FieldWrapper: React.FC<FieldWrapperProps> = ({
  children,
  className = "",
}) => {
  return <StyledDiv className={className}>{children}</StyledDiv>;
};

export default FieldWrapper;
