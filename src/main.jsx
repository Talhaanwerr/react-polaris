import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
// import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider i18n={enTranslations}>
      <App />
    </AppProvider>
    ,
  </StrictMode>
);

// ReactDOM.render(
//   <AppProvider i18n={enTranslations}>
//     <Page title="Example app">
//       <LegacyCard sectioned>
//         <Button onClick={() => alert('Button clicked!')}>Example button</Button>
//       </LegacyCard>
//     </Page>
//   </AppProvider>,
//   document.querySelector('#app'),
// );
