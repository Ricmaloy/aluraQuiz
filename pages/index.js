import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

import QuizLogo from '../src/components/QuizLogo';

import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

export default function Home() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1, x: '0' },
              hidden: { opacity: 0, x: '-100%' },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Header>
              <h1>The Star Wars Master Quiz</h1>
            </Widget.Header>
            <Widget.Content>
              <p>
                Teste os seus conhecimentos sobre Star Wars e veja se
                você realmente é um verdadeiro fã!
              </p>
              <form onSubmit={(infosDoEvento) => {
                infosDoEvento.preventDefault();
                router.push(`/quiz?name=${playerName}`);
              }}
              >
                <Input
                  name="nomedousuario"
                  placeholder="Me fala seu nome"
                  onChange={(info) => { setPlayerName(info.target.value); }}
                  value={playerName}
                />
                <Button type="submit" disabled={playerName.length === 0}>
                  Jogar
                </Button>
              </form>
            </Widget.Content>
          </Widget>
          <Widget
            as={motion.section}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              show: { opacity: 1, x: '0' },
              hidden: { opacity: 0, x: '-100%' },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Header>
              <h1>Quiz da galera</h1>
            </Widget.Header>
            <Widget.Content>
              <ul>
                {db.external.map((linkExterno) => {
                  const [projectName, githubUser] = linkExterno
                    .replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.vercel.app', '')
                    .split('.');

                  return (
                    <li
                      key={linkExterno}
                    >
                      <Link
                        href={`/quiz/${projectName}___${githubUser}?name=${playerName}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Widget.Topic
                          as={Button}
                          type="button"
                          disabled={playerName.trim().length === 0}
                        >
                          {`${githubUser}/${projectName}`}
                        </Widget.Topic>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Widget.Content>
          </Widget>
          <Footer
            as={motion.footer}
            style={{ marginBottom: '25px' }}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
          />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/Ricmaloy" />
      </QuizBackground>
    </>
  );
}
