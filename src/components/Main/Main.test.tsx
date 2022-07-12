import { render } from '@testing-library/react';
import Main from './Main';

describe('Main', () => {
  it('should render Main component', () => {
    const { getByText } = render(<Main theme={'light'} />);
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
