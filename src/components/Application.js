import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./Application.scss";
import DayList from "./DayList";
import Appointment from 'components/Appointment';
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";

function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
    
  
  const appArray = dailyAppointments.map(app => {
    const interview = getInterview(state, app.interview);

      return <Appointment 
      {...app} 
      key={app.id}
      id={app.id}
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      state={state}
      />
});



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appArray}
      </section>
    </main>
  );
}
export default Application;