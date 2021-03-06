import { useState, useEffect } from "react";

import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {},
  });



  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);


  // Allows to change local state when booking an interview
  function bookInterview(id, interview) {

    // Update spots remaining only if creating new appointment
    if (!state.appointments[id].interview) {
      state.days.filter(day => day.name === state.day)[0].spots--;
    }
    const days = {
      ...state.days,
    }

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
          ...days
        }));
      });
  }

  // Delete an appointment
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Update spots remaining when deleting an appointment
    state.days.filter(day => day.name === state.day)[0].spots++;
    const days = {
      ...state.days,
    }

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState((prev) => ({
          ...prev,
          appointments,
          ...days
        }));
      })
  }

  return { state, setDay, bookInterview, cancelInterview };
}