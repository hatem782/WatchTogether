import React from "react";
import styles from "./Home.module.scss";

import { useNavigate } from "react-router-dom";

function Home({ datas }) {
  const navig = useNavigate();

  const goToVideo = (item) => {
    navig(`/play/${item.title.split(" ").join("_")}/${item.id}`);
    window.location.reload();
  };

  return (
    <div className={styles.main}>
      <h1>Select A Movie To Watch</h1>

      <div className={styles.movies}>
        {datas &&
          datas.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.movie}
                onClick={() => goToVideo(item)}
              >
                <img src={item.img} className={styles.img} alt={item.title} />
                <div className={styles.content}>
                  <div className={styles.infos}>
                    <span>Duration : {item.duration}</span>
                    <span>Watched : {item.watched}</span>
                  </div>
                  <h2>{item.title}</h2>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
