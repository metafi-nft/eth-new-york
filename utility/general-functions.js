export function validateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,63})+$/.test(mail))
  {
    return (true)
  }

    return (false)
}

export function getDecimalPart(decNum) {
  return Math.round((decNum % 1) * 100000000) / 100000000;
}