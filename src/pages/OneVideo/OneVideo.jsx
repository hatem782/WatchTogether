import React, { useEffect, useRef, useState } from "react";
import styles from "./OneVideo.module.scss";

import ReactPlayer from "react-player";

import { useParams } from "react-router-dom";
import { firestore } from "../../config/firebase.config";

function OneVideo({ datas }) {
  const [itemG, setItemG] = useState({
    id: 1,
    img: "",
    title: "",
    duration: "",
    watched: "",
    video: "https://hatembenechikh100.wistia.com/medias/izjz1tewm8",
    pausing: true,
    goto: 0,
    is_going_to: false,
  });

  const playerRef = useRef(null);
  const params = useParams();

  const Pose = async () => {
    await firestore
      .collection("movies")
      .doc(itemG.id)
      .set({ ...itemG, pausing: true });
  };

  const Play = async () => {
    await firestore
      .collection("movies")
      .doc(itemG.id)
      .set({ ...itemG, pausing: false, goto: 0 });
  };

  const handleSeek = (seek_time) => {
    firestore
      .collection("movies")
      .doc(itemG.id)
      .set({ ...itemG, goto: seek_time, pausing: true });
  };

  useEffect(() => {
    if (datas && datas.length > 0) {
      const item = datas.find((item) => item.id === params.id);
      setItemG(item);
    }
  }, [params, datas]);

  useEffect(() => {
    if (itemG.goto > 0) {
      playerRef.current.seekTo(itemG.goto, "seconds");
    }
  }, [itemG.goto]);

  return (
    <div className={styles.main}>
      <h1>{itemG.title}</h1>

      <div className={styles.movie}>
        <div className={styles.video}>
          <ReactPlayer
            ref={playerRef}
            className={styles.react_player}
            url={itemG.video}
            playing={!itemG.pausing}
            controls
            width="100%"
            height="100%"
            autoplay={false}
            onPause={Pose}
            onReady={Pose}
            onPlay={Play}
            onSeek={handleSeek}
          />
        </div>

        {/* <div className={styles.controller}>
          <img
            src={itemG.pausing ? pause_icon : play_icon}
            alt=""
            onClick={togglePlay}
          />

          <div className={styles.current}>
            <span>{TextTime()}</span>

            <span className={styles.push}>Push My Time</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default OneVideo;
