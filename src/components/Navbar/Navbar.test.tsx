import { render } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('should render navbar', () => {
    const { getByText } = render(<Navbar />);
    const tooltip = getByText(/Изменить тему/i);
    expect(tooltip).toBeInTheDocument();
  });
});
