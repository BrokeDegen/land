import { useTranslations } from 'next-intl';
import { MAX_STAGE } from '../../lib/presale';
import { usePresaleStage } from '@/entities/stage';
import { ProgressBar } from '../ProgressBar';
import { usePresaleProgress } from '@/entities/presale/presale';
import { CALCULATOR_DATA } from '@/entities/calculator';
import { useWindowWidth } from '@/shared/hooks/useWindowWidth';

function StageCard() {
  const t = useTranslations('form');
  const stage = usePresaleStage();
  const width = useWindowWidth();
  const isSm = width <= 560;
  const { currentSupplyUSD } = usePresaleProgress();

  const currentStagePercent =
    (currentSupplyUSD /
      CALCULATOR_DATA.accomulatedStagesUsd[stage.stage as 1]) *
    100;

  return (
    <div className={`flex flex-col font-normal uppercase text-white`}>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <p>{t('totalRaised')}</p>
          <p className='text-[#FFB648]'>
            {t('stage')} {stage.stage}/{MAX_STAGE}
          </p>
        </div>
        <div className='mt-[12px] flex items-baseline gap-[6px]'>
          <span className='text-[40px] leading-[36px]'>
            ${currentSupplyUSD}
          </span>
          <span className='text-[#929292]'>/</span>
          <span className='text-[14px] text-[#929292]'>
            ${CALCULATOR_DATA.accomulatedStagesUsd[stage.stage as 1]}
          </span>
        </div>
      </div>
      <div className='mt-[30px] flex items-center justify-between'>
        <div className='flex items-center gap-[4px] text-[15px] sm:flex-col sm:items-start'>
          <p className='text-center text-[#929292] md:text-wrap'>
            {t('currentPrice')}:
          </p>
          <div className='relative h-[22px] w-[90px]'>
            <p className='absolute inset-0 left-[12px] h-[14px] w-[62px] text-black'>
              $<span className='tracking-[-2px]'>0.</span>
              <span>
                {Number(stage.currentTokenPrice)
                  .toFixed(4)
                  .toString()
                  .substring(2)}
              </span>
            </p>
          </div>
        </div>
        <div className='flex items-center gap-[4px] text-[15px] sm:flex-col sm:items-start'>
          <p className='text-center text-[#929292] md:text-wrap'>
            {t('nextPrice')}:
          </p>
          <div className='relative h-[22px] w-[90px]'>
            <p className='absolute inset-0 left-[12px] h-[14px] w-[62px] text-[#F3504D]'>
              $<span className='tracking-[-2px]'>0.</span>
              <span>
                {Number(stage.nextTokenPrice)
                  .toFixed(4)
                  .toString()
                  .substring(2)}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className='my-[22px]'>
        <ProgressBar
          percent={Number(
            currentStagePercent.toLocaleString('en-GB', {
              maximumFractionDigits: 1,
            }),
          )}
          small={isSm}
        />
      </div>
    </div>
  );
}

export default StageCard;
