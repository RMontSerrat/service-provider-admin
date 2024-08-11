import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List, Tooltip } from "@mui/material";
import NavItem from "./NavItem";

const SidebarItems = ({ toggleMobileSidebar, collapsed }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: collapsed ? 1 : 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          return (
            <Tooltip title={collapsed ? item.title : ''} placement="right" arrow key={item.id}>
              <Box>
                <NavItem
                  item={item}
                  pathDirect={pathDirect}
                  onClick={toggleMobileSidebar}
                />
              </Box>
            </Tooltip>
          );
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;