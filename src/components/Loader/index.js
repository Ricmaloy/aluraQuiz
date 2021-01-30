/* eslint-disable linebreak-style */
import React from 'react';
import styled from 'styled-components';

import LightSaber from '../LightSaber';

const LoaderContainer = styled.div`
  display: flex;
`;

const LightBlade = styled.div`
  width: 80%;
  height: 10px;

  margin-top: 16%;
  background-color: red;

  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  box-shadow: 1px 0px 20px 0px #f00;

  animation: SaberShadow 2s linear infinite,
              SaberLoad 5s linear;
`;

export default function Loader() {
  return (
    <LoaderContainer>
      <LightSaber />
      <LightBlade />
    </LoaderContainer>
  );
}
