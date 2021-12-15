import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';


export default function Form(props) {
  const [student, setStudent] = useState(props.student /*props.name test?*/|| "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const oninput = (event) => {
    if (event.target.value === '') {
      setStudent('');
    } else {
      setStudent(event.target.value);
    }
  };

  const reset = () => {
    setInterviewer('');
    setStudent('');
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  function validate() {
    if (!props.name) {
      setError("student name cannot be blank");
      return;
    }
    if (props.onSave) {
      props.onSave(props.name, interviewer);
    };
    
  }
  

  console.log('student, interviewer: ', student, interviewer); 
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={props.name ? '' : "Enter Student Name"}
            value={props.name || student /*props.name test*/}
            onChange={oninput}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}