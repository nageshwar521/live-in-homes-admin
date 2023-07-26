import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface ColumnProps {
  className?: string;
  children: ReactNode;
}

const Column: React.FC<ColumnProps> = ({ className = "", children }) => {
  return <StyledDiv className={className}>{children}</StyledDiv>;
};

export default Column;
