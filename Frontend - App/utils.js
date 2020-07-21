export const trimText = (text = "", limit) => {
  return text.length > limit ? `${text.slice(0, limit)}...` : text
}

export const formatLetters = (word) => {
  const arrOfWords = word.split(' ');
  const formattedWordsArr = [];

  arrOfWords.forEach(word => {
    const firstLetter = word.slice(0, 1).toUpperCase();
    const remainingLetters = word.slice(1).toLowerCase();
    const newWord = firstLetter + remainingLetters;
    formattedWordsArr.push(newWord);
  });

  return formattedWordsArr.join(" ");
}

export const getAge = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
