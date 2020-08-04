export function IsEmail(email) {
  const er = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  if (typeof email === 'string') {
    if (er.test(email)) {
      return true;
    }
  } else if (typeof email === 'object') {
    if (er.test(email.value)) {
      return true;
    }
  } else {
    return false;
  }

  return false;
}
