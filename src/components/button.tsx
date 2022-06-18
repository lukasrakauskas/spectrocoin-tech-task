import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #f5f5f5;

  &:hover {
    background-color: #e5e5e5;
  }

  svg {
    width: 1.5rem;
  }
`;
