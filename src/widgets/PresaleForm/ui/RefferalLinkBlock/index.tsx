import { LinkIcon } from '@/shared/icons/LinkIcon';
import { Button } from '@/shared/ui/Button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export const copyToClipboard = (str: string) => {
  const copyText = document.createElement('input');

  document.body.appendChild(copyText);

  copyText.value = str;
  copyText.select();
  copyText.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(copyText.value);
  document.body?.removeChild(copyText);
};

export const RefferalLinkBlock = ({
  link,
  className,
}: {
  link: string;
  className?: string;
}) => {
  const t = useTranslations('form');
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Button
      onClick={(e) => {
        copyToClipboard(link);
        setIsCopied(true);
      }}
      transparent
      mAuto={false}
      bgColor='#21222A'
      className='m-auto flex w-[430px] flex-shrink-0 items-center justify-center gap-[12px] whitespace-nowrap text-center !text-[14px] sm:w-auto sm:px-[20px]'
    >
      <LinkIcon />
      <span>{isCopied ? t('copied') : t('copy')}</span>
    </Button>
  );
};
