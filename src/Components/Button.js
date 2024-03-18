import React from "react";
import styles from "./Button.module.scss";

export const Button = ({ value, onTipClickHandler }) => {
  return (
    <button
      className={value === "Custom" ? styles.selectedButton : styles.button}
      value={value}
      onClick={() => onTipClickHandler(value)}
    >
      {value === "Custom" ? "Custom" : `${value}%`}
    </button>
  );
};
