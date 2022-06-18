import useSWR from 'swr';
import { Currency } from 'features/converter/types';
import { useMemo } from 'react';
import { BASE_URL } from 'utils/constants';

const ONE_MINUTE = 60 * 1000;

const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(res => res.json());

export interface Rates<Currency> {
  currencyFrom: string;
  currencyFromScale: number;
  currencyTo: Currency;
  currencyToScale: number;
  last: number;
  lastHP: number;
  timestamp: number;
  friendlyLast: string;
}

export type RatesByCurrency = Partial<Record<Currency, Rates<Currency>>>;

export const useRate = (currency: Currency) => {
  return useSWR<Rates<Currency>>(
    `${BASE_URL}/scapi/ticker/${currency}/BTC`,
    fetcher,
    {
      refreshInterval: ONE_MINUTE,
      revalidateOnFocus: false,
    },
  );
};

export const useRates = () => {
  const { data: eurRates } = useRate(Currency.EUR);
  const { data: usdRates } = useRate(Currency.USD);
  const { data: gbpRates } = useRate(Currency.GBP);

  const rateByCurrency: RatesByCurrency = useMemo(
    () => ({
      [Currency.EUR]: eurRates,
      [Currency.USD]: usdRates,
      [Currency.GBP]: gbpRates,
    }),
    [eurRates, usdRates, gbpRates],
  );

  return rateByCurrency;
};
