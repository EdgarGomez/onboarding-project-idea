import React, { Fragment, useState, useEffect } from 'react';
import { H1Title, H2Title } from './components/StyledComponents';
import Form from './components/Form';
import Appointment from './components/Appointment';

function App() {

  let initialAppointments = JSON.parse(localStorage.getItem('appointments'));
  if(!initialAppointments) {
    initialAppointments = [];
  }

  const [appointments, saveAppointments] = useState(initialAppointments);

  useEffect( () => {
      let initialAppointments = JSON.parse(localStorage.getItem('appointments'));

      if(initialAppointments) {
        localStorage.setItem('appointments', JSON.stringify(appointments))
      } else {
        localStorage.setItem('appointments', JSON.stringify([]));
      }
  }, [appointments] );

  const createAppointment = appointment => {
    saveAppointments([ ...appointments, appointment ]);
  }

  const deleteAppointment = id => {
     const newAppointments = appointments.filter(appointment => appointment.id !== id );
     saveAppointments(newAppointments);
  }

  const title = appointments.length === 0 ? 'There are no appointments yet.' : 'Manage your Appointments';

  return (
    <Fragment>
      <H1Title data-testid="app-name" data-cy="title">Veterinarian appointments</H1Title>

      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Form 
                createAppointment={createAppointment}
              />
          </div>
          <div className="one-half column">
              <H2Title data-testid="dynamic-title">{title}</H2Title>
              {appointments.map(appointment => (
                <Appointment
                  key={appointment.id}
                  appointment={appointment}
                  deleteAppointment={deleteAppointment}
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
