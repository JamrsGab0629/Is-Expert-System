import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AssessmentProvider } from "./context/AssessmentContext";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import QuestionBank from "./pages/QuestionBank";
import Review from "./pages/Review";

export default function App() {
  return (
    <AssessmentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/assessment"
            element={
              <Layout>
                <Assessment />
              </Layout>
            }
          />
          <Route
            path="/questions"
            element={
              <Layout>
                <QuestionBank />
              </Layout>
            }
          />
          <Route
            path="/review"
            element={
              <Layout>
                <Review />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AssessmentProvider>
  );
}