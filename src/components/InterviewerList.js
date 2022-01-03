import React from "react";
import './InterviewerList.scss';
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";

let propInterviewerId = null;


function InterviewerList(props) {
  let interviewers = [];
  

  props.interviewers.map(interviewer => {
    props.value ? propInterviewerId = props.value.id : propInterviewerId = null;

    interviewers.push(<InterviewerListItem 
      key={interviewer.id} 
      id={interviewer.id} 
      name={interviewer.name} 
      avatar={interviewer.avatar}
      setInterviewer={() => props.onChange(interviewer)}
      selected={interviewer.id === propInterviewerId}
      />)
      return interviewers;
  })


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