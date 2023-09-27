import "./App.scss";
import React from "react";
import { firestore } from "./config/firebase.config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Navbar from "./layouts/Navbar/Navbar";
import Home from "./pages/Home/Home";

import OneVideo from "./pages/OneVideo/OneVideo";

import { Navigate, Route, Routes } from "react-router-dom";
import AddMovie from "./pages/AddMovie/AddMovie";

function App() {
  const movies = firestore.collection("movies");
  const [movies_datas] = useCollectionData(movies, { idField: "id" });
  console.log(movies_datas);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home datas={movies_datas} />} />
        <Route
          path="/play/:name/:id"
          element={<OneVideo datas={movies_datas} />}
        />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
