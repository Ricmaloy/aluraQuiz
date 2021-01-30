/* eslint-disable linebreak-style */
import React from 'react';
import styled from 'styled-components';

const CountContainer = styled.div`
    text-align: center;

  &::before {
    font: 800 20px system-ui;
    content: counter(count);
    animation: counter 5s ;
  }

`;

export default function Counter() {
  return (
    <CountContainer> %</CountContainer>
  );
}
