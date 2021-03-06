import React from "react";
import PropTypes from "prop-types";

import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers } = props;

  //Props validation configuration
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired,
  };

  let parsedInterviewersList = [];

  if (Array.isArray(interviewers)) {
    parsedInterviewersList = interviewers.map((interviewer) => {
      return (
        <InterviewerListItem
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === props.interviewer}
          setInterviewer={(event) => props.setInterviewer(interviewer.id)}
        />
      );
    });
  }

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewersList}</ul>
    </section>
  );
}
