import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Recipe } from "./pages/Recipe";

function App() {
  return (
    <>
      <Router>
        <main className="container content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="*" exact={true} element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
