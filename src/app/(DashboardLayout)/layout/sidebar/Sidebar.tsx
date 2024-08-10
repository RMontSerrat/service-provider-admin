import React, { useState } from "react";
import { useMediaQuery, Box, Drawer, IconButton } from "@mui/material";
import Logo from "../shared/logo/Logo";
import SidebarItems from "./SidebarItems";
import { Upgrade } from "./Updrade";
import MenuIcon from '@mui/icons-material/Menu';

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const [collapsed, setCollapsed] = useState(false);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const sidebarWidth = collapsed ? "58px" : "270px";

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          transition: "width 0.3s",
        }}
      >
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: "border-box",
              transition: "width 0.3s",
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box px={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Logo />
              <IconButton onClick={handleToggleCollapse}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box flexGrow={1}>
              <SidebarItems collapsed={collapsed} />
            </Box>
            <Upgrade />
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Box px={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Logo />
        <IconButton onClick={handleToggleCollapse}>
          <MenuIcon />
        </IconButton>
      </Box>
      <SidebarItems collapsed={collapsed} />
      <Upgrade />
    </Drawer>
  );
};

export default Sidebar;