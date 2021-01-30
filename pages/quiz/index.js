/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import db from '../../db.json';

// import QuizLogo from '../src/components/QuizLogo';
import Widget from '../../src/components/Widget';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import Button from '../../src/components/Button';
import Loader from '../../src/components/Loader';
import Counter from '../../src/components/Counter';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <Loader />
        <Counter />
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results }) {
  const router = useRouter();
  const name = [router.query.name];
  const acertos = results.filter((x) => x).length;
  const str = acertos === 0 ? `VOCE DEVE ESTAR DE MEME E NUNCA ASSISTIU STAR WARS`
            : acertos > 0 && acertos <= 3 ? `Teu conhecimento é pouco mas é algo`
            : acertos > 3 && acertos <= 6 ? `Aí sim, meu chegado mandou bem`
            : acertos > 6 && acertos <= 9 ? `Provou que conheçe bastante e é fã`
            : `GABARITOU O TESTE HEIN, TU É UM VERDADEIRO FÃ`;

  return (
    <Widget>
      <Widget.Header>
        Resultados
      </Widget.Header>

      <Widget.Content>
        <p>
          {`Ei ${name}, você acertou `}
          {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) return somatoriaAtual + 1;

            return somatoriaAtual;
          }, 0)}
          {` perguntas. ${str}`}

        </p>
        <ul>
          {results.map((result, index) => (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={`result__${index}`}
            >
              {`${index + 1}º pergunta : ${result === true ? ' Acertou' : ' Errou'}`}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <div>
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={question.image}
        />

        <Widget.Content>
          <h2>{question.title}</h2>
          <p>{question.description}</p>

          <AlternativesForm
            onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              setIsQuestionSubmited(true);

              setTimeout(() => {
                addResult(isCorrect);
                onSubmit();
                setIsQuestionSubmited(false);
                setSelectedAlternative(undefined);
              }, 3 * 1000);
            }}
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative__${alternativeIndex}`;
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
              const isSelected = selectedAlternative === alternativeIndex;

              return (
                <Widget.Topic
                  as="label"
                  key={alternativeId}
                  htmlFor={alternativeId}
                  data-selected={isSelected}
                  data-status={isQuestionSubmited && alternativeStatus}
                >
                  <input
                    style={{ display: 'none' }}
                    id={alternativeId}
                    name={questionId}
                    type="radio"
                    onChange={() => setSelectedAlternative(alternativeIndex)}
                  />
                  {alternative}
                </Widget.Topic>
              );
            })}

            <Button
              disabled={!hasAlternativeSelected}
              type="submit"
            >
              Confirmar
            </Button>
            {/* {isQuestionSubmited && isCorrect && <p>Voce acertou</p>}
            {isQuestionSubmited && !isCorrect && <p>voce errou</p>} */}
          </AlternativesForm>
        </Widget.Content>
      </div>
    </Widget>
  );
}

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);

  function addResult(result) {
    setResults([...results, result]);
  }

  const questionIndex = currentQuestion;

  const totalQuestions = db.questions.length;
  const question = db.questions[questionIndex];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 4800);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          {/* <QuizLogo /> */}

          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmitQuiz}
              addResult={addResult}
            />
          )}
          {
            screenState === screenStates.LOADING && (
              <>
                <LoadingWidget />
              </>
            )
          }
          {
            screenState === screenStates.RESULT && (
              <>
                <ResultWidget results={results} />
                {/* <h1>Teste</h1> */}
              </>
            )
          }
        </QuizContainer>
      </QuizBackground>
    </>
  );
}
