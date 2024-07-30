import styles from "./ModalPuzzle.module.css";

export function ModalPuzzle() {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <p className={styles.popupText}>Игра пройдена без супер-сил</p>
      </div>
    </div>
  );
}
