'use client';
import { Form } from './ui/Form';
import { usePresaleProgress } from '@/entities/presale/presale';
import { FormSkeleton } from './ui/FormSkeleton';
import { useCurrentStage } from '@d4lb4eb/presale-ui-logic-sol/presale';
import { useSignals } from '@preact/signals-react/runtime';

const PresaleForm = () => {
  useSignals();
  const { data: stageResponse } = useCurrentStage();
  const presaleProgress = usePresaleProgress();

  if (!stageResponse || isNaN(presaleProgress.currentSupplyUSD))
    return <FormSkeleton />;

  return <Form />;
};

export default PresaleForm;
