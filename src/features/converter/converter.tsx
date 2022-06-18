import { formatCurrency } from 'utils/formatter';
import { useState } from 'react';
import styled from 'styled-components';
import { Currency } from 'features/converter/types';
import { useRates } from 'features/converter/use-rates';
import { CurrencyInput } from './currency-input';
import { CurrencySelect } from './currency-select';
import { CurrencyList } from './currency-list';

export const Converter = () => {
  const rateByCurrency = useRates();

  const [btc, setBtc] = useState<number | ''>(0.001);
  const [currencies, setCurrencies] = useState<Currency[]>([Currency.EUR]);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | ''>('');

  const handleRemoveCurrency = (currency: Currency) => {
    setCurrencies(currencies.filter(c => c !== currency));
  };

  const handleAddCurrency = () => {
    if (selectedCurrency) {
      setCurrencies([...currencies, selectedCurrency]);
      setSelectedCurrency('');
    }
  };

  const handleSelectCurrency: React.ChangeEventHandler<
    HTMLSelectElement
  > = event => {
    setSelectedCurrency(event.target.value as Currency);
  };

  const notSelectedCurrencies = Object.values(Currency).filter(
    c => !currencies.includes(c),
  );

  return (
    <Wrapper>
      <Container>
        <CurrencyInput value={btc} onChange={setBtc} />
        <CurrencySelect
          selectedCurrency={selectedCurrency}
          handleAddCurrency={handleAddCurrency}
          handleSelectCurrency={handleSelectCurrency}
          notSelectedCurrencies={notSelectedCurrencies}
        />
        <CurrencyList
          value={btc}
          currencies={currencies}
          rateByCurrency={rateByCurrency}
          onClickRemove={handleRemoveCurrency}
        />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #fdfdfd;

  @media (min-width: 450px) {
    justify-content: center;
    align-items: center;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  background-color: #ffffff;

  @media (min-width: 450px) {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 20px;
    border-radius: 15px;
    margin: 1.5rem auto;
    min-height: 450px;
  }
`;
