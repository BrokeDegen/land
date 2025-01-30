'use client';
import React, { useState } from 'react';
import { questions } from './constants/questions';
import { FAQItem } from './components/FaqItem';
import { handleClick } from './utils/helpers';

const Faq = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className='space-between mx-auto flex w-full max-w-[1440px] gap-[101px] px-[60px] pb-[141px] pt-[123px] xl:flex-col sm:gap-[20px] sm:px-[16px] sm:pt-[60px] sm:pt-[81px]'>
      <div>
        <h2 className='max-w-[369px] text-[70px] font-bold uppercase leading-[77px] sm:text-[48px] sm:leading-[52.8px]'>
          Frequent Questions
        </h2>
      </div>
      <div className='flex w-[850px] flex-col gap-[6px] xl:w-full'>
        {questions.map((question) => (
          <FAQItem
            key={question.id}
            id={question.id}
            question={question.question}
            answer={question.answer}
            isOpen={openId === question.id}
            onClick={() => handleClick(question?.id, setOpenId, openId)}
          />
        ))}
      </div>
    </div>
  );
};

export default Faq;
