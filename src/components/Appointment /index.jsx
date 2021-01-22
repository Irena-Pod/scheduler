import React from "react";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";
import Header from "components/Appointment /Header";
import Form from "components/Appointment /Form";
import Show from "components/Appointment /Show";
import Empty from "components/Appointment /Empty";
import Status from "components/Appointment /Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    //setTimeout is set to illustrate the saving indicator
    setTimeout(function () {
      props.bookInterview(props.id, interview);
      transition(SHOW);
    }, 1000);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form
          onSave={save}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
        />
      )}
    </article>
  );
}
