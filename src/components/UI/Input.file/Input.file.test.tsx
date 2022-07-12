import { render, screen } from '@testing-library/react';
import Input from './Input.file';

const handleChange = jest.fn();

describe('Input', () => {
  it('should render Input UI component', () => {
    render(<Input handleChange={handleChange} />);
    const input = screen.getByLabelText('Выберите изображение');
    expect(input).toBeInTheDocument();
  });
});
