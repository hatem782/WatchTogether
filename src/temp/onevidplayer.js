import React, { useState } from "react";
import ReactPlayer from "react-player";

function Home() {
  return (
    <div>
      <div>
        <button onClick={togglePlay}>{playing ? "Pause" : "Play"}</button>
      </div>
    </div>
  );
}

export default Home;
