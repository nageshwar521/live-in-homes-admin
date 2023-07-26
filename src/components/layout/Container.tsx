import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledDiv = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
`;

export interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ className = "", children }) => {
  return <StyledDiv className={className}>{children}</StyledDiv>;
};

export default Container;
