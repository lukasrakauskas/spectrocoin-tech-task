import { render, screen, fireEvent } from '@testing-library/react';
import { describe, vi } from 'vitest';
import { CurrencyList } from '../currency-list';
import { Currency } from '../types';
import { RatesByCurrency } from '../use-rates';

describe('CurrencyList', () => {
  it('should render correctly without rates', () => {
    render(
      <CurrencyList
        currencies={[Currency.USD]}
        rateByCurrency={{}}
        value={1}
        onClickRemove={() => {}}
      />,
    );

    expect(screen.queryByText(Currency.USD)).toBeInTheDocument();
    expect(screen.queryByText('loading', { exact: false })).toBeInTheDocument();
  });

  it('should render correctly with rates', () => {
    const rates = {
      [Currency.USD]: {
        last: 20000,
      },
      [Currency.EUR]: {
        last: 19000,
      },
      [Currency.GBP]: {
        last: 18000,
      },
    } as RatesByCurrency;

    render(
      <CurrencyList
        currencies={[Currency.USD, Currency.EUR]}
        rateByCurrency={rates}
        value={1}
        onClickRemove={() => {}}
      />,
    );

    expect(screen.queryByText(Currency.USD)).toBeInTheDocument();
    expect(screen.queryByText('$20,000.00')).toBeInTheDocument();
    expect(screen.queryByText('€19,000.00')).toBeInTheDocument();
    expect(screen.queryByText('£18,000.00')).not.toBeInTheDocument();
  });

  it('should render zero when empty value', () => {
    const rates = {
      [Currency.USD]: {
        last: 20000,
      },
    } as RatesByCurrency;
    render(
      <CurrencyList
        currencies={[Currency.USD]}
        rateByCurrency={rates}
        value={''}
        onClickRemove={() => {}}
      />,
    );

    expect(screen.queryByText('$0.00')).toBeInTheDocument();
  });

  it('should handle currency removal', () => {
    const onClickRemove = vi.fn();
    render(
      <CurrencyList
        currencies={[Currency.USD]}
        rateByCurrency={{}}
        value={1}
        onClickRemove={onClickRemove}
      />,
    );

    const remove = screen.getByTestId('remove');
    fireEvent.click(remove);

    expect(onClickRemove).toHaveBeenCalled();
  });
});
