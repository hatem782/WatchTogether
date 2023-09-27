import React, { useState } from "react";

import { firebase, firestore } from "../../config/firebase.config";

const init = {
  img: "",
  title: "",
  duration: "",
  goto: "",
  video: "",
  watched: "Not Yet",
  pausing: false,
  is_going_to: false,
};

function AddMovie() {
  const [movie, setMovie] = useState({
    ...init,
  });

  const moviesRef = firestore.collection("movies");

  const handle_change = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handle_save = async () => {
    const movie_to_save = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      id: new Date().getTime(),
      ...movie,
    };
    await moviesRef.add(movie_to_save);
    setMovie({ ...init });
  };

  return (
    <div>
      <input name="title" onChange={handle_change} placeholder="title" />
      <br />
      <input name="img" onChange={handle_change} placeholder="img" />
      <br />
      <input name="duration" onChange={handle_change} placeholder="duration" />
      <br />
      <input name="video" onChange={handle_change} placeholder="video" />
      <br />
      <button onClick={handle_save}>Save</button>
    </div>
  );
}

export default AddMovie;
