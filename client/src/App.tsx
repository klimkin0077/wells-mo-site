/*
Design reminder for this file:
Маршрутизация должна поддерживать полноценный многостраничный сайт с тёмной премиальной темой как базовой средой для всех экранов.
*/

import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import {
  AboutPage,
  CleaningPage,
  ContactsPage,
  DeepeningPage,
  FAQPage,
  HomePage,
  WaterproofingPage,
  WellBracingPage,
  DrainageWellPage,
  WellDiggingPage,
  SepticPage,
  LocalCityPage,
  LocalCityServicePage,
  LocalDistrictPage,
  PricingPage,
  RepairPage,
  SeoAreasPage,
  ServicesPage,
  WaterSupplyPage,
  WorksPage,
} from "./pages/SitePages";

const routerBase = (() => {
  if (typeof window === "undefined") {
    return "";
  }

  const { hostname, pathname } = window.location;

  if (hostname === "klimkin0077.github.io") {
    return pathname.startsWith("/wells-mo-site") ? "/wells-mo-site" : "";
  }

  return "";
})();

function SiteRouter() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/uslugi" component={ServicesPage} />
      <Route path="/chistka-kolodcev" component={CleaningPage} />
      <Route path="/remont-kolodcev" component={RepairPage} />
      <Route path="/gidroizolyaciya-shvov" component={WaterproofingPage} />
      <Route path="/skobirovanie-kolodca" component={WellBracingPage} />
      <Route path="/drenazhnyy-kolodec" component={DrainageWellPage} />
      <Route path="/kopka-kolodcev" component={WellDiggingPage} />
      <Route path="/septik-iz-zhbi-kolec" component={SepticPage} />
      <Route path="/septik-iz-zhb-kolec" component={SepticPage} />
      <Route path="/uglublenie-kolodcev" component={DeepeningPage} />
      <Route path="/vodosnabzhenie-iz-kolodca-v-dom" component={WaterSupplyPage} />
      <Route path="/vodoprovod-iz-kolodca-v-dom" component={WaterSupplyPage} />
      <Route path="/ceny" component={PricingPage} />
      <Route path="/ceny/" component={PricingPage} />
      <Route path="/price" component={PricingPage} />
      <Route path="/price/" component={PricingPage} />
      <Route path="/nashi-raboty" component={WorksPage} />
      <Route path="/o-kompanii" component={AboutPage} />
      <Route path="/o-nas" component={AboutPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/rajony-rabot" component={SeoAreasPage} />
      <Route path="/goroda/odintsovo" component={() => <LocalCityPage slug="odincovo" />} />
      <Route path="/goroda/:citySlug/:serviceSlug">
        {(params) => <LocalCityServicePage citySlug={params.citySlug} serviceSlug={params.serviceSlug} />}
      </Route>
      <Route path="/goroda/:slug">{(params) => <LocalCityPage slug={params.slug} />}</Route>
      <Route path="/rajony/:slug">{(params) => <LocalDistrictPage slug={params.slug} />}</Route>
      <Route path="/kontakty" component={ContactsPage} />
      <Route path="/contacts" component={ContactsPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <WouterRouter base={routerBase}>
          <SiteRouter />
        </WouterRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
