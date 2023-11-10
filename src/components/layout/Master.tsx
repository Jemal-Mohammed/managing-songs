import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Hero from '../Hero';
import Footer from '../Footer';

export const Master = () => {
  const location = useLocation();
  const hideHeroForPaths = ['/search-results/:searchValue', '/edit-song/:id']; // Add the paths for which you want to hide the Hero component

  const shouldRenderHero = !hideHeroForPaths.includes(location.pathname);

  return (
    <>
      <Navbar />
      {shouldRenderHero && <Hero />}
      <Outlet />
      <Footer />
    </>
  );
};
