import React from "react";
import styles from "./Button.module.scss";

export const Button = ({ value, onTipClickHandler, isSelected, id }) => {
  return (
    <button
      className={
        value === "Custom" || isSelected ? styles.selectedButton : styles.button
      }
      value={value}
      onClick={() => onTipClickHandler(value, id)}
    >
      {value === "Custom" ? "Custom" : `${value}%`}
    </button>
  );
};
