import { nonThrowingRedirect } from '@/shared/utils/redirect';

export default function RootPage() {
  return nonThrowingRedirect('/en');
}
