import { FaqItemBorder } from '../FaqItemBorder';
import { FaqItemBackground } from '../FaqItemBackground';
import { FaqItemIcon } from '../FaqItemIcon';

interface FAQItemProps {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export const FAQItem = ({
  id,
  question,
  answer,
  isOpen,
  onClick,
}: FAQItemProps) => {
  return (
    <div className='relative rounded-[21px] p-[1px]'>
      <FaqItemBorder isOpen={isOpen} />
      <div
        className={`relative z-10 flex min-h-[102px] cursor-pointer flex-col overflow-hidden rounded-[21px] pl-[38px] pr-[28px] pt-[38px] transition-all duration-300 ease-in-out sm:min-h-[79px] sm:pb-[28px] sm:pl-[28px] sm:pt-[28px] ${
          isOpen ? `bg-[#171b23] pb-[59px]` : 'bg-[#171b23] pb-[39px]'
        }`}
        onClick={onClick}
      >
        <FaqItemBackground isOpen={isOpen} />

        <div className='relative z-10 flex items-center gap-[33px] text-[27px] font-semibold leading-[24.84px] sm:gap-[16px] sm:text-[20px] sm:leading-[22.7px]'>
          <FaqItemIcon isOpen={isOpen} />
          <p>{question}</p>
        </div>
        <div
          className={`relative z-10 ml-[49px] max-w-[560px] font-normal transition-all duration-300 ease-in-out sm:ml-[32px] sm:mt-[16px] ${
            isOpen
              ? 'mt-[40px] max-h-[500px] opacity-100'
              : 'mt-[0px] max-h-0 opacity-0'
          }`}
        >
          <p className='text-[18px] leading-[23.4px] sm:text-[16px] sm:leading-[19.2px]'>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};
