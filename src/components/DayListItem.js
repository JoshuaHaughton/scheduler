import React, { useState } from "react";
import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  

  const formatSpots = () => {
    let out = '';
     if (props.spots === 0) {
    out = `no spots remaining`
  }if (props.spots === 1) {
    out = `${props.spots} spot remaining`
  }if (props.spots > 1) {
    out = `${props.spots} spots remaining`
  }
  return out;
  }

  
 
  return (
    <li 
    onClick={() => props.setDay(props.name)}
    className={dayClass}
    selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}