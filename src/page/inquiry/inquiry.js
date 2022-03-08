import React from "react";
import "./inquiry.css";
import { styled, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "../../axios.config";

const CssTextField = styled(TextField)({
  "& .MuiFormHelperText-root": {
    "&.Mui-focused": {
      //提示文字
      color: "#02A2EE",
    },
  },
  "& label.Mui-focused": {
    //上排文字
    color: "#02A2EE",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#02A2EE", //FIELD 框
    },
  },
});

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
          "置物櫃尚在登記，請於 03/14 中午 12:00 至本系統查詢抽籤結果。"
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
            <CssTextField
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
                style={{
                  width: 380,
                  height: 40,
                  background: "#02A2EE",
                  boxShadow: "none",
                }}
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
