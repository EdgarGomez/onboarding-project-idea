import styled from 'styled-components';

const white: string = "#ffffff";
const primary: string = "#33c3f0";
const secondary: string = "#c10059";

export const H1Title = styled.h1`
    color: ${white};
    padding: 3rem 0;
    text-align: center;

    text-transform: uppercase;

    font-family: 'Staatliches', cursive;
    letter-spacing: 1px;
`;

export const H2Title = styled.h2`
    color: ${white};
    padding: 3rem 0;
    text-align: center;

    text-transform: uppercase;

    font-family: 'Staatliches', cursive;
    letter-spacing: 1px;
`;

export const AddButton = styled.button`
    color: ${white};
    background-color: ${primary};
    border-color: ${primary};
    width: 100%;
    font-size: 14px;

    :hover {
        border-color: ${white};
        background-color: #8e44ad;
        color: ${white};
    }
`;

export const DelButton = styled.button`
    background-color: ${secondary};
    margin-top: 2rem;
    color: ${white};
    width: 100%;

    :hover {
        background-color: red;
        color: ${white};
    }
`;

export const Card = styled.div`
    padding: 2rem;
    background: ${white};
    border-bottom: 1px solid #e1e1e1;
    color: black;

    :first-of-type {
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
    }

    :last-of-type {
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }

    p {
        font-weight: bold;
        margin-bottom: .8rem;

        span {
            font-weight: normal;  
        }
    }
`;

export const Alert = styled.p`
    background-color: ${white};
    color: red;
    padding: 1rem;
    font-size: 2rem;
    text-transform: uppercase;
    text-align: center;
    font-family:  'Staatliches', cursive;
`;

export const Input = styled.input`
    height: 38px;
    padding: 6px 10px;
    background-color: ${white};
    border: 1px solid #D1D1D1;
    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box;
    width: 100%;
`;

export const Label = styled.label`
    color: ${white};
    font-size: 16px;
`;

// Trying how props works in styled components
export const Link = styled.a`
    color: ${props => props.color};
    font-size: 16px;
    text-decoration: none;
    padding: 5px;

    :hover {
        background: ${white};
        color: ${primary};
    }
`;