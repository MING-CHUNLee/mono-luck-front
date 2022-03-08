import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function Homepage() {
  const [Dialogopen, setDialogOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    let today = new Date();
    let endDate = "2022/03/13 23:59:59";

    if (Date.parse(today).valueOf() > Date.parse(endDate).valueOf()) {
      setDialogOpen(true);
    } else {
      navigate("/Luck");
    }
  };

  return (
    <div id="HOME">
      <div className="Homepage">
        <div className="Logo">
          <img src="https://imgur.com/c7OVLhS.png" alt="mono"></img>
        </div>
        <div className="Text">
          <div className="Title1">
            <p>MonoLuck</p>
          </div>
          <div className="Title2">
            <p>鎖櫃登記系統</p>
          </div>
        </div>

        <div className="button">
          <Stack spacing={1}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                className="button_r"
                onClick={(e) => {
                  handleClick(e);
                }}
                style={{ background: "#02A2EE", boxShadow: "none" }}
              >
                <EditIcon />
                開始登記
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Link to="/Inquiry" className="link">
                <Button
                  variant="outlined"
                  className="button_r"
                  style={{ color: "#02A2EE" }}
                >
                  <SearchIcon />
                  登記查詢
                </Button>
              </Link>
            </Stack>
          </Stack>
        </div>
        <Dialog
          open={Dialogopen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <div className="dialog">
              <img src="https://imgur.com/mLzAkGV.png" alt="warning"></img>
              <p>{"登記已截止"}</p>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              置物櫃登記時間已截止，請於03/14中午 12:00至本系統查詢抽籤結果。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              確認
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Homepage;
