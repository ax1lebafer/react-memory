import { Link, useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useState } from "react";
import { useEasyMode } from "../../hooks/useEasyMode";
// import { useLeaders } from "../../hooks/useLeaders";
// import { getLeaders } from "../../api";

export function SelectLevelPage() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigate = useNavigate();
  const { isEasyMode, setIsEasyMode } = useEasyMode();

  const handleEasyModeChange = event => {
    setIsEasyMode(event.target.checked);
  };

  const handleCheckboxChange = level => {
    setSelectedLevel(level);
  };

  const handleStartClick = () => {
    if (selectedLevel !== null) {
      navigate(`/game/${selectedLevel}`);
    } else {
      alert("Выберите уровень перед началом игры");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          {[3, 6, 9].map((level, index) => (
            <li className={`${styles.level} ${selectedLevel === level ? styles.selected : ""}`} key={index}>
              <label className={styles.checkboxButton}>
                <input type="checkbox" checked={selectedLevel === level} onChange={() => handleCheckboxChange(level)} />
                <span>{index + 1}</span>
              </label>
            </li>
          ))}
        </ul>
        <label className={styles.checkboxMode}>
          <input type="checkbox" onChange={handleEasyModeChange} checked={isEasyMode} />
          <span>Легкий режим (3 попытки)</span>
        </label>
        <button className={styles.buttonStart} onClick={handleStartClick}>
          Старт
        </button>
        <Link className={styles.leaderboardLink} to="/leaderboard">
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}
