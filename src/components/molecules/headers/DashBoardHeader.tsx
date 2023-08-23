import { Typography, Box, useTheme, colors } from "@mui/material";

interface HeaderProps {
  title: string | null;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Box>
      <div className=" text-xl text-purple-900 mb-1">{title}</div>
    </Box>
  );
};

export default Header;
