import Image from 'next/image';
import Certic from '../../assets/Certik.svg?url';
import Hacken from '../../assets/Hacken.svg?url';
import styles from './style.module.scss';
import classNames from 'classnames';

export const ListingInfo = () => {
  const auditedArr = [
    {
      id: 1,
      name: 'certic',
      icon: Certic,
    },
    {
      id: 2,
      name: 'hacken',
      icon: Hacken,
    },
  ];

  const listedArr = [
    {
      id: 1,
      name: 'certic',
      icon: Certic,
    },
    {
      id: 2,
      name: 'hacken',
      icon: Hacken,
    },
    {
      id: 3,
      name: 'certic',
      icon: Certic,
    },
  ];

  return (
    <div className={classNames('mt-[130px] flex gap-[44px]', styles.container)}>
      <div className={classNames('flex items-center gap-[22px]', styles.block)}>
        <p className='text-[18px] font-normal leading-[16px] text-[#818691]'>
          Audited by:{' '}
        </p>
        <div className='flex items-center gap-[4px]'>
          {auditedArr.map((item) => (
            <Item key={item.id} icon={item.icon} alt={item.name} />
          ))}
        </div>
      </div>

      <div>
        <div
          className={classNames('flex items-center gap-[22px]', styles.block)}
        >
          <p className='text-[18px] font-normal leading-[16px] text-[#818691]'>
            Listed on:
          </p>
          <div className='flex items-center gap-[4px]'>
            {listedArr.map((item) => (
              <Item key={item.id} icon={item.icon} alt={item.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Item = ({ icon, alt = '' }: { icon: string; alt: string }) => {
  return (
    <div className='rounded-[9px] bg-[#171B21] pb-[17px] pl-[19px] pr-[19px] pt-[17px]'>
      <Image src={icon} alt={alt} />
    </div>
  );
};
