import React from "react";
import "./luck.css";
import axios from "../../axios.config";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Box,
  Stack,
  Checkbox,
  TextField,
  FormControlLabel,
  Paper,
  Chip,
  styled,
} from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";

const ChipListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

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
  const [Dialogopen, setDialogOpen] = React.useState(false);
  const [checkBoxCheck, setCheckBoxCheck] = React.useState(false);
  const [color, setColor] = React.useState("#6d6d6d");
  const [devices, setDevices] = React.useState(() => []);
  const [chipData, setChipData] = React.useState([]);
  const [checknum, setChecknum] = React.useState([]);
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("請輸入您的手機號碼");
  const navigate = useNavigate();

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleDevices = (event, newDevices) => {
    if (newDevices.length <= 3) {
      setDevices(newDevices);
      setChipData(newDevices);
      setChecknum(newDevices);
      console.log(newDevices);
    }
    if (newDevices.length > 3) {
      newDevices.shift();
      setDevices(newDevices);
      setChipData(newDevices);
      setChecknum(newDevices);
      console.log(newDevices);
    }
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
    devices.forEach(function (item, index, arr) {
      if (item === chipToDelete) {
        arr.splice(index, 1);
      }
    });

    console.log(chipToDelete);
  };

  const checkboxChange = () => {
    setCheckBoxCheck(!checkBoxCheck);
    if (checkBoxCheck === false) {
      setColor("#6d6d6d");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let jsonphone;
    if (checkBoxCheck === false) {
      setColor("#B00020");
    }
    if (
      !(phone.startsWith("09") && phone.length === 10) &&
      !(phone.startsWith("8869") && phone.length === 12)
    ) {
      setError(true);
      setHelperText("非暢遊會員,無法登記鎖櫃!");
    }
    if (phone.startsWith("09") && phone.length === 10) {
      jsonphone = phone;
    }
    if (phone.startsWith("8869") && phone.length === 12) {
      jsonphone = "0" + phone.slice(3);
    }

    if (checknum.length === 0) {
      setDialogOpen(true);
    }
    if (
      checkBoxCheck !== false &&
      jsonphone.startsWith("09") &&
      jsonphone.length === 10 &&
      checknum.length !== 0
    ) {
      e.preventDefault();
      let priority = "";
      let cnt = 1;
      devices.forEach(function (i) {
        if (cnt++ == 1) {
          priority += i;
        } else {
          priority += "," + i;
        }
      });
      console.log(priority);
      // for (let i = 0; i < priority.length; i++) {
      //   if (devices[i + 1] == "") {
      //     priority += devices[i];
      //   } else {
      //     priority += devices[i] + ",";
      //   }
      // }
      const json = JSON.stringify({ phone: jsonphone, priority: priority });

      //console.log("phone:" + phone +"number:" + devices);
      axios
        .post("api/Registrations", JSON.parse(json))
        .then((response) => {
          if (response.data == "success") {
            navigate("/Complete");
          } else {
            if (response.data == "非暢遊會員,無法登記鎖櫃!") {
              setError(true);
              setHelperText("非暢遊會員,無法登記鎖櫃!");
            } else {
              setError(true);
              setHelperText("您已登記過鎖櫃");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div id="LUCK">
      <div className="Table">
        <div className="content">
          <div className="directions">
            <p>
              請點擊欲租借的鎖櫃編號，可選三項，須至少輸入一項，選擇的鎖櫃順序為鎖櫃抽選志願序。
            </p>
          </div>

          <div className="toggleBtn">
            <div>
              <div className="Btn">
                <ToggleButtonGroup value={devices} onChange={handleDevices}>
                  <ToggleButton
                    value="00"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    00
                  </ToggleButton>
                  <ToggleButton
                    value="01"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    01
                  </ToggleButton>
                  <ToggleButton
                    disabled="True"
                    style={{
                      width: 48,
                      height: 48,
                      background: "#E5E5E5",
                      border: "1px solid #E0E0E0",
                    }}
                  ></ToggleButton>
                  <ToggleButton
                    disabled="True"
                    style={{
                      width: 48,
                      height: 48,
                      background: "#E5E5E5",
                      border: "1px solid #E0E0E0",
                    }}
                  ></ToggleButton>
                  <ToggleButton
                    disabled="True"
                    style={{
                      width: 48,
                      height: 48,
                      background: "#E5E5E5",
                      border: "1px solid #E0E0E0",
                    }}
                  ></ToggleButton>
                  <ToggleButton
                    disabled="True"
                    style={{
                      width: 48,
                      height: 48,
                      background: "#E5E5E5",
                      border: "1px solid #E0E0E0",
                    }}
                  ></ToggleButton>
                  <ToggleButton
                    value="02"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    02
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="Btn">
                <ToggleButtonGroup value={devices} onChange={handleDevices}>
                  <ToggleButton
                    value="03"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    03
                  </ToggleButton>
                  <ToggleButton
                    value="04"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    04
                  </ToggleButton>
                  <ToggleButton
                    disabled="True"
                    style={{
                      width: 48,
                      height: 48,
                      background: "#E5E5E5",
                      border: "1px solid #E0E0E0",
                    }}
                  ></ToggleButton>
                  <ToggleButton
                    disabled="True"
                    style={{
                      width: 48,
                      height: 48,
                      background: "#E5E5E5",
                      border: "1px solid #E0E0E0",
                    }}
                  ></ToggleButton>
                  <ToggleButton
                    disabled="True"
                    style={{
                      width: 48,
                      height: 48,
                      background: "#E5E5E5",
                      border: "1px solid #E0E0E0",
                    }}
                  ></ToggleButton>
                  <ToggleButton
                    disabled="True"
                    style={{
                      width: 48,
                      height: 48,
                      background: "#E5E5E5",
                      border: "1px solid #E0E0E0",
                    }}
                  ></ToggleButton>
                  <ToggleButton
                    value="05"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    05
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="Btn">
                <ToggleButtonGroup value={devices} onChange={handleDevices}>
                  <ToggleButton
                    value="06"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    06
                  </ToggleButton>
                  <ToggleButton
                    value="07"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    07
                  </ToggleButton>
                  <ToggleButton
                    value="08"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    08
                  </ToggleButton>
                  <ToggleButton
                    value="09"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    09
                  </ToggleButton>
                  <ToggleButton
                    value="10"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    10
                  </ToggleButton>
                  <ToggleButton
                    value="11"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    11
                  </ToggleButton>
                  <ToggleButton
                    value="12"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    12
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="Btn">
                <ToggleButtonGroup value={devices} onChange={handleDevices}>
                  <ToggleButton
                    value="13"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    13
                  </ToggleButton>
                  <ToggleButton
                    value="14"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    14
                  </ToggleButton>
                  <ToggleButton
                    value="15"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    15
                  </ToggleButton>
                  <ToggleButton
                    value="16"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    16
                  </ToggleButton>
                  <ToggleButton
                    value="17"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    17
                  </ToggleButton>
                  <ToggleButton
                    value="18"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    18
                  </ToggleButton>
                  <ToggleButton
                    value="19"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    19
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="Btn">
                <ToggleButtonGroup value={devices} onChange={handleDevices}>
                  <ToggleButton
                    value="20"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    20
                  </ToggleButton>
                  <ToggleButton
                    value="21"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    21
                  </ToggleButton>
                  <ToggleButton
                    value="22"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    22
                  </ToggleButton>
                  <ToggleButton
                    value="23"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    23
                  </ToggleButton>
                  <ToggleButton
                    value="24"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    24
                  </ToggleButton>
                  <ToggleButton
                    value="25"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    25
                  </ToggleButton>
                  <ToggleButton
                    value="26"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    26
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="Btn">
                <ToggleButtonGroup value={devices} onChange={handleDevices}>
                  <ToggleButton
                    value="27"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    27
                  </ToggleButton>
                  <ToggleButton
                    value="28"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    28
                  </ToggleButton>
                  <ToggleButton
                    value="29"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    29
                  </ToggleButton>
                  <ToggleButton
                    value="30"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    30
                  </ToggleButton>
                  <ToggleButton
                    value="31"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    31
                  </ToggleButton>
                  <ToggleButton
                    value="32"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    32
                  </ToggleButton>
                  <ToggleButton
                    value="33"
                    color="primary"
                    style={{
                      width: 48,
                      height: 48,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    33
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
          </div>

          <div className="chip">
            <div className="choosenum">
              <div className="num">
                <p>選擇置物櫃:</p>

                <Paper
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "nowrap",
                    listStyle: "none",
                    boxShadow: 0,
                    p: 0.5,
                    m: 0,
                  }}
                  component="ul"
                >
                  {chipData.map((data) => {
                    let icon;

                    if (data.label === "React") {
                      icon = <TagFacesIcon />;
                    }
                    return (
                      <ChipListItem key={data}>
                        <Chip
                          style={{ height: "32px", width: "61px" }}
                          icon={icon}
                          label={data}
                          onDelete={
                            data.label === "React"
                              ? undefined
                              : handleDelete(data)
                          }
                        />
                      </ChipListItem>
                    );
                  })}
                </Paper>
              </div>
            </div>
          </div>
          <div className="line">
            <Divider />
          </div>
          <form novalidate autoComplete="off" onSubmit={handleSubmit}>
            <div className="textfield">
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
                    setError(false);
                    setHelperText("請輸入您的手機號碼");
                  }}
                />
              </Box>
            </div>

            <div>
              <Dialog
                open={Dialogopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <div className="dialog">
                    <img
                      src="https://imgur.com/mLzAkGV.png"
                      alt="warning"
                    ></img>
                    <p>{"您尚未選取置物櫃"}</p>
                  </div>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    請依順序點選置物櫃編號，最多可選取三個置物櫃位置，選取的鎖櫃順序為置物櫃抽選志願序。
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    確認
                  </Button>
                </DialogActions>
              </Dialog>
            </div>

            <div className="agree">
              <div className="agreeItem">
                <div className="itemLeft">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkBoxCheck}
                        onChange={checkboxChange}
                        sx={{
                          color: { color },
                        }}
                      />
                    }
                    label="我已閱讀且同意遵守"
                    sx={{
                      color: { color },
                    }}
                  />
                </div>

                <a
                  href="https://monospace.guide/books/manual/page/31fef"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <font size="3">新制會員物品管理規範</font>
                </a>
              </div>
            </div>

            <div className="btn">
              <div className="sendBtn">
                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    type="submit"
                    value="submit"
                    style={{
                      width: 380,
                      height: 40,
                      background: "#02A2EE",
                      boxShadow: "none",
                    }}
                  >
                    <p>送出</p>
                  </Button>
                </Stack>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
