import React, { useEffect, useState } from "react";
import styles from "./OneVideo.module.scss";

import ReactPlayer from "react-player";

import play_icon from "../../assets/svgs/play.svg";
import pause_icon from "../../assets/svgs/pause.svg";
import { useParams } from "react-router-dom";
import { firestore } from "../../config/firebase.config";

function OneVideo({ datas }) {
  const [time, setTime] = useState(0);
  const [itemG, setItemG] = useState({
    id: 1,
    img: "",
    title: "",
    duration: "",
    watched: "",
    video: "https://hatembenechikh100.wistia.com/medias/izjz1tewm8",
    pausing: false,
    goto: "",
    is_going_to: false,
  });

  const togglePlay = async () => {
    let pausing = !itemG.pausing;
    const res = await firestore
      .collection("movies")
      .doc(itemG.id)
      .set({ ...itemG, pausing: pausing });
    console.log(res);
    // .update({ pausing: !pausing });
  };

  const params = useParams();

  useEffect(() => {
    if (datas && datas.length > 0) {
      const item = datas.find((item) => item.id === params.id);
      setItemG(item);
    }
  }, [params, datas]);

  const onProgress = (e) => {
    setTime(e.playedSeconds);
  };

  const time_fixer = (val) => {
    if (val < 10) {
      return `0${val}`;
    }
    return val;
  };

  const TextTime = () => {
    let hour = Math.floor(time / 3600);
    let minute = Math.floor(time / 60);
    let second = Math.floor(time % 60);

    return `${time_fixer(hour)}:${time_fixer(minute)}:${time_fixer(second)}`;
  };

  return (
    <div className={styles.main}>
      <h1>{itemG.title}</h1>

      <div className={styles.movie}>
        <div className={styles.video}>
          <ReactPlayer
            className={styles.react_player}
            url={itemG.video}
            playing={!itemG.pausing}
            controls
            width="100%"
            height="100%"
            autoplay={false}
            onProgress={onProgress}
          />
        </div>
        <div className={styles.controller}>
          <img
            src={itemG.pausing ? pause_icon : play_icon}
            alt=""
            onClick={togglePlay}
          />

          <div className={styles.current}>
            <span>{TextTime()}</span>

            <span className={styles.push}>Push My Time</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneVideo;
