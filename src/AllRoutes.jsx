import Home from "./page/Home";
import InputDisease from "./page/InputDisease";
import Search from "./page/Search";
import About from "./page/About";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";

const AllRoutes = () => {
  const handleClick = () => {
    console.log("routes is mounted");
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} onClick={handleClick} />
        <Route path="about" element={<About />} />
        <Route path="input" element={<InputDisease />} />
        <Route path="search" element={<Search />} />
        {/* <Route path="algo" element={<Algo />} /> */}
        {/* <Route path="testing" element={<Testing />} />
              <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default AllRoutes;
