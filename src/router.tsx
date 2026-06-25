import Index from "./pages/Index";
import DemoPage from "./pages/DemoPage";
import LandingV2 from "./pages/LandingV2";
import DemoV2 from "./pages/DemoV2";
import CreatePage from "./pages/CreatePage";
import NotFound from "./pages/NotFound";

export const routers = [
  {
    path: "/",
    name: "home",
    element: <LandingV2 />,
  },
  {
    path: "/demo",
    name: "demo",
    element: <DemoV2 />,
  },
  {
    path: "/create",
    name: "create",
    element: <CreatePage />,
  },
  {
    path: "/v1",
    name: "landing-v1",
    element: <Index />,
  },
  {
    path: "/demo-v1",
    name: "demo-v1",
    element: <DemoPage />,
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


declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
