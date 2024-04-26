import React from "react";
import st from "./styles.module.scss";
import { cn } from "../../utils/cn";

function Button({
  children = "Button",
  onClick = () => {},
  className = "",
  style = {},
}) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={cn([st.button, className])}
    >
      {children}
    </button>
  );
}

export default Button;
