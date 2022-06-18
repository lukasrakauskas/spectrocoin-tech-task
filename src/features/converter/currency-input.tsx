import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  value: number | '';
  onChange: (value: number | '') => void;
}

export const CurrencyInput: FC<Props> = ({ value, onChange }) => {
  return (
    <Container>
      <CurrencyLabel as="label" htmlFor="btc">
        BTC{' '}
      </CurrencyLabel>
      <Input
        type="number"
        id="btc"
        name="btc"
        value={value}
        onChange={event => {
          const value = event.target.valueAsNumber;
          onChange(isNaN(value) ? '' : value);
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  padding: 1rem;
  font-size: 2rem;
  border-bottom: 1px solid #f5f5f5;
`;

const CurrencyLabel = styled.span`
  margin-right: 1.5rem;
`;

const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: lighter;
  border: none;
  border-bottom: 1px solid #666;
  padding: 0.5rem;
  width: 100%;
`;
