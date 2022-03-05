// routes
import Router from './routes';
import { createBrowserHistory } from "history";
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ----------------------------------------------------------------------

export default function App() {
  var hist = createBrowserHistory();
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router history={hist} />
      <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </ThemeConfig>
  );
}
