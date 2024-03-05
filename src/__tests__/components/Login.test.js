import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../../components/Login/Login';
import '@testing-library/jest-dom';


global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ success: true }),
        ok: true,
    })
);

beforeEach(() => {
    fetch.mockClear();
});

describe('Login Component', () => {
    test('should update email and password on change event', () => {
        render(<Router><Login /></Router>);
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        expect(emailInput.value).toBe('test@test.com');
        expect(passwordInput.value).toBe('password');
    });
    
});