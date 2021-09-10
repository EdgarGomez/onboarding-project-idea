import React from 'react';
import { DelButton, Card } from './StyledComponents';

interface Props {
    appointment: any,
    deleteAppointment: any,
}

const Appointment = ({appointment, deleteAppointment}: Props) => ( 
    <Card data-testid="appointment">
        <p>Pet: <span>{appointment.pet}</span> </p>
        <p>Owner: <span>{appointment.owner}</span> </p>
        <p>Date: <span>{appointment.date}</span> </p>
        <p>Time: <span>{appointment.time}</span> </p>
        <p>Symptom: <span>{appointment.symptom}</span> </p>

        <DelButton
            className="button"
            onClick={ () => deleteAppointment(appointment.id)  }
            data-testid="btn-delete"
        >Delete &times;</DelButton>

    </Card>
);
 
export default Appointment;