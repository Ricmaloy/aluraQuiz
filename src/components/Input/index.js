/* eslint-disable linebreak-style */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputBase = styled.input`
   width: 100%;

   font-size: 14px;
   font-family: 'Lato', sans-serif;
   font-weight: 400;

   color: #000;

   padding: 10px 15px;
   margin-bottom: 15px;
   
   border-radius: 5px;
   border-color: #DADADA;

   &:focus {
   outline: none;

   color: #000; 
   }
`;

export default function Input({ onChange, placeholder, ...props }) {
  return (
    <div>
      <InputBase
        placeholder={placeholder}
        onChange={onChange}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </div>
  );
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

// width: 100%;

// font-size: 14px;
// font-family: 'Lato', sans-serif;
// font-weight: 400;

// color: #000;

// padding: 10px 15px;
// border-radius: 5px;
// border-color: #DADADA;

// &:focus {
// outline: none;

// color: #000;
