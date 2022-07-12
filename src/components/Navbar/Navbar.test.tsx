import { render } from '@testing-library/react';
import Navbar from './Navbar';

const swithcThemeMock = jest.fn();

describe('Navbar', () => {
  it('should render navbar', () => {
    const { getByText } = render(
      <Navbar switchTheme={swithcThemeMock} theme={'light'} />
    );
    const tooltip = getByText(/Изменить тему/i);
    expect(tooltip).toBeInTheDocument();
  });
});
