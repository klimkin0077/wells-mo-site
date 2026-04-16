/*
Design reminder for this file:
Маршрутизация должна поддерживать полноценный многостраничный сайт с тёмной премиальной темой как базовой средой для всех экранов.
*/

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import {
  AboutPage,
  CleaningPage,
  ContactsPage,
  DeepeningPage,
  FAQPage,
  HomePage,
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/uslugi" component={ServicesPage} />
      <Route path="/chistka-kolodcev" component={CleaningPage} />
      <Route path="/remont-kolodcev" component={RepairPage} />
      <Route path="/uglublenie-kolodcev" component={DeepeningPage} />
      <Route path="/vodosnabzhenie-iz-kolodca-v-dom" component={WaterSupplyPage} />
      <Route path="/ceny" component={PricingPage} />
      <Route path="/nashi-raboty" component={WorksPage} />
      <Route path="/o-kompanii" component={AboutPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/rajony-rabot" component={SeoAreasPage} />
      <Route path="/goroda/:citySlug/:serviceSlug">
        {(params) => <LocalCityServicePage citySlug={params.citySlug} serviceSlug={params.serviceSlug} />}
      </Route>
      <Route path="/goroda/:slug">{(params) => <LocalCityPage slug={params.slug} />}</Route>
      <Route path="/rajony/:slug">{(params) => <LocalDistrictPage slug={params.slug} />}</Route>
      <Route path="/kontakty" component={ContactsPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
