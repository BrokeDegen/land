const BONUS_PERCENTAGE = [
  [10, 0],
  [250, 6],
  [500, 7],
  [1000, 8],
  [2500, 9],
  [5000, 10],
  [10000, 11],
  [Infinity, 12],
];

export function BonusPoints({ usdTotal }: { usdTotal: number }) {
  const bonus = BONUS_PERCENTAGE.find(([limit]) => usdTotal < limit) || [0, 0];

  let amount = Math.floor(usdTotal * bonus[1]);

  // protect from bullshit input
  amount = isNaN(amount) ? 0 : amount;

  return (
    <div className='flex flex-shrink-0 items-center gap-[0.6rem]'>
      <span className='text-white'>{amount}</span>
    </div>
  );
}
