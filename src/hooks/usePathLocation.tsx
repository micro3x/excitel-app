import { matchPath, useLocation } from 'react-router-dom';
import { DefinedRoutes } from '../rulesets/navigation';

const usePathLocation = (): string | undefined => {
  const { pathname } = useLocation();
  return Object.values(DefinedRoutes).find((route) => matchPath(route, pathname));
};

export default usePathLocation;
