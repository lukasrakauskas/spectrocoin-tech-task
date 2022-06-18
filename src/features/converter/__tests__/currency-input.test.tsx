import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CurrencyInput } from '../currency-input';

describe('CurrencyInput', () => {
  it('should render correctly', async () => {
    render(<CurrencyInput value={''} onChange={vi.fn()} />);

    const input = screen.getByTestId('input');
    const label = screen.getByText('BTC');
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('should render correct value', async () => {
    render(<CurrencyInput value={0.001} onChange={vi.fn()} />);

    const input = screen.getByTestId('input');
    expect(input).toHaveValue(0.001);
  });

  it('should change value', async () => {
    const onChange = vi.fn();
    render(<CurrencyInput value={''} onChange={onChange} />);

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: '1' } });

    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('should handle non number values', async () => {
    const onChange = vi.fn();
    render(<CurrencyInput value={''} onChange={onChange} />);

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'a' } });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should handle empty values', async () => {
    const onChange = vi.fn();
    render(<CurrencyInput value={1} onChange={onChange} />);

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.change(input, { target: { value: '' } });

    expect(onChange).toHaveBeenCalledWith('');
  });
});
