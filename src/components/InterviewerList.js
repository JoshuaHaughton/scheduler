import React from "react";
import './InterviewerList.scss';
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;