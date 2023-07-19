export function splitByState(str) {
  const estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  let newString = str;

  const resultado = [];
  let cidade = "";
  let estado = "";

  for (let i = 0; i < estados.length; i++) {
    for (let j = 0; j < newString.length; j++) {
      let pos = newString.substring(0, j).indexOf(` ${estados[i]} `);

      if (pos !== -1) {
        const substringResult = newString.substring(0, j);
        newString = newString.substring(pos + 4, newString.length - 1);
        resultado.push(substringResult.trim());
      }
    }
  }

  return resultado;
}
