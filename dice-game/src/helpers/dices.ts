import { IDiceRoll } from "../interfaces/idice-roll.interface";
import { getRandomInt } from "../utils/get-random-int";

export const rollDices = (): IDiceRoll => {
  const dice1 = getRandomInt();
  const dice2 = getRandomInt();
  const result = dice1 + dice2;
  const verdict = result === 7 ? "win" : "lose";

  return {
    dice1,
    dice2,
    result,
    verdict,
  };
};
