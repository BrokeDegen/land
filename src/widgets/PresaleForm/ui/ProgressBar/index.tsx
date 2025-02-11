import styles from './styles.module.css';
import pawImg from './assets/paw.png';
import fomoImg from './assets/fomo.gif';
import Image from 'next/image';

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
        className={`absolute right-0 top-[50%] translate-x-[50%] ${small ? 'w-[22px] translate-y-[-50%]' : 'w-[31px] translate-y-[-35%]'}`}
      >
        <div className='flex flex-shrink-0 flex-col items-center gap-[4px]'>
          <Image
            src={percent >= 75 ? fomoImg : pawImg}
            alt='pawImg'
            className={`${small ? 'h-[24px] w-[22px]' : 'h-[33px] w-[31px]'} ${percent >= 75 ? 'md:mb-2' : null} flex-shrink-0`}
          />
          <p className={`text-[14px ${small ? 'hidden' : null}`}>{percent}%</p>
        </div>
      </div>
    </div>
  </div>
);
