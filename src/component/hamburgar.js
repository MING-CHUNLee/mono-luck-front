import * as React from "react";
import "./hamburgar.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation, useEffect } from "react-router-dom";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [drawerText, setDrawerText] = React.useState("首頁");

  const [btncolor1, setBtnColor1] = React.useState("#000");
  const [btncolor2, setBtnColor2] = React.useState("#000");
  const [btnbg1, setBtnBg1] = React.useState("#FFF");
  const [btnbg2, setBtnBg2] = React.useState("#FFF");
  const titleMap = [
    { path: "/", title: "首頁" },
    { path: "/Luck", title: "置物櫃登記" },
    { path: "/Complete", title: "登記成功" },
    { path: "/Inquiry", title: "查詢登記" },
    { path: "/Noyetopen", title: "查詢登記" },
  ];

  let curLoc = useLocation();
  React.useEffect(() => {
    const curTitle = titleMap.find((item) => item.path === curLoc.pathname);
    if (curTitle && curTitle.title) {
      setDrawerText(curTitle.title);
      document.title = curTitle.title;
      if (curTitle.title === "置物櫃登記") {
        setBtnBg1("#E1F4FD");
        setBtnBg2("#FFF");
        setBtnColor1("#02A2EE");
        setBtnColor2("#000");
      } else if (curTitle.title === "查詢登記") {
        setBtnBg2("#E1F4FD");
        setBtnBg1("#FFF");
        setBtnColor2("#02A2EE");
        setBtnColor1("#000");
      } else {
        setBtnBg2("#FFF");
        setBtnBg1("#FFF");
        setBtnColor2("#000");
        setBtnColor1("#000");
      }
    }
  }, [curLoc]);

  const changeColor1 = () => {
    setBtnBg1("#E1F4FD");
    setBtnBg2("#FFF");
    setBtnColor1("#02A2EE");
    setBtnColor2("#000");
  };
  const changeColor2 = () => {
    setBtnBg2("#E1F4FD");
    setBtnBg1("#FFF");
    setBtnColor2("#02A2EE");
    setBtnColor1("#000");
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div className="SidebarImg">
          <img src="https://imgur.com/PJgYdab.png" alt=""></img>
        </div>
        <div className="SidebarText">
          <p className="SidebarTitle">MonoLuck</p>
          <p className="SidebarContent">Monosparta</p>
        </div>

        <Link to="/Luck" className="link">
          <ListItem
            button
            key={"置物櫃登記"}
            style={{ background: btnbg1, color: btncolor1 }}
            onClick={changeColor1}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary={"置物櫃登記"} />
          </ListItem>
        </Link>

        <Link to="/Inquiry" className="link">
          <ListItem
            button
            key={"查詢登記"}
            style={{ background: btnbg2, color: btncolor2 }}
            onClick={changeColor2}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={"查詢登記"} />
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <div className="appbar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{ background: "#02A2EE", boxShadow: "none" }}
        >
          <Toolbar variant="dense" style={{ padding: "0" }}>
            <Button
              onClick={toggleDrawer("left", true)}
              style={{ color: "#fff" }}
            >
              <MenuIcon />
            </Button>
            <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
            <div className="titletext">
              <Typography variant="h6" color="inherit" component="div">
                {drawerText}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
