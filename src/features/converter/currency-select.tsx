import { FC } from 'react';
import styled from 'styled-components';
import { Button } from 'components/button';
import { Currency } from './types';

interface Props {
  selectedCurrency: Currency | '';
  handleAddCurrency: () => void;
  handleSelectCurrency: (currency: Currency) => void;
  notSelectedCurrencies: Currency[];
}

export const CurrencySelect: FC<Props> = ({
  selectedCurrency,
  handleAddCurrency,
  handleSelectCurrency,
  notSelectedCurrencies,
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleSelectCurrency(event.target.value as Currency);
  };

  return (
    <Wrapper>
      <Select
        name="currencies"
        value={selectedCurrency}
        onChange={handleSelect}
        data-testid="select"
      >
        <option disabled value="">
          Add currency
        </option>
        {notSelectedCurrencies.map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </Select>
      <Button onClick={handleAddCurrency} data-testid="add">
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  align-items: center;
  padding: 1rem;
  font-size: 1rem;
  border-bottom: 1px solid #f5f5f5;
`;

const Select = styled.select`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  font-weight: lighter;
  border: none;
  border-bottom: 1px solid #666;
  padding: 0.5rem;
  margin-right: 1rem;
`;
