import styles from "./ModalBall.module.css";

export function ModalBall() {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <p className={styles.popupText}>Игра пройдена в сложном режиме</p>
      </div>
    </div>
  );
}
