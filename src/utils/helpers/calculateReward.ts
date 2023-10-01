export function calculateReward(
  format: string,
  players: number,
  title: string,
  numOfRounds: number
): number[] {
  if (title.includes("Custom Challenge") || title.includes("Custom Assorti")) {
    if (numOfRounds >= 1 && numOfRounds <= 3) {
      return [80, 60, 40];
    } else if (numOfRounds === 4) {
      return [100, 80, 60];
    } else if (numOfRounds >= 5) {
      return [120, 90, 60];
    }
  } else {
    switch (format) {
      case "1x1":
        if (players >= 4 && players <= 7) {
          return [30, 20, 10];
        } else if (players >= 8 && players <= 13) {
          return [50, 30, 20];
        } else if (players >= 14 && players <= 17) {
          return [70, 50, 30];
        } else if (players >= 18) {
          return [80, 60, 40];
        }
        break;
      case "2x2":
        if (players >= 4 && players <= 7) {
          return [50, 25, 10];
        } else if (players >= 8 && players <= 12) {
          return [70, 50, 30];
        } else if (players >= 13) {
          return [80, 60, 40];
        }
        break;
      case "3x3":
        if (players >= 4 && players <= 6) {
          return [50, 30, 20];
        } else if (players >= 7) {
          return [70, 50, 30];
        }
        break;
      case "5x5":
        if (players >= 4 && players <= 6) {
          return [70, 50, 30];
        } else if (players >= 7) {
          return [80, 60, 40];
        }
        break;
    }
  }

  return [0, 0, 0];
}
