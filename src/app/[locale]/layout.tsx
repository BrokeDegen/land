import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return ["en", "ru"].map((locale) => ({ locale }));
}

export const dynamic = "force-static";

//ts-ignore
export default function LocaleLayout({ children }: Props) {
  return children;
}
