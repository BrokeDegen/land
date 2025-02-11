import Image from 'next/image';
import CircleIcon from '../../assets/circle-icon.svg?url';
import CheckIcon from '../../assets/check-icon.svg?url';
import styles from './styles.module.scss';
import ActiveQuarterArrow from '../../assets/arrow-active-quarter.svg?url';
import PoinstImage from '../../assets/points.svg?url';
import classNames from 'classnames';

export const SwiperItem = ({
  block,
  type = '',
  isLastSlide = false,
}: {
  block: any;
  type?: '' | 'orange' | 'silver';
  isLastSlide: boolean;
}) => {
  return (
    <div className='relarive flex h-[fit-content] w-full flex-col gap-[2px]'>
      <Arrows isActiveQuarter={block?.isActiveQuarter} />
      <div className='relative'>
        {!isLastSlide && (
          <Image
            src={PoinstImage}
            alt='points'
            className='absolute bottom-[0px] right-[-20px]'
          />
        )}

        <div className='relative overflow-hidden rounded-[20px] px-[2px] pt-[2px]'>
          <div className='relative flex h-[120px] items-center rounded-[20px] bg-[#171B23] md:h-[90px]'>
            {type === 'orange' && (
              <>
                <RedBorder />
                <CircleOrangeGradient />
              </>
            )}
            {type === 'silver' && (
              <>
                <SilverBorder />
                <CircleSilverGradient />
              </>
            )}

            <p className='relative ml-[36px] text-[50px] font-normal uppercase leading-[55px] md:ml-[26px] md:text-[45px] md:leading-[50px]'>
              {block?.title}
            </p>
          </div>
        </div>
      </div>
      <div className='rounded-[20px] bg-[#171B23]'>
        <div className='mb-[50px] ml-[36px] mt-[36px] flex flex-col gap-[14px] text-[22px] font-normal leading-[31px] md:mb-[45px] md:ml-[28px] md:mr-[10px]'>
          {block?.items?.map((item: any) => {
            return (
              <div key={item?.id} className='flex items-center gap-[14px]'>
                <div className='relative h-[36px] w-[36px]'>
                  <Image src={CircleIcon} alt='circle icon' />
                  <Image
                    src={CheckIcon}
                    alt='check icon'
                    className='absolute inset-0 m-auto'
                  />
                </div>
                <p>{item?.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Arrows = ({ isActiveQuarter }: any) => {
  return (
    <>
      {isActiveQuarter && (
        <>
          <Image
            src={ActiveQuarterArrow}
            alt='arrow icon'
            className={classNames(
              'absolute left-[50%] top-[-90px] z-10 translate-x-[-50%]',
              styles.arrowActiveQuarter,
            )}
          />
          <Image
            src={ActiveQuarterArrow}
            alt='arrow icon'
            className='absolute bottom-[-95px] left-[50%] z-10 translate-x-[-50%] rotate-[180deg]'
          />
        </>
      )}
    </>
  );
};

const CircleOrangeGradient = () => {
  return <div className={styles.circleOrangeGradient} />;
};

const RedBorder = () => {
  return <div className={styles.redBorder} />;
};

const CircleSilverGradient = () => {
  return <div className={styles.circleSilverGradient} />;
};

const SilverBorder = () => {
  return <div className={styles.silverBorder} />;
};
