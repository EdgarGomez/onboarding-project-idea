import React from 'react';
import { H1Title, H2Title } from './components/StyledComponents';
import Form from './components/Form';
import Appointment from './components/Appointment';
import {Appointment as AppointmentInterface} from './interfaces/interfaces';
import { gql, useQuery } from '@apollo/client';

const APPOINTMENTS = gql`
{
  allAppointments {
    id,
    pet,
    owner,
    date,
    time,
    symptom
  }
}
`;

export const App = () => {
  const { data, loading, error } = useQuery(APPOINTMENTS, {
    pollInterval: 500,
  });

  if (loading) return <H1Title>Loading...</H1Title>;
  if (error) return <pre>{error.message}</pre>

  const allAppointments:AppointmentInterface[]  = data.allAppointments;

  const title: string = allAppointments.length === 0 ? 'There are no appointments yet.' : 'Manage your Appointments';

  return (
    <>
      <H1Title data-testid="app-name" data-cy="title">Veterinarian appointments</H1Title>

      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Form 
              />
          </div>
          <div className="one-half column">
              <H2Title data-testid="dynamic-title">{title}</H2Title>
              {allAppointments.map(appointment => (
                <Appointment
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
