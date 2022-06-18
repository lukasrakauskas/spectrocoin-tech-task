import { formatCurrency } from 'utils/formatter';
import styled from 'styled-components';
import { Button } from 'components/button';
import { Currency } from './types';
import { RatesByCurrency } from './use-rates';
import { FC } from 'react';

interface Props {
  currencies: Currency[];
  rateByCurrency: RatesByCurrency;
  value: number | '';
  onClickRemove: (currency: Currency) => void;
}

export const CurrencyList: FC<Props> = ({
  currencies,
  rateByCurrency,
  value,
  onClickRemove,
}) => (
  <>
    {currencies.map(currency => {
      const rates = rateByCurrency[currency];

      let formattedAmount = 'Loading...';

      if (rates) {
        const rate = rates?.last ?? 0;
        const amount = (value || 0) * rate;
        formattedAmount = formatCurrency(amount, currency);
      }

      return (
        <ConvertedCurrency key={currency}>
          <CurrencyLabel>{currency} </CurrencyLabel>
          <LightText>{formattedAmount}</LightText>
          <Button onClick={() => onClickRemove(currency)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </ConvertedCurrency>
      );
    })}
  </>
);

const ConvertedCurrency = styled.div`
  display: grid;
  grid-template-columns: min-content 3fr min-content;
  align-items: center;
  padding: 1rem;
  font-size: 2rem;
  border-bottom: 1px solid #f5f5f5;

  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const CurrencyLabel = styled.span`
  margin-right: 1.5rem;
`;

const LightText = styled.span`
  font-weight: lighter;
`;
