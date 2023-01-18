export default function calculateRemainingTime(expirationTime) {
  const currentTime = new Date().getTime();
  const remainingDuration = expirationTime - currentTime;

  return remainingDuration;
}
