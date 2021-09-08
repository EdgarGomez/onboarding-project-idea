import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testing the App', () => {

    test('<App /> The applications works well the first time.', () => {
        render(<App />);
        expect(screen.getByText('Veterinarian appointments')).toBeInTheDocument();
        expect(screen.getByTestId('app-name').textContent).toBe('Veterinarian appointments');
        expect(screen.getByTestId('app-name').tagName).toBe('H1');

        expect(screen.getByText('Create Appointment')).toBeInTheDocument();
        expect(screen.getByText('There are no appointments yet.')).toBeInTheDocument();
    })

    test('<App /> Check dynamic title.', () => {
        render(<App />);
        userEvent.type(screen.getByTestId('pet'), 'Flash');
        userEvent.type(screen.getByTestId('owner'), 'Edgar');
        userEvent.type(screen.getByTestId('date'), '2021-12-10');
        userEvent.type(screen.getByTestId('time'), '10:30');
        userEvent.type(screen.getByTestId('symptom'), 'Barks but is a cat.');

        const btnSubmit = screen.getByTestId('btn-submit');
        //fireEvent.click(btnSubmit);
        userEvent.click(btnSubmit);

        // using query because maybe exists the alert maybe not, with get inside a conditional rendering will pop an error.
        const alert = screen.queryByTestId('alert');
        expect(alert).not.toBeInTheDocument();

        // Check dynamic title
        expect(screen.getByTestId('dynamic-title').textContent).toBe('Manage your Appointments');
        expect(screen.getByTestId('dynamic-title').textContent).not.toBe('There are no appointments yet.');

    })

    test('<App /> Verify appointments in the DOM', async () => {
        render(<App/>);

        // All "find",or most of them, are synchronous
        const appointments = await screen.findAllByTestId('appointment');

        console.log(appointments.toString());
        // Snapshot creates a file so we can verify its content
        expect(appointments).toMatchSnapshot();

        expect(screen.getByTestId('btn-delete').tagName).toBe('BUTTON');
        expect(screen.getByTestId('btn-delete')).toBeInTheDocument();

        // Verify appointment
        expect(screen.getByText('Flash')).toBeInTheDocument();
    })

    test('<App /> Delete appointment', () => {
        render(<App/>);

        const btnDelete = screen.getByTestId('btn-delete');
        expect(btnDelete.tagName).toBe('BUTTON');
        expect(btnDelete).toBeInTheDocument();

        // Trigger click
        userEvent.click(btnDelete);

        // Button must be already gone
        expect(btnDelete).not.toBeInTheDocument();
        // Appointment must be already gone
        expect(screen.queryByText('Flash')).not.toBeInTheDocument();
        expect(screen.queryByTestId('appointment')).not.toBeInTheDocument();
    })

})