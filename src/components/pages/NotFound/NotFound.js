import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      error 404
      <p className={styles.subtitle}>Better turn back traveler, it seems that you are lost...</p>
    </div>
  );
};

export default NotFound;