import { render, screen, fireEvent } from '@testing-library/react';
import { describe, vi } from 'vitest';
import { CurrencySelect } from '../currency-select';
import { Currency } from '../types';

describe('CurrencySelect', () => {
  it('should render correctly', async () => {
    render(
      <CurrencySelect
        selectedCurrency=""
        handleAddCurrency={() => {}}
        handleSelectCurrency={() => {}}
        notSelectedCurrencies={[Currency.EUR, Currency.USD]}
      />,
    );

    expect(screen.getByTestId('select')).toBeInTheDocument();
    expect(screen.queryByText(Currency.EUR)).toBeInTheDocument();
    expect(screen.queryByText(Currency.USD)).toBeInTheDocument();
    expect(screen.queryByText(Currency.GBP)).not.toBeInTheDocument();
  });

  it('should handle currency selection', async () => {
    const handleSelectCurrency = vi.fn();
    render(
      <CurrencySelect
        selectedCurrency=""
        handleAddCurrency={() => {}}
        handleSelectCurrency={handleSelectCurrency}
        notSelectedCurrencies={[Currency.EUR, Currency.USD]}
      />,
    );

    const select = screen.getByTestId('select');
    fireEvent.change(select, { target: { value: Currency.EUR } });

    expect(handleSelectCurrency).toHaveBeenCalledWith(Currency.EUR);
  });

  it('should handle currency addition', async () => {
    const handleAddCurrency = vi.fn();
    render(
      <CurrencySelect
        selectedCurrency=""
        handleAddCurrency={handleAddCurrency}
        handleSelectCurrency={() => {}}
        notSelectedCurrencies={[Currency.EUR, Currency.USD]}
      />,
    );

    const add = screen.getByTestId('add');
    fireEvent.click(add);

    expect(handleAddCurrency).toHaveBeenCalled();
  });
});
