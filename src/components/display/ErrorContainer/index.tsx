import styled from "@emotion/styled";
import { Alert, AlertTitle } from "@mui/material";

export type ErrorType = "success" | "error" | "info" | "warning";

export interface ErrorContainerProps {
  type: ErrorType;
  title?: string;
  message: string;
}

const StyledContainer = styled.div`
  margin-bottom: 15px;
`;

const ErrorContainer: React.FC<ErrorContainerProps> = ({
  type,
  title,
  message,
}) => {
  const alertTitle = title ? <AlertTitle>{title}</AlertTitle> : null;
  return (
    <StyledContainer>
      <Alert
        severity={type}
        variant="outlined"
        style={{ border: "none", paddingLeft: 0 }}
      >
        {alertTitle}
        {message}
      </Alert>
    </StyledContainer>
  );
};

export default ErrorContainer;
