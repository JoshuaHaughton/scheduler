import React, { Fragment } from "react";
import './styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
let message = '';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    message ='Saving...'
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
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
        key={props.key}
        id={props.id}
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirm}
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

  </article>
</>
  );
}
