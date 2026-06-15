import Index from "./pages/Index";
import DemoPage from "./pages/DemoPage";
import LandingV2 from "./pages/LandingV2";
import DemoV2 from "./pages/DemoV2";
import NotFound from "./pages/NotFound";

export const routers = [
  {
    path: "/",
    name: "home",
    element: <Index />,
  },
  {
    path: "/demo",
    name: "demo",
    element: <DemoPage />,
  },
  {
    path: "/v2",
    name: "landing-v2",
    element: <LandingV2 />,
  },
  {
    path: "/demo-v2",
    name: "demo-v2",
    element: <DemoV2 />,
  },
  /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
  {
    path: "*",
    name: "404",
    element: <NotFound />,
  },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
