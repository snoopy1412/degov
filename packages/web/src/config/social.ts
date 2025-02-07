type SocialConfig = {
  name: string;
  url: string;
  assetPath: string;
};

function createSocialConfig(name: string, url: string, assetPath: string): SocialConfig {
  return {
    name,
    url,
    assetPath
  };
}

export const socialConfig: SocialConfig[] = [
  createSocialConfig('X', 'https://x.com/ringecosystem', '/assets/image/social/x.svg'),
  createSocialConfig('Telegram', 'https://t.me/ringecosystem', '/assets/image/social/telegram.svg'),
  createSocialConfig(
    'Discord',
    'https://discord.gg/BhNbKWWfGV',
    '/assets/image/social/discord.svg'
  ),
  createSocialConfig(
    'Github',
    'https://github.com/ringecosystem/XAccount',
    '/assets/image/social/github.svg'
  ),
  createSocialConfig('Email', 'mailto:hello@ringecosystem.com', '/assets/image/social/email.svg')
];
