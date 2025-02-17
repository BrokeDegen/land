import styles from './styles.module.css';
import fomoImg from './assets/fomo.gif';
import Image from 'next/image';
import classNames from 'classnames';

export const ProgressBar = ({
  percent,
  small,
}: {
  percent: number;
  small?: boolean;
}) => (
  <div className={styles.wrapper}>
    <div
      role='progressbar progress-striped'
      style={{
        width: `${percent}%`,
        background: percent >= 75 ? '#FF5E48' : '#ffb648',
        boxShadow:
          percent >= 75
            ? '0px -1px 20px 0px #FF5A48A6'
            : '0px -1px 20px 0px #ffb648a6',
      }}
      className={styles.bar}
    >
      <div
        className={classNames(
          small ? 'w-[22px] translate-y-[-50%]' : 'w-[31px] translate-y-[-35%]',
          'absolute right-0 top-[50%] translate-x-[50%]',
        )}
      >
        {percent >= 75 ? (
          <Image
            src={fomoImg}
            alt='pawImg'
            className={classNames(
              small ? 'h-[24px] w-[22px]' : 'h-[33px] w-[31px]',
              'flex-shrink-0 md:mb-2',
            )}
          />
        ) : null}
      </div>
    </div>
  </div>
);
