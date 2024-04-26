import React from "react";
import st from "./styles.module.scss";
import { cn } from "../../utils/cn";

function Input({
  label = "",
  placeholder = "",
  value = "",
  onChange = () => {},
  name = "",
  className = "",
  footer = null,
}) {
  return (
    <div className={cn([st.main, className])}>
      <label className={st.label}>{label}</label>
      <input
        className={st.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {footer}
    </div>
  );
}

export default Input;
