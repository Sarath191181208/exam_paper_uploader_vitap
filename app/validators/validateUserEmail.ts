export const isValidUserEmail = (email?: string): boolean => {
  const VITAP_EMAIL_REGEX = /^.*@vitapstudent.ac.in$/;
  const VITAP_EMAIL_REGEX_2 = /^.*@vitap.ac.in$/;

  if (email == null) {
    return false;
  }

  if (!email.match(VITAP_EMAIL_REGEX) && !email.match(VITAP_EMAIL_REGEX_2)) {
    return false;
  }
  return true;
}
