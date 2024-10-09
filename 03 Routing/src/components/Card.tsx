import styles from "./Card.module.css";

type CardProps = {
  name: string;
  job: string;
};

const Card = (props: CardProps) => {
  // Throw an error for testing purposes
  if (true) {
    throw new Error("Card props must have name and job."); // Intentional error
  }
  return (
    <div className={styles.card}>
      <p className={styles.text}>I am {props.name}</p>
      <p className={styles.text}>I am a {props.job}</p>
    </div>
  );
};

export default Card;
