import React from "react";
import "./notyetopen.css";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div id="OPEN">
      <div className="Notyetopen">
        <div className="notyetopenText">
          <p>置物櫃尚在登記，請於 03/14 中午 12:00 至本系統查詢抽籤結果。</p>
          <div class="button">
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
