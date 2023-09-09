import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div>
      <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
