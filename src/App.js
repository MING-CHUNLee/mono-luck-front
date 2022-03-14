import React from "react";
import "./page/index/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./page/index/index";
import Luckpage from "./page/luck/luck";
import Complete from "./page/complete/complete";
import Inquiry from "./page/inquiry/inquiry";
import Notyetopen from "./page/notyetopen/notyetopen";
import Result from "./page/result/result";
import Hamburgar from "./component/hamburgar";

const Layout = (props) => {
  return (
    <>
      <Hamburgar />
      {props.children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout></Layout>
      <Routes>
        <Route path="/" element={<Homepage />} title="首頁" />
        <Route path="/Luck" element={<Luckpage />} title="鎖櫃登記" />
        <Route path="/Complete" element={<Complete />} title="登記成功" />
        <Route path="/Inquiry" element={<Inquiry />} title="查詢登記" />
        <Route path="/Noyetopen" element={<Notyetopen />} title="查詢登記" />
        <Route path="/Result" element={<Result />} title="查詢登記" />
      </Routes>
    </Router>
  );
};

export default App;
