export const EMAIL_VALIDATE_REGEX =
  /^(?=[a-zA-Z0-9@.!#$%&‘’'*+\\/=?^_`{|}~-]{6,254}$)(?=[a-zA-Z0-9.!#$%&‘’'*+\\/=?^_`{|}~-]{1,64}@)[a-zA-Z0-9!#$%&‘’'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&‘’'*+\\/=?^_`{|}~-]+)*@(?:(?=[a-zA-Z0-9-]{1,63}\.)[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?=[a-zA-Z0-9-]{2,63}$)[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

export const UPPER_CASE_REGEX = /[A-Z]+/;
export const LOWER_CASE_REGEX = /[a-z]+/;
export const MIN_PASSWORD_LENGTH = 6;
export const NUMBER_REGEX = /[0-9]+/;
export const SPECIAL_CHAR_REGEX = /[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+-]/;
