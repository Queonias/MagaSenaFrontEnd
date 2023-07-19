export function formatDate(dateStr) {
    const date = new Date(dateStr);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  }