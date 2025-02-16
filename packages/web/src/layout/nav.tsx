import { routes } from '@/config/route';
import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

export const Nav = () => {
  const location = useLocation();

  return (
    <nav className="flex w-full flex-col gap-[10px]">
      {routes.map((route) => {
        const isActive =
          location.pathname === route.pathname ||
          location.pathname.startsWith(route.pathname + '/');

        return (
          <Link
            key={route.key}
            to={route.pathname}
            className={cn(
              'group flex h-[60px] w-full items-center gap-[10px] rounded-[10px] px-[30px] capitalize',
              'transition-all duration-300 hover:bg-foreground hover:font-semibold hover:text-card',
              isActive && 'bg-foreground font-semibold text-card'
            )}
          >
            <div className="relative h-[32px] w-[32px]">
              <img
                src={`/assets/image/nav/${route.key}.svg`}
                className={cn(
                  'absolute size-[32px] transition-opacity duration-200',
                  'group-hover:opacity-0'
                )}
              />
              <img
                src={`/assets/image/nav/${route.key}-active.svg`}
                className={cn(
                  'absolute size-[32px] transition-opacity duration-200',
                  isActive ? 'opacity-100' : 'opacity-0',
                  'group-hover:opacity-100'
                )}
              />
            </div>
            <span>{route.key}</span>
          </Link>
        );
      })}
    </nav>
  );
};
