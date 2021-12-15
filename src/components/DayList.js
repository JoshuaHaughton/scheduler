import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  console.log(props.days);
  let out = props.days.map(day => {
    return (<DayListItem 
      key={day.id} 
      name={day.name} 
      spots={day.spots} 
      // spots={props.days[Number(day.id) -1].spots} 
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