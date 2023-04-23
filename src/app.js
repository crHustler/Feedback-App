import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import { FeedbackProvider } from "./context/FeedbackContext";

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Header />
                  <FeedbackForm/>
                  <FeedbackStats/>
                  <FeedbackList
                  />
                  <AboutIconLink />
                </>
              }
            />
            <Route exact path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
