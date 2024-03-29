import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { H2Title, AddButton, Alert, Input, Label, Link } from './StyledComponents';
import {Appointment as AppointmentInterface} from '../interfaces/interfaces';
import { gql, useMutation } from '@apollo/client';

const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($owner: String!, $pet: String!, $date: String!, $time: String!, $symptom: String!) {
    createAppointment(owner: $owner, pet: $pet, date: $date, time: $time, symptom: $symptom,) {
      id
      owner,
      pet,
      date,
      time,
      symptom
    }
  }
`;

const Form = () => {

    const [appointment, updateAppointment] = useState<AppointmentInterface>({
        pet: '',
        owner: '',
        date: '',
        time: '',
        symptom: '',
        id: ''
    });
    const [ alertError, updateError ] = useState(false)
    const [createAppointment, { loading, error }] = useMutation(CREATE_APPOINTMENT);
    if (loading) return <H2Title>Submiting...</H2Title>;
    if (error) return <H2Title>Submission error! {error.message}</H2Title>;

    const updateState = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        updateAppointment({
            ...appointment,
            [e.currentTarget.name]: e.currentTarget.value 
        })
    }

    const { pet, owner, date, time, symptom } = appointment;

    const submitAppointment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(pet.trim() === '' || owner.trim() === ''  || date.trim() === ''  || time.trim() === ''  || symptom.trim() === '' ){
            updateError(true);
            return;
        }

        updateError(false);

        appointment.id = uuidv4();
        createAppointment({ variables: { id: appointment.id, owner: appointment.owner, pet: appointment.pet, date: appointment.date, time: appointment.time, symptom: appointment.symptom } });

        updateAppointment({
            pet: '',
            owner: '',
            date: '',
            time: '',
            symptom: '',
            id: ''
        })
    }

    return ( 
        <>
            <H2Title data-testid="title">Create Appointment</H2Title>

            { alertError ? <Alert data-testid="alert">All fields are required.</Alert> : null }

            <form
                data-cy="form-appointments"
                onSubmit={submitAppointment}
            >
                <Label>Pet Name</Label>
                <Input 
                    data-cy="pet-input"
                    data-testid="pet"
                    type="text"
                    name="pet"
                    placeholder="Pet Name"
                    onChange={(e) => updateState(e)}
                    value={pet}
                />

                <Label>Owner Name</Label>
                <Input 
                    data-cy="owner-input"
                    data-testid="owner"
                    type="text"
                    name="owner"
                    placeholder="Owner Name"
                    onChange={(e) => updateState(e)}
                    value={owner}
                />

                <Label>Date</Label>
                <Input 
                    data-cy="date-input"
                    data-testid="date"
                    type="date"
                    name="date"
                    onChange={(e) => updateState(e)}
                    value={date}
                />

                <Label>Time</Label>
                <Input 
                    data-cy="time-input"
                    data-testid="time"
                    type="time"
                    name="time"
                    onChange={(e) => updateState(e)}
                    value={time}
                />

                <Label>Symptom</Label>
                <textarea
                    data-cy="symptom-input"
                    data-testid="symptom"
                    className="u-full-width"
                    name="symptom"
                    onChange={(e) => updateState(e)}
                    value={symptom}
                ></textarea>

                <AddButton
                    data-testid="btn-submit"
                    type="submit"
                    className=""
                >Add Appointment</AddButton>

                <Link color="white" data-cy="vet-link" target="_blank" href="http://web.applapobla.es/stores/s/232/clinica-veterinaria-poblavet?lang=es">More vet options</Link>
            </form>
        </>
    );
}
 
export default Form;