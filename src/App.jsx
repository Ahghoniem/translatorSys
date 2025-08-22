import React, { useState } from "react";
import Home from "./pages/Home.jsx";
import Manage from "./pages/Manage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import { useCategories } from "./hooks/useCategories.js";
import { useTranslations } from "./hooks/useTranslations.js";

export default function App() {
  const [tab, setTab] = useState("home");
  const cat = useCategories();
  const trans = useTranslations();

  return (
    <div className="container">
      <header className="app-header">
        <h1>English ↔ English Trainer</h1>
        <nav className="tabs">
          <button
            className={tab === "home" ? "active" : ""}
            onClick={() => setTab("home")}
          >
            Home
          </button>
          <button
            className={tab === "manage" ? "active" : ""}
            onClick={() => setTab("manage")}
          >
            Manage
          </button>
          <button
            className={tab === "quiz" ? "active" : ""}
            onClick={() => setTab("quiz")}
          >
            Quiz
          </button>
        </nav>
      </header>

      <main>
        {tab === "home" && <Home />}
        {tab === "manage" && <Manage {...cat} {...trans} />}
        {tab === "quiz" && (
          <QuizPage
            categories={cat.categories}
            translations={trans.translations}
          />
        )}
      </main>

      <footer className="app-footer">
        Data is stored in your browser (localStorage).
      </footer>
    </div>
  );
}
