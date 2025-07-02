import './App.css';
import Navbar from './Pages/Navbar';
import { AllRoutes } from './Routes/AllRoutes';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  // List of routes where Navbar should be hidden
  const hideNavbarRoutes = ['/', '/SignUP','/Login','/Admin']; // adjust as needed

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <AllRoutes />
    </>
  );
}

export default App;
