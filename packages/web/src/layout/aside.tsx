import { Nav } from './nav';
import { socialConfig } from '@/config/social';

export const Aside = () => {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-[20px] px-[20px] pb-[20px]">
      <div className="flex flex-col gap-[10px]">
        <a className="flex h-[76px] w-full items-center justify-center" href="/">
          <img src="/assets/image/logo.svg" className="h-[26px] w-[128px]" />
        </a>
        <Nav />
      </div>

      <footer className="flex items-center justify-around gap-[10px]">
        {socialConfig.map((social) => (
          <a
            href={social.url}
            key={social.name}
            title={social.name}
            className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-card transition-opacity duration-300 hover:opacity-80"
          >
            <img src={social.assetPath} className="size-[24px]" />
          </a>
        ))}
      </footer>
    </div>
  );
};
