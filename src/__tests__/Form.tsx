import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import Form from '../components/Form';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

const createAppointment = jest.fn();

// not necessary to cleanup in newer versions of jest
//afterEach(cleanup);

describe('This is a possible title', () => {
    test('<Form /> Load the Form and check everything is ok.', () => {
        
        //const wrapper = render(<Form />);
        
        // .debug() prints the content/html.
        //wrapper.debug();

        /* older versions without screen
        const { getByText } = render(<Form />);
        expect(getByText('Create Appointment')).toBeInTheDocument();
        */

        /* using screen */
        render(
            <Form 
                createAppointment={createAppointment}
            />
        )
        expect(screen.getByText('Create Appointment')).toBeInTheDocument();
    })

    test('<Form /> Creating a new test and using a data property.', () => {
        render(
            <Form 
                createAppointment={createAppointment}
            />
        )
        //Heading
        expect(screen.getByTestId('title').tagName).toBe('H2');
        expect(screen.getByTestId('title').tagName).not.toBe('H1');
        expect(screen.getByTestId('title').textContent).toBe('Create Appointment');
        //Button
        expect(screen.getByTestId('btn-submit').tagName).toBe('BUTTON');
        expect(screen.getByTestId('btn-submit').textContent).toBe('Add Appointment');
        expect(screen.getByTestId('btn-submit').textContent).not.toBe('Add New Appointment');
    })

    test('<Form /> Testing the submit button.', () => {
        render(
            <Form 
                createAppointment={createAppointment}
            />
        )

        // click btn
        const btnSubmit = screen.getByTestId('btn-submit');
        fireEvent.click(btnSubmit);
        // check alert
        const alert = screen.getByTestId('alert');
        expect(alert).toBeInTheDocument();
        expect((alert).textContent).toBe('All fields are required.');
        expect((alert).tagName).toBe('P');
        expect((alert).tagName).not.toBe('BUTTON');
    })

    test('<Form /> Filling the form.', () => {
        render(
            <Form 
                createAppointment={createAppointment}
            />
        )

        /* Old approach to write inputs with fireEvent (better with userEvent)
        fireEvent.change(screen.getByTestId('pet'), {
            target: { value: 'Flash'}
        })

        fireEvent.change(screen.getByTestId('owner'), {
            target: { value: 'Edgar'}
        })
        */

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

        // create appointment and check the function has been called
        expect(createAppointment).toHaveBeenCalled();
        expect(createAppointment).toHaveBeenCalledTimes(1);
    })
})