import { FaqItemBorder } from '../FaqItemBorder';
import { FaqItemBackground } from '../FaqItemBackground';
import Plus from '../../assets/plus.svg?url';
import Minus from '../../assets/minus.svg?url';
import Image from 'next/image';

interface FAQItemProps {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: FAQItemProps) => {
  return (
    <div className='relative rounded-[21px] p-[1px]'>
      <FaqItemBorder isOpen={isOpen} />
      <div
        className={`relative z-10 flex min-h-[102px] cursor-pointer flex-col overflow-hidden rounded-[21px] pl-[38px] pr-[28px] pt-[38px] transition-all duration-300 ease-in-out md:min-h-[79px] md:pb-[28px] md:pl-[28px] md:pt-[28px] ${
          isOpen
            ? `bg-[#171b23] pb-[59px]`
            : 'bg-[#171b23] pb-[39px] hover:ring-[1px] hover:ring-[#FBB35F]'
        }`}
        onClick={onClick}
      >
        <FaqItemBackground isOpen={isOpen} />

        <div className='relative z-10 flex items-center gap-[33px] text-[27px] font-semibold leading-[24.84px] md:gap-[16px] md:text-[20px] md:leading-[22.7px]'>
          <Image
            src={isOpen ? Minus : Plus}
            alt='close answer button'
            className='h-[16px] w-[16px]'
          />
          <p>{question}</p>
        </div>
        <div
          className={`relative z-10 ml-[49px] max-w-[560px] font-normal transition-all duration-300 ease-in-out md:ml-[32px] ${
            isOpen
              ? 'mt-[40px] max-h-[500px] opacity-100 md:mt-[16px]'
              : 'mt-[0px] max-h-0 opacity-0 md:mt-[0]'
          }`}
        >
          <p className='text-[18px] leading-[23.4px] md:text-[16px] md:leading-[19.2px]'>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};
