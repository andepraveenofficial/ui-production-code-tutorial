import { ErrorBoundary } from "../utils/ErrorBoundary";
import styles from "./Card.module.css";

type CardProps = {
  name: string;
  job: string;
};

const Card = (props: CardProps) => {
  // Throw an error if props are invalid
  if (!props.name || !props.job) {
    throw new Error("Card props must have name and job.");
  }
  return (
    <div className={styles.card}>
      <p className={styles.text}>I am {props.name}</p>
      <ErrorBoundary>
      <p className={styles.text}>I am a {props.job}</p>
      </ErrorBoundary>
    </div>
  );
};

export default Card;
