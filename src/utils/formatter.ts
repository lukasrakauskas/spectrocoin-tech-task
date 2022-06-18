import { Currency } from 'features/converter/types';

const createFormatter = (currency: Currency) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });

const formatters = Object.values(Currency).reduce(
  (acc, currency) => ({
    ...acc,
    [currency]: createFormatter(currency),
  }),
  {} as Record<Currency, Intl.NumberFormat>,
);

export const formatCurrency = (value: number, currency: Currency) => {
  return formatters[currency].format(value);
};
