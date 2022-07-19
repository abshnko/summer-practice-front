import { render } from '@testing-library/react';
import ScanPage from './ScanPage';

describe('ScanPage', () => {
  it('should render ScanPage component', () => {
    const { getByText } = render(<ScanPage />);
    const button = getByText(/Выберите изображение/i);
    const text = getByText(/или перетащите сюда/i);
    const outputText = getByText(
      /Здесь будет результат конвертации из рукописного текста в печатный/i
    );
    expect(button).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(outputText).toBeInTheDocument();
  });
});
