import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useEffect, useState } from "react";
import { useLeaders } from "../../hooks/useLeaders";
import { Link, useNavigate } from "react-router-dom";
import { postLeader } from "../../api";

export function EndGameModal({ isWon, pairsCount, gameDurationSeconds, gameDurationMinutes, onClick, achievements }) {
  const { leaders, setLeaders, isLeader, setIsLeader } = useLeaders();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  let title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const [newLeader, setNewLeader] = useState({
    name: "",
    time: gameDurationSeconds,
    achievements: achievements,
  });

  useEffect(() => {
    const isInLeaderboard =
      leaders.length > 0 && newLeader.time < leaders[leaders.length - 1].time && isWon && pairsCount === 9;

    if (isInLeaderboard) {
      setIsLeader(true);
    }
  }, [leaders, newLeader.time, isWon, pairsCount, setIsLeader]);

  if (isLeader) {
    title = "Вы попали на лидерборд!";
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewLeader({
      ...newLeader,
      [name]: value,
    });
  }

  function handleSaveLeader() {
    setIsLoading(true);

    postLeader({ name: newLeader.name, time: newLeader.time, achievements: newLeader.achievements })
      .then(response => {
        setLeaders(response.leaders);
        navigate("/leaderboard");
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {isLeader && (
        <div className={styles.leaderboardInfo}>
          <input
            className={styles.nameInput}
            type="text"
            name="name"
            value={newLeader.name}
            placeholder="Пользователь"
            onChange={handleInputChange}
          />
          <Button onClick={handleSaveLeader} disabled={isLoading}>
            Подтвердить
          </Button>
        </div>
      )}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={onClick}>Начать сначала</Button>

      <Link className={styles.leaderboardLink} to="/leaderboard">
        Перейти к лидерборду
      </Link>
    </div>
  );
}
