import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props: RowProps) => props.justifyContent};
`;

export interface RowProps {
  className?: string;
  children: ReactNode;
  justifyContent?: "flex-start" | "flex-end" | "center";
}

const Row: React.FC<RowProps> = ({ className = "", children, ...props }) => {
  return (
    <StyledDiv className={className} {...props}>
      {children}
    </StyledDiv>
  );
};

export default Row;
