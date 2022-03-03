// routes
import Router from './routes';
import { createBrowserHistory } from "history";
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  var hist = createBrowserHistory();
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router history={hist} />
    </ThemeConfig>
  );
}
