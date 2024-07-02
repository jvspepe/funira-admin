function getRandomNumber(min?: number, max?: number) {
  if (min && max) return Math.floor(Math.random() * (max - min + 1) + min);
  return Math.floor(Math.random());
}

export default getRandomNumber;
