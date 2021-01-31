/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable arrow-body-style */
import React from 'react';
import styled from 'styled-components';
import useWindowSize from '@rooks/use-window-size';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

const Rank = styled.div`
  width: 60%;
  margin-bottom: 24px;
  margin-top: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;  
  justify-self: center;

  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0px;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Rank.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  
  * {
    margin: 0;
  }
`;

Rank.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    font-size: 18px;
    margin: 4px 0;
  }
`;

Rank.List = styled.ul`
`;

Rank.Item = styled.li`
    padding: 10px 4px!important;
    border-top: 1px solid ${({ theme }) => theme.colors.primary};
    
    display: flex;
    justify-content: space-between;

    &:first-child {
      border: none;
    }
`;

const Ranking = () => {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti
        width={width}
        height={height}
      />
      <Rank
        as={motion.section}
        transition={{ delay: 0.4, duration: 0.5 }}
        variants={{
          show: { opacity: 1, y: '0' },
          hidden: { opacity: 0, y: '50%' },
        }}
        initial="hidden"
        animate="show"
      >
        <Rank.Header>
          É HORA DE COMEMORAR
        </Rank.Header>
        <Rank.Content>
          <Rank.List>
            <img
              alt="Descrição"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              src="https://thumbs.gfycat.com/GracefulShorttermDinosaur-small.gif"
            />
          </Rank.List>
        </Rank.Content>
      </Rank>
    </>
  );
};

export default Ranking;
