import { render, fireEvent, screen} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../../components/Login/Login';



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
    test('should handle focus event', () => {
        render(<Router><Login /></Router>);
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.focus(passwordInput);

        expect(passwordInput.getAttribute('autocomplete')).toBe('off');
        expect(passwordInput.getAttribute('name')).toMatch(/^password/);
    });

});