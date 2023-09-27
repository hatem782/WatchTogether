import "./App.scss";
import React, { useEffect, useState } from "react";
import { firestore } from "./config/firebase.config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Navbar from "./layouts/Navbar/Navbar";
import Home from "./pages/Home/Home";

import OneVideo from "./pages/OneVideo/OneVideo";

import { Navigate, Route, Routes } from "react-router-dom";
import AddMovie from "./pages/AddMovie/AddMovie";

function App() {
  const movies = firestore.collection("movies");
  const [Movies, setMovies] = useState([]);
  const [a, b, c, snapshot] = useCollectionData(movies, {
    idField: "duration",
  });
  // console.log(movies_datas);
  // console.log(snapshot);

  useEffect(() => {
    let results = [];
    if (snapshot) {
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      console.log(results);
      setMovies(results);
    }
  }, [snapshot]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home datas={Movies} />} />
        <Route path="/play/:name/:id" element={<OneVideo datas={Movies} />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
