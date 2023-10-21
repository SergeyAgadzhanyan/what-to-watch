import {EMAIL_FORMAT_ERROR, EMPTY_ERROR, MIN_LENGTH_ERROR} from './Messages';

export const getInputErrorMessage =  (validation) => {
  let message = '';
  if (validation.isEmpty) {
    message = EMPTY_ERROR;
  } else if (validation.isLengthError) {
    message = MIN_LENGTH_ERROR;
  } else if (validation.isEmailError) message = EMAIL_FORMAT_ERROR;
  return message;
}
