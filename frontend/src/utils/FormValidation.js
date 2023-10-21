import React from 'react';
import {emailReg} from './Regex';

export const useInput = (initialValue, validations) => {
  const [value, setValue] = React.useState(initialValue);
  const [isTouched, setIsTouched] = React.useState(false);
  const validation = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    setIsTouched(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isTouched,
    ...validation,
  };
};

const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [isLengthError, setIsLengthError] = React.useState(false);
  const [isEmailError, setIsEmailError] = React.useState(false);
  const [isValidInput, setIsValidInput] = React.useState(false);

  React.useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case 'minLength' :
          (value && value.length) < validations[validation]
              ? setIsLengthError(true)
              : setIsLengthError(false);
          break;
        case 'isEmail':
          (value && emailReg.test(value))
              ? setIsEmailError(false)
              : setIsEmailError(true);
      }
    }
  }, [value]);

  React.useEffect(() => {
    (isEmpty || isLengthError || isEmailError)
        ? setIsValidInput(false)
        : setIsValidInput(true);
  }, [isEmpty, isLengthError, isEmailError]);
  return {
    isLengthError,
    isEmailError,
    isEmpty,
    isValidInput,
  };
};
