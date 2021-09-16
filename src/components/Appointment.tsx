import React from 'react';
import { DelButton, Card } from './StyledComponents';
import {Appointment as AppointmentInterface} from '../interfaces/interfaces';
import { H2Title } from './StyledComponents';
import { gql, useMutation } from '@apollo/client';

interface Props {
    appointment: AppointmentInterface,
}

const REMOVE_APPOINTMENT = gql`
  mutation deleteAppointmen($id: ID!) {
    removeAppointment(id: $id) {
      owner
    }
  }
`;

const Appointment = ({appointment}: Props) => { 

    const [removeAppointment, { loading, error }] = useMutation(REMOVE_APPOINTMENT);
    if (loading) return <H2Title>Submiting...</H2Title>;
    if (error) return <H2Title>Submission error! {error.message}</H2Title>;

    return (
    <Card data-testid="appointment">
        <p>Pet: <span>{appointment.pet}</span> </p>
        <p>Owner: <span>{appointment.owner}</span> </p>
        <p>Date: <span>{appointment.date}</span> </p>
        <p>Time: <span>{appointment.time}</span> </p>
        <p>Symptom: <span>{appointment.symptom}</span> </p>

        <DelButton
            className="button"
            onClick={ () => removeAppointment({ variables: { id: appointment.id } })}
            data-testid="btn-delete"
        >Delete &times;</DelButton>

    </Card>
)};
 
export default Appointment;