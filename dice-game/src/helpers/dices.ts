import { getRandomInt } from "../utils/get-random-int";

export const rollDices = () => {
  const dice1 = getRandomInt();
  const dice2 = getRandomInt();
  const rollScore = dice1 + dice2;
  const verdict = rollScore === 7 ? "win" : "lose";

  return {
    dice1,
    dice2,
    rollScore,
    verdict,
  };
};
