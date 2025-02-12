import { usePresaleStage as _usePresaleStage } from '@d4lb4eb/presale-ui-logic-sol/entities';
import { CALCULATOR_DATA } from '../calculator';

export const usePresaleStage = () => {
  return _usePresaleStage({ ...CALCULATOR_DATA });
};
