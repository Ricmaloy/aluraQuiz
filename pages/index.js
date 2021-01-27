import React, { useState } from 'react';
import styled from 'styled-components';

import { useRouter } from 'next/router';

import db from '../db.json';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
// import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export const QuizNameInput = styled.input`
  width: 100%;

  font-size: 14px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;

  color: #000;

  padding: 10px 15px;
  border-radius: 5px;
  border-color: #DADADA;

  &:focus {
    outline: none;

    color: #000;
  }
`;

export const QuizNameButton = styled.button`
  width: 100%;

  padding: 10px 16px;
  margin-top: 20px;

  color: #fff;
  background-color: #29b6f6;
  text-align: center;
  font-family: Lato;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 1.25px;
`;

export default function Home() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>The CSS is Awesome</h1>
            </Widget.Header>
            <Widget.Content>
              <p>Teste seus conhecimentos em CSS e veja quantos layouts você consegue quebrar</p>
              <form onSubmit={function (infosDoEvento) {
                infosDoEvento.preventDefault();
                router.push(`/quiz?name=${playerName}`);
              }}
              >
                <QuizNameInput
                  placeholder="Me fala seu nome"
                  onChange={(info) => {
                    setPlayerName(info.target.value);
                  }}
                />
                <QuizNameButton type="submit" disabled={playerName.length === 0}>
                  Jogar
                </QuizNameButton>
              </form>
            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Header>
              <h1>Quiz da galera</h1>
            </Widget.Header>
            <Widget.Content>
              <p>Lorem ipsum</p>
            </Widget.Content>
          </Widget>
          {/* <Footer /> */}
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/Ricmaloy" />
      </QuizBackground>
    </>
  );
}
