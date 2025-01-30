import styles from './styles.module.scss';

export const FaqItemBackground = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className={`${styles.background} ${isOpen ? styles.active : ''}`} />
  );
};
