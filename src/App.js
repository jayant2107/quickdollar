import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import GaspilRoutes from "./Routes/Allroutes";
import AppLocale from "./Utils/AppLocal/Index";
import { defaultTheme, nightMode } from "./Utils/constants";

function App() {
  const language = useSelector((state) => state.selectLang.language);
  const byDay = useSelector((state) => state?.changeColors?.theme);
  const currentAppLocale = AppLocale[language];


  return (
    <div className="App">
      <ToastContainer />
      <ThemeProvider theme={byDay == "day" ? defaultTheme : nightMode}>
        <IntlProvider
          // locale={currentAppLocale}
          // defaultLocale="en"
          messages={currentAppLocale.messages}
        >
          <GaspilRoutes />
        </IntlProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
