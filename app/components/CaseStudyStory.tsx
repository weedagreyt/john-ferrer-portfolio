import Reveal from "./Reveal";
import styles from "./case-study-story.module.css";

type Props = {
  challenge: string;
  role: string;
  thinking: string;
  execution: string;
  outcome: string;
};

const items = ["Challenge", "My Role", "Thinking", "Execution", "Outcome"] as const;

export default function CaseStudyStory({ challenge, role, thinking, execution, outcome }: Props) {
  const values = [challenge, role, thinking, execution, outcome];
  return (
    <Reveal className={styles.wrap}>
      <div className={styles.heading}>
        <p>Case Study</p>
        <h2>From the problem<br />to the visual solution.</h2>
      </div>
      <div className={styles.grid}>
        {items.map((label, index) => (
          <article className={styles.item} key={label}>
            <span>0{index + 1}</span>
            <h3>{label}</h3>
            <p>{values[index]}</p>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
