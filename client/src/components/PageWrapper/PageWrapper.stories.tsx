import { BrowserRouter } from "react-router-dom";
import { PageWrapper } from "./PageWrapper";

export default {
  title: "PageWrapper",
  component: PageWrapper,
};

export const DefaultPageWrapper = () => (
  <BrowserRouter>
    <PageWrapper pageTitle="Welcome to this page">
      Here goes anything you want!
    </PageWrapper>{" "}
  </BrowserRouter>
);
