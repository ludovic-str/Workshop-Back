// routes
import { useSelector } from 'react-redux';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

// ----------------------------------------------------------------------

export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router loggedIn={isAuthenticated} />
    </ThemeProvider>
  );
}
