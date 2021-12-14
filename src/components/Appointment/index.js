import React, { Fragment } from "react";
import './styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';
let message = '';
let errMessage = '';

export default function Appointment(props) {
  const { mode, transition, back, doubleBack } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    message ='Saving...'
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((error) => {
      errMessage = error.message
      transition(ERROR_SAVE, true);
    })
  }
  
  function edit() {
    // const interview = {
    //   student: name,
    //   interviewer
    // };
    transition(EDIT)
    // props.bookInterview(props.id, interview)
    // .then(() => transition(SHOW))
  }

  function confirm() {
    message = "Deleting...";
    transition(DELETING)
  }

  function del() {
    message = "Deleting...";
    transition(SAVING)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((error) => {
      errMessage = error.message
      console.log(error.message);
      transition(ERROR_DELETE, true);
    })
  }

  if(mode === CREATE) console.log('CREATE: ', props.interview)

  return (
<>
  <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

    {mode === SAVING && <Status message={message}/>}

    {mode === DELETING && <Confirm onCancel={() => transition(SHOW)} onConfirm={del} message={message}/>}

    {mode === SHOW && (
      <Show
        key={props.id}
        id={props.id}
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirm}
        onEdit={edit}
      />
    )}
    {mode === CREATE && (
      <Form
        student={''}
        interviewer={''}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
      />
    )}
    
    {mode === EDIT && (
      <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
      />
    )}

      {mode === ERROR_SAVE && (
      <Error
        onClose={() => back()}
        message={errMessage}
      />
    )}

      {mode === ERROR_DELETE && (
      <Error
        onClose={() => doubleBack()}
        message={errMessage}
      />
    )}

  </article>
</>
  );
}
