import "./App.scss";
import React from "react";
import { firestore } from "./config/firebase.config";
import { useCollectionData } from "react-firebase-hooks/firestore";

function App() {
  const exp_ref = firestore.collection("test");
  const [datas] = useCollectionData(exp_ref, { idField: "id" });
  console.log(datas);

  return (
    <div className="App">
      {datas &&
        datas.map((data) => {
          return <p key={data.id}>{data.Name}</p>;
        })}
    </div>
  );
}

export default App;
