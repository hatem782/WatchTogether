import React, { useState } from "react";

import { firebase, firestore } from "../../config/firebase.config";
import Input from "../../components/input/Input";
import st from "./styles.module.scss";
import Button from "../../components/Buttons/Button";

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
    if (!movie.title) {
      alert("Please provide a title");
      return;
    }

    if (!movie.img) {
      alert("Please provide an image url");
      return;
    }

    if (!movie.duration) {
      alert("Please provide a duration");
      return;
    }

    if (
      !movie.video.includes("wistia.com") &&
      !movie.video.includes("youtube.com")
    ) {
      alert("Please provide a valid wistia or youtube video url");
      return;
    }

    const movie_to_save = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      id: new Date().getTime(),
      ...movie,
    };
    await moviesRef.add(movie_to_save);
    setMovie({ ...init });
  };

  return (
    <div className={st.main}>
      <div className={st.form}>
        <Input
          name="title"
          label="Movie/Episode Title"
          onChange={handle_change}
          placeholder="title"
          value={movie.title}
        />
        <br />
        <Input
          label="Movie/Episode Image Url"
          name="img"
          onChange={handle_change}
          placeholder="img"
          value={movie.img}
        />
        <br />
        <Input
          label="Duration"
          name="duration"
          onChange={handle_change}
          placeholder="duration"
          value={movie.duration}
        />
        <br />
        <Input
          label="Video Url (provide a wistia url)"
          name="video"
          onChange={handle_change}
          placeholder="video"
          value={movie.video}
          footer={
            <a
              href="https://wistia.com/"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "white",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Click here to get a wistia url
            </a>
          }
        />
        <br />
        <Button className={st.save} onClick={handle_save}>
          Add Movie/Episode
        </Button>
      </div>
    </div>
  );
}

export default AddMovie;
