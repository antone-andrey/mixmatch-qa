// Generate a random number with max 5 digits (from 0 to 99999)
export function generateRandomNumber(): number {
  const randomNumber = Math.floor(Math.random() * 100000);
  return randomNumber;
}
