import React, { useState } from "react";
import './InterviewerList.scss';
import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  let interviewers = [];

  props.interviewers.map(interviewer => {
    interviewers.push(<InterviewerListItem 
      key={interviewer.id} 
      id={interviewer.id} 
      name={interviewer.name} 
      avatar={interviewer.avatar}
      setInterviewer={() => props.onChange(interviewer.id)}
      selected={interviewer.id === props.value}
      />)
  })

  console.log('less goooo', props.value);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
};