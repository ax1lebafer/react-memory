import styles from "./LeaderboardRow.module.css";
import cn from "classnames";
import { format } from "date-fns";
import { ModalPuzzle } from "../ModalPuzzle/ModalPuzzle";
import { useState } from "react";
import { ModalBall } from "../ModalBall/ModalBall";

function formatSeconds(seconds) {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date;
}

export function LeaderboardRow({ position, userName, achievements, time }) {
  const [isPopupPuzzleVisible, setIsPopupPuzzleVisible] = useState(false);
  const [isPopupBallVisible, setIsPopupBallVisible] = useState(false);

  const formattedTime = format(formatSeconds(time), "mm:ss");

  const handleBallMouseEnter = () => {
    setIsPopupBallVisible(true);
  };

  const handleBallMouseLeave = () => {
    setIsPopupBallVisible(false);
  };

  const handlePuzzleMouseEnter = () => {
    setIsPopupPuzzleVisible(true);
  };

  const handlePuzzleMouseLeave = () => {
    setIsPopupPuzzleVisible(false);
  };

  return (
    <div className={styles.sectionTop}>
      <p className={cn(styles.sectionText, styles.textPosition)}>{position}</p>
      <p className={cn(styles.sectionText, styles.textUser)}>{userName}</p>
      <div className={styles.sectionIcons}>
        <img
          src={`${achievements.includes(1) ? "./puzzle_empty.svg" : "./puzzle.svg"}`}
          alt="puzzle"
          onMouseEnter={handleBallMouseEnter}
          onMouseLeave={handleBallMouseLeave}
        />
        <img
          src={`${achievements.includes(2) ? "./magic_ball_empty.svg" : "./magic_ball.svg"}`}
          alt="ball"
          onMouseEnter={handlePuzzleMouseEnter}
          onMouseLeave={handlePuzzleMouseLeave}
        />
        {isPopupBallVisible && <ModalBall />}
        {isPopupPuzzleVisible && <ModalPuzzle />}
      </div>
      <p className={cn(styles.sectionText, styles.textTime)}>{formattedTime}</p>
    </div>
  );
}
