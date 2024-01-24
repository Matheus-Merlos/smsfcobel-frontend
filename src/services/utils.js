function isValidDate(dateString) {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(dateString)) {
    return false;
  }

  const [, day, month, year] = regex.exec(dateString);

  const dayInt = parseInt(day, 10);
  const monthInt = parseInt(month, 10);
  const yearInt = parseInt(year, 10);

  if (
    dayInt < 1 ||
    dayInt > 31 ||
    monthInt < 1 ||
    monthInt > 12 ||
    yearInt < 1000 ||
    yearInt > 9999
  ) {
    return false;
  }

  const daysInMonth = new Date(yearInt, monthInt, 0).getDate();
  if (dayInt > daysInMonth) {
    return false;
  }

  return true;
}

// Função para formatar a data no input para DD/MM/AAAA
function handleDateInputChange(e, setFunction) {
  let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (value.length >= 2) {
    // Insere a barra após os dois primeiros caracteres
    value = `${value.slice(0, 2)}/${value.slice(2)}`;
  }

  if (value.length >= 5) {
    // Insere a segunda barra após os cinco primeiros caracteres
    value = `${value.slice(0, 5)}/${value.slice(5)}`;
  }

  setFunction(value);
}

// Função para formatar a data de DD/MM/AAAA para AAAA-MM-DD, pois é o que a REST API Suporta
function formatDate(date) {
  const dateAsString = date.split('/');
  return `${dateAsString[2]}-${dateAsString[1]}-${dateAsString[0]}`;
}

export { isValidDate, handleDateInputChange, formatDate };
