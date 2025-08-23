import React from "react";

export default function Home() {
  return (
    <section className="panel">
      <h2 className="section-title">Welcome to Your Translation App</h2>
      <p>
        Use the <strong>Manage</strong> tab to create <em>Categories</em> and <em>Translations</em>.
        Each translation is automatically assigned a <span className="badge">startDate</span> set to today.
      </p>
      <p>
        The <strong>Quiz</strong> tab lets you practice. Select a category and a date range to filter the questions.
      </p>
      <ul>
        <li>All your data is stored locally in your browser—no backend required.</li>
        <li>Deleting a category will also remove all translations associated with it.</li>
        <li>You can edit any item inline for quick updates.</li>
      </ul>
      <div className="panel">
        <div className="label">Quick Tip</div>
        <p>
          Press <span className="kbd">Enter</span> in the answer input to check your answer immediately.
        </p>
      </div>
    </section>
  );
}
