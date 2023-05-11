import React, { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './styles.scss';
import usePathLocation from '../../hooks/usePathLocation';
import { DefinedRoutes } from '../../rulesets/navigation';

const Layout = () => {
  const pathname = usePathLocation();
  const navigate = useNavigate();

  const handleNavigation = useCallback((route: string) => {
    navigate(route);
  }, []);

  return (
    <div className="layout">
      <nav>
        <ul>
          <li
            className={pathname === DefinedRoutes.HOME ? 'active' : ''}
            onClick={() => handleNavigation(DefinedRoutes.HOME)}
          >
            Home
          </li>
          <li
            className={pathname === DefinedRoutes.SEARCH ? 'active' : ''}
            onClick={() => handleNavigation(DefinedRoutes.SEARCH)}
          >
            Search
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
