import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { LeaderboardRow } from "../LeaderboardRow/LeaderboardRow";
import styles from "./Leaderboard.module.css";
import cn from "classnames";
import { useLeaders } from "../../hooks/useLeaders";
import { useEffect, useState } from "react";
import { getLeaders } from "../../api";

export function Leaderboard() {
  const { leaders, setLeaders } = useLeaders();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getLeaders()
      .then(response => {
        const sortedLeaders = response.leaders
          .map(leader => ({
            ...leader,
            name: leader.name.trim() === "" ? "Пользователь" : leader.name,
          }))
          .sort((a, b) => a.time - b.time)
          .slice(0, 10);
        setLeaders(sortedLeaders);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setLeaders]);

  return (
    <div className={styles.leaderboard}>
      <header className={styles.header}>
        <p className={styles.headerTitle}>Лидерборд</p>
        <Link to={"/"}>
          <Button>Начать игру</Button>
        </Link>
      </header>
      <section className={styles.section}>
        <div className={styles.sectionTop}>
          <p className={cn(styles.sectionText, styles.textPosition)}>Позиция</p>
          <p className={cn(styles.sectionText, styles.textUser)}>Пользователь</p>
          <p className={cn(styles.sectionText, styles.textAchievement)}>Достижения</p>
          <p className={cn(styles.sectionText, styles.textTime)}>Время</p>
        </div>
        {isLoading && <span className={styles.loader}>Загрузка...</span>}
        {!isLoading && (
          <>
            {leaders.map((leader, index) => (
              <LeaderboardRow
                position={`# ${index + 1}`}
                userName={leader.name}
                time={leader.time}
                key={leader.id}
                achievements={leader.achievements}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
}
