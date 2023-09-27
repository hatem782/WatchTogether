import React, { useEffect, useState } from "react";
import styles from "./OneVideo.module.scss";

import ReactPlayer from "react-player";

import play_icon from "../../assets/svgs/play.svg";
import pause_icon from "../../assets/svgs/pause.svg";
import { useParams } from "react-router-dom";
import { fakeData } from "./fake.js";

function OneVideo({ datas }) {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });
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

  const togglePlay = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  };

  const params = useParams();

  useEffect(() => {
    if (datas) {
      console.log(datas);
      console.log(params.id);
      const item = datas.find((item) => item.id === Number(params.id));
      setItemG(item);
    }
  }, [params, datas]);

  const onProgress = (e) => {
    let hour = Math.floor(e.playedSeconds / 3600);
    let minute = Math.floor(e.playedSeconds / 60);
    let second = Math.floor(e.playedSeconds % 60);
    setTime({ hour, minute, second });
  };

  const time_fixer = (val) => {
    if (val < 10) {
      return `0${val}`;
    }
    return val;
  };

  return (
    <div className={styles.main}>
      <h1>{itemG.title}</h1>

      <div className={styles.movie}>
        <div className={styles.video}>
          <ReactPlayer
            className={styles.react_player}
            url={itemG.video}
            playing={playing}
            controls
            width="100%"
            height="100%"
            onProgress={onProgress}
          />
        </div>
        <div className={styles.controller}>
          <img
            src={playing ? pause_icon : play_icon}
            alt=""
            onClick={togglePlay}
          />

          <div className={styles.current}>
            <span>
              {time_fixer(time.hour)}:{time_fixer(time.minute)}:
              {time_fixer(time.second)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneVideo;
