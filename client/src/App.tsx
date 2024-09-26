import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { SavedWordsPage } from "./components/SavedWordsPage";
import { SearchPage } from "./components/SearchPage";
import { APP_ROUTES } from "./contants";
import { UserProvider } from "./contexts/UserContext";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path={APP_ROUTES.SEARCH} element={<SearchPage />} />
          <Route path={APP_ROUTES.SAVED_WORDS} element={<SavedWordsPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
