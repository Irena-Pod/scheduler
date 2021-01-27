import React from "react";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";
import Header from "components/Appointment /Header";
import Form from "components/Appointment /Form";
import Show from "components/Appointment /Show";
import Empty from "components/Appointment /Empty";
import Status from "components/Appointment /Status";
import Confirm from "components/Appointment /Confirm";
import Error from "components/Appointment /Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING, true);
    //setTimeout is set to illustrate the saving indicator
    setTimeout(function () {
      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch((error) => transition(ERROR_SAVE, true));
    }, 1000);
  }

  function deleteInterview() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === ERROR_DELETE && (
        <Error message="Could not delete interview" onClose={() => back()} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save interview" onClose={() => back()} />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete this interview?"}
          onConfirm={deleteInterview}
          onCancel={() => back()}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(CREATE)}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer.id}
          onSave={save}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
        />
      )}
    </article>
  );
}
