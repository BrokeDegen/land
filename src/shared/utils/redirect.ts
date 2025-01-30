import { RedirectType, redirect } from 'next/navigation';
export function nonThrowingRedirect(path: string) {
  return redirect(path, RedirectType.replace);
}
