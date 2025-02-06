import feature5 from './assets/feature-5.svg?url';
import chart from './assets/chart.svg?url';
import floxLogo from './assets/flox-logo.png';
import plusAction from './assets/plus-action.png';
import Image from 'next/image';
import classNames from 'classnames';
import { kumbhSans, poppins } from '@/shared/fonts/fonts';

interface FloatBlock {
  className: string;
  secondBlockClassName?: string;
  isActive: boolean;
}
  
const FloatBlock = ({ className, isActive, secondBlockClassName = '', children }: React.PropsWithChildren<FloatBlock>) => {
  return (
    <div className={`absolute w-[210px] h-[180px] rounded-[24px] p-[1px] overflow-hidden opacity-${isActive ? '100' : '0'} transition-opacity lg:w-[110px] lg:h-[94px] lg:rounded-[12px] ${className}`}>
      <div className={`absolute inset-0 z-0 rounded-[24px] bg-gradient-to-b from-[rgba(255,_200,_133,_0.1)] via-transparent to-transparent transition-opacity duration-300 ease-in-out opacity-100 lg:rounded-[12px]`} />
      <div className={`relative z-10 flex h-[180px] cursor-pointer flex-col overflow-hidden rounded-[24px] transition-all duration-300 ease-in-out bg-[rgba(255,_200,_133,_0.1)] backdrop-blur-[31.8px] lg:rounded-[12px] lg:h-[94px] ${secondBlockClassName}`} />
      {children}
    </div>
  );
};

interface FloatBlocksProps {
  activeIndex: number;
}

const FloatBlocks = ({ activeIndex }: FloatBlocksProps) => {
  return (
    <>
      <FloatBlock className='top-[260px] left-[291px] lg:left-[140px] lg:top-[150px]' isActive={activeIndex === 0}>
        <div className="absolute top-[26px] left-[26px] z-10 flex flex-col gap-[16px] lg:top-[12px] lg:left-[16px] lg:gap-[6px]">
          <span className={classNames(poppins.className, 'text-[15px] leading-[12px] lg:text-[8px]')}>Starting price</span>
          <span className={classNames(poppins.className, 'text-[27px] font-semibold leading-[12px] lg:text-[16px]')}>$0,0358</span>
        </div>
        <Image src={chart} alt="" className="absolute bottom-[0] right-[0] z-10 lg:w-[90px]" />
      </FloatBlock>

      <FloatBlock className='top-[312px] left-[-82px] lg:left-[-25px] lg:top-[162px]' isActive={activeIndex === 1}>
        <div className="absolute top-[22px] left-[28px] z-10 flex flex-col lg:top-[12px] lg:left-[16px]">
          <span className="text-[15px] lg:text-[7.5px]">Winrate</span>
          <span className="text-[37px] font-bold leading-[42px] lg:text-[18.5px] lg:leading-[21px]">79%</span>
        </div>

        <div className={`absolute w-full flex items-end justify-center gap-[13px] bottom-[20px] left-[0] bottom-[0] right-[0] z-10 lg:bottom-[10px] lg:gap-[7px]`}>
          <svg
            viewBox="0 0 178 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`absolute left-[22px] bottom-[62px] w-[177px] h-[3px] lg:bottom-[33px] lg:left-[8px] lg:w-[93px] lg:h-[2px]`}
          >
            <path opacity="0.31" d="M0.5 1.5H177.5" stroke="white" strokeWidth="2" strokeDasharray="4 4"/>
          </svg>
          <div className="w-[27px] h-[29px] bg-[#6CFF7D] opacity-10 rounded-[5px] lg:w-[14px] lg:rounded-[2.5px] lg:h-[15px]" />
          <div className="w-[27px] h-[52px] bg-[#6CFF7D] opacity-70 rounded-[5px] lg:w-[14px] lg:rounded-[2.5px] lg:h-[27px]" />
          <div className="w-[27px] h-[39px] bg-[#6CFF7D] rounded-[5px] lg:w-[14px] lg:rounded-[2.5px] lg:h-[20px]" />
          <div className="w-[27px] h-[76px] bg-[#6CFF7D] rounded-[5px] lg:w-[14px] lg:rounded-[2.5px] lg:h-[40px]" />
        </div>
      </FloatBlock>

      <FloatBlock className='top-[53px] left-[291px] lg:left-[140px] lg:top-[0px]' isActive={activeIndex === 2}>
        <div className="absolute top-[0] left-[0] w-full h-full flex flex-col items-center justify-center z-10 gap-[10px] lg:gap-[6px] lg:pt-[2px]">
          <span className={classNames(kumbhSans.className, 'text-[16px] lg:text-[9px]')}>Point reward:</span>
          <Image src={floxLogo} alt="fox image" className="w-[44px] lg:w-[25px]" />
          <span className={classNames(kumbhSans.className, 'text-[27px] font-bold text-[#FDA883] lg:text-[14px]')}>50.2 FLOX</span>
        </div>
      </FloatBlock>

      <FloatBlock className='top-[312px] left-[-82px] lg:left-[-25px] lg:top-[162px]' isActive={activeIndex === 3}>
        <div className="absolute top-[0] left-[0] w-full h-full flex flex-col items-center justify-center z-10 gap-[25px] lg:gap-[8px] lg:pt-[6px]">
          <Image src={plusAction} alt="plus images" className="w-[74px] h-[74px] lg:w-[40px] lg:h-[40px]" />
          <span className="text-[27px] leading-[23px] lg:text-[14px] font-medium">New Event</span>
        </div>
      </FloatBlock>

      <FloatBlock className='top-[35px] left-[291px] h-[200px] lg:left-[140px] lg:top-[0px]' isActive={activeIndex === 4} secondBlockClassName='h-[220px]'>
        <Image src={feature5} alt="" className="absolute w-[210px] top-[0] z-10 lg:w-[104px] lg:left-[2px]" />
      </FloatBlock>
    </>
  );
};

export default FloatBlocks;
