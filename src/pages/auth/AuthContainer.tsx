import { Card } from "@mui/material";

export interface IAuthContainerProps {
  children: any;
}

const AuthContainer: React.FC<IAuthContainerProps> = ({ children }) => {
  return <Card sx={{ width: 400 }}>{children}</Card>;
};

export default AuthContainer;
