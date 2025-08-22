import React from "react";

export default function Home() {
  return (
    <section className="panel">
      <h2 className="section-title">Welcome</h2>
      <p>
        Use <strong>Manage</strong> to create <em>Categoriesssssss</em> and{" "}
        <em>Translations</em>. Each translation automatically gets a{" "}
        <span className="badge">startDate</span> (today).
      </p>
      <p>
        Use <strong>Quiz</strong> to practice. Pick a category and a date range
        to filter the questions.
      </p>
      <ul>
        <li>All data is saved locally in your browser (no backend).</li>
        <li>Deleting a category removes translations assigned to it.</li>
        <li>You can edit any item inline.</li>
      </ul>
      <div className="panel">
        <div className="label">Tip</div>
        <p>
          Hit <span className="kbd">Enter</span> in the answer input to check
          quickly.
        </p>
      </div>
    </section>
  );
}
