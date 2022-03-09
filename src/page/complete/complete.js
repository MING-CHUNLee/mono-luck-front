import React from "react";
import "./complete.css";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div id="OK">
      <div className="Complete">
        <div className="completeArea">
          <img
            className="success"
            src="https://imgur.com/gczuDrA.png"
            alt=""
          ></img>
          <div className="completeTitle">
            <p>登記成功</p>
          </div>
          <div className="completeContent">
            <p>請於 03/14 中午 12:00 至本系統查詢抽籤結果。</p>
          </div>
        </div>
        <div className="done">
          <div className="button">
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
