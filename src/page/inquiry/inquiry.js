import React from "react";
import "./inquiry.css";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "../../axios.config";

function App() {
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [helperText, setHelperText] = React.useState("請輸入您的手機號碼");

  const handleClick = (event) => {
    event.preventDefault();
    const json = JSON.stringify({ phone: phone });

    //console.log("phone:" + phone +"number:" + devices);
    axios
      .post("api/Locker", JSON.parse(json))
      .then((response) => {
        if (
          response.data ===
          "目前鎖櫃尚在登記中，<br>請在 12/12 AM 10 回來本系統查看中籤資訊"
        ) {
          navigate("/Noyetopen");
        } else {
          if (response.data === "您尚未登記過鎖櫃") {
            setError(true);
            setHelperText("您尚未登記過鎖櫃");
          } else {
            setError(true);
            setHelperText("非暢遊會員,無法登記鎖櫃!");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div id="SEARCH">
      <div className="Inquiry">
        <div className="searchArea">
          <Box
            component="form"
            sx={{
              "& > :not(style)": {},
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-helperText"
              label="手機號碼"
              error={error}
              helperText={helperText}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/[^\d.]/g, ""));
              }}
            />
          </Box>
          <div class="Done">
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                style={{ width: 380, height: 40, background: "#02A2EE" }}
                onClick={handleClick}
              >
                完成
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
