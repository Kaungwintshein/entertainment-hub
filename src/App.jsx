import React from "react";
import Header from "./components/Header/Header";

import "./App.css";
import MainNav from "./components/MainNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@material-ui/core";
import Trending from "./Pages/Trending/Trending";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";
import Adult from "./Pages/Adult/Adult";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="app">
          <Container>
            <Routes>
              <Route path="/" element={<Trending />} exact />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/search" element={<Search />} />
              <Route path="/adult" element={<Adult />} />
            </Routes>
          </Container>
        </div>

        <MainNav />
      </BrowserRouter>
    </>
  );
};

export default App;
