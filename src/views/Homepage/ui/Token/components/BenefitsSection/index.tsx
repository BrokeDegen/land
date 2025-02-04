import CardIcon1 from '../../assets/Card1.svg?url';
import CardIcon2 from '../../assets/Card2.svg?url';
import CardIcon3 from '../../assets/Card3.svg?url';
import CardIcon4 from '../../assets/Card4.svg?url';
import Image from 'next/image';
import { FC } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';

export interface BenefitType {
  id: number;
  text: string;
  icon: string;
}

export const BenefitsSection: FC = () => {
  const benefits: BenefitType[] = [
    { id: 1, text: 'Create user-generated pools', icon: CardIcon1 },
    { id: 2, text: 'Join group competitions', icon: CardIcon2 },
    { id: 3, text: 'Participate in lotteries', icon: CardIcon3 },
    { id: 4, text: 'Buy NFTs', icon: CardIcon4 },
  ];

  const benefitsLeft = benefits.slice(0, Math.ceil(benefits.length / 2));
  const benefitsRight = benefits.slice(Math.ceil(benefits.length / 2));

  return (
    <div
      className={classNames(
        'mt-[36px] flex w-full justify-between',
        styles.section,
      )}
    >
      <div className={classNames('flex', styles.benefitBlock)}>
        {benefitsLeft.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>

      <div className={classNames('flex', styles.benefitBlock)}>
        {benefitsRight.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </div>
  );
};

const BenefitCard = ({ benefit }: { benefit: BenefitType }) => {
  return (
    <div
      key={benefit.id}
      className='outline-solid flex w-[228px] flex-col items-center gap-[58px] outline outline-red'
    >
      <Image src={benefit.icon} alt={`benefit ${benefit.id}`} />
      <p className='text-center text-[27px] font-normal leading-[25px]'>
        {benefit.text}
      </p>
    </div>
  );
};
