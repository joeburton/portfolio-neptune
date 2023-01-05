import styles from '../../css/CSSContainer.module.css';

const CSSContainer = () => {
  return (
    <section>
      <div className={styles.layoutContainer}>
        <h2>CSS @container Experiment</h2>
        <div className={styles.item}>
          <h3>Meaningful Header</h3>
        </div>
        <div className={styles.item}>
          <p>Description text goes here :)</p>
        </div>
      </div>
    </section>
  );
};

export default CSSContainer;
