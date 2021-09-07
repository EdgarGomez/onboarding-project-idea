import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';

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
            <h2>Create Appointment</h2>

            { error ? <p className="alert-error">All fields are required.</p>     : null }

            <form
                onSubmit={submitAppointment}
            >
                <label>Pet Name</label>
                <input 
                    type="text"
                    name="pet"
                    className="u-full-width"
                    placeholder="Pet Name"
                    onChange={updateState}
                    value={pet}
                />

                <label>Owner Name</label>
                <input 
                    type="text"
                    name="owner"
                    className="u-full-width"
                    placeholder="Owner Name"
                    onChange={updateState}
                    value={owner}
                />

                <label>Date</label>
                <input 
                    type="date"
                    name="date"
                    className="u-full-width"
                    onChange={updateState}
                    value={date}
                />

                <label>Time</label>
                <input 
                    type="time"
                    name="time"
                    className="u-full-width"
                    onChange={updateState}
                    value={time}
                />

                <label>Symptom</label>
                <textarea
                    className="u-full-width"
                    name="symptom"
                    onChange={updateState}
                    value={symptom}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Add Appointment</button>
            </form>
        </Fragment>
    );
}
 
export default Form;