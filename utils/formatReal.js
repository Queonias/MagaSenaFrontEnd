export function formatarReal(numero) {
    // Verifica se o valor recebido é um número inteiro
    if (Number.isInteger(numero)) {
      // Usa a função toLocaleString() para formatar o número como moeda brasileira (R$)
      return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } else {
      // Se o valor não for um número inteiro, retorna uma mensagem de erro
      return 'Valor inválido. Por favor, forneça um número inteiro.';
    }
  }
  