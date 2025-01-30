import React from 'react';
import Twitter from './Twitter.svg';
import Discord from './Discord.svg';
import Telegram from './Telegram.svg';

export enum IconNames {
  twitter = 'twitter',
  discord = 'discord',
  telegram = 'telegram',
}

type IconProps = {
  name: IconNames;
  className?: string;
};

const Icon: React.FC<IconProps> = ({ name, className }) => {
  const icons = {
    [IconNames.twitter]: <Twitter className={className} />,
    [IconNames.discord]: <Discord className={className} />,
    [IconNames.telegram]: <Telegram className={className} />,
  };

  return icons[name] || null;
};

export default Icon;
