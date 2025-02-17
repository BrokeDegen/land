'use client';
import dynamic from 'next/dynamic';
import { FormSkeleton } from '../FormSkeleton';

const PresaleForm = dynamic(() => import('./PresaleForm'), {
  ssr: false,
  loading: () => <FormSkeleton />,
});

export default PresaleForm;
