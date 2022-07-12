import './tests/matchMedia.mock';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render input image container', () => {
    const { getByText } = render(<App />);
    const button = getByText(/Выберите изображение/i);
    expect(button).toBeInTheDocument();
  });
  it('should render output container', () => {
    const { getByText } = render(<App />);
    const text = getByText(
      /Здесь будет результат конвертации из рукописного текста в печатный/i
    );
    expect(text).toBeInTheDocument();
  });
});
