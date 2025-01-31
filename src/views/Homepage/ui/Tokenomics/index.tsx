'use client';
import { PieChart } from 'react-minimal-pie-chart';

const Tokenomics = () => {
  return (
    <div className='flex items-center justify-center gap-[125px]'>
      <PieChart
        data={[
          { title: 'Staking', value: 10, color: '#ECBE40' },
          { title: 'Team+Reserve', value: 10, color: '#DEF993' },
          { title: 'DAO+Liquidity', value: 10, color: '#FD3B0B' },
          { title: 'Rewards', value: 20, color: '#871567' },
          { title: 'Presale', value: 50, color: '#B20E44' },
        ]}
        lineWidth={8}
        className='h-[480px] w-[480px] rotate-[-120deg]'
        rounded
        paddingAngle={7}
        animate
      />
      <div>
        <p className='text-[80px] font-bold uppercase leading-[88px]'>
          Tokenomics
        </p>
        <div></div>
      </div>
    </div>
  );
};

const TokenomicsItem = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => {
  return (
    <div className='flex gap-[14px]'>
      <div />
      <div className='flex flex-col gap-[9px]'>
        <p>{title}</p>
        <p className='text-[28px] font-medium leading-[25px]'>{value}%</p>
      </div>
    </div>
  );
};

export default Tokenomics;
