import { render, screen } from '@testing-library/react';
import TypeWriter from '../../Hooks/useTypingEffect';

jest.mock('react-simple-typewriter', () => ({
  useTypewriter: () => ['Hi!'],
  Cursor: () => <span>_</span>,
}));

describe('TypeWriter Component', () => {
  test('should render typewriter text and cursor', () => {
    render(<TypeWriter />);
    expect(screen.getByText('Hi!')).toBeInTheDocument();
    expect(screen.getByText('_')).toBeInTheDocument();
  });
});