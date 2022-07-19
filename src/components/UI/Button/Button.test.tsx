import { render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('should render Button UI Component', () => {
    const { getByText } = render(<Button />);
    const button = getByText(/button/i);
    expect(button).toBeInTheDocument();
  });
});
