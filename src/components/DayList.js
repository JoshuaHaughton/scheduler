import React, { useState } from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  let out = props.days.map(day => {
    return (<DayListItem 
      key={day.id} 
      name={day.name} 
      spots={day.spots} 
      // setDay={() => props.onChange(day.name)}
      setDay={props.onChange}
      selected={day.name === props.value}
      />)
  })
  return (
    <ul>
      {out}
    </ul>
  );
}