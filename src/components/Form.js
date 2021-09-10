import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import { H2Title, AddButton, Alert, Input, Label, Link } from './StyledComponents';

const Form = ({createAppointment}) => {

    const [appointment, updateAppointment] = useState({
        pet: '',
        owner: '',
        date: '',
        time: '',
        symptom: ''
    });
    const [ error, updateError ] = useState(false)

    const updateState = e => {
        updateAppointment({
            ...appointment,
            [e.target.name]: e.target.value 
        })
    }

    const { pet, owner, date, time, symptom } = appointment;

    const submitAppointment = e => {
        e.preventDefault();

        if(pet.trim() === '' || owner.trim() === ''  || date.trim() === ''  || time.trim() === ''  || symptom.trim() === '' ){
            updateError(true);
            return;
        }

        updateError(false);

        appointment.id = uuid();

        console.log(appointment);

        createAppointment(appointment);

        updateAppointment({
            pet: '',
            owner: '',
            date: '',
            time: '',
            symptom: ''
        })
    }

    return ( 
        <Fragment>
            <H2Title data-testid="title">Create Appointment</H2Title>

            { error ? <Alert data-testid="alert">All fields are required.</Alert> : null }

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
                    onChange={updateState}
                    value={pet}
                />

                <Label>Owner Name</Label>
                <Input 
                    data-cy="owner-input"
                    data-testid="owner"
                    type="text"
                    name="owner"
                    placeholder="Owner Name"
                    onChange={updateState}
                    value={owner}
                />

                <Label>Date</Label>
                <Input 
                    data-cy="date-input"
                    data-testid="date"
                    type="date"
                    name="date"
                    onChange={updateState}
                    value={date}
                />

                <Label>Time</Label>
                <Input 
                    data-cy="time-input"
                    data-testid="time"
                    type="time"
                    name="time"
                    onChange={updateState}
                    value={time}
                />

                <Label>Symptom</Label>
                <textarea
                    data-cy="symptom-input"
                    data-testid="symptom"
                    className="u-full-width"
                    name="symptom"
                    onChange={updateState}
                    value={symptom}
                ></textarea>

                <AddButton
                    data-testid="btn-submit"
                    type="submit"
                    className=""
                >Add Appointment</AddButton>

                <Link color="white" data-cy="vet-link" target="_blank" href="http://web.applapobla.es/stores/s/232/clinica-veterinaria-poblavet?lang=es">More vet options</Link>
            </form>
        </Fragment>
    );
}
 
export default Form;