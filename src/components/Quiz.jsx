import React, { useMemo, useState } from "react";

export default function Quiz({ translations, categories }) {
  const [categoryId, setCategoryId] = useState("");
  const today = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const pool = useMemo(() => {
    return translations.filter(
      (t) =>
        (!categoryId || t.categoryId === categoryId) &&
        (!startDate || t.startDate >= startDate) &&
        (!endDate || t.startDate <= endDate)
    );
  }, [translations, categoryId, startDate, endDate]);

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const current = pool[index] || null;

  const check = () => {
    if (!current) return;
    const ok = current.word.trim().toLowerCase();
    const given = answer.trim().toLowerCase();
    setFeedback(
      given === ok ? "✅ Correct" : `❌ Wrong — Correct: ${current.word}`
    );
  };

  const next = () => {
    setAnswer("");
    setFeedback("");
    if (pool.length > 0) {
      setIndex((index + 1) % pool.length);
    }
  };

  return (
    <section className="panel">
      <h2 className="section-title">Quiz</h2>

      <div className="form" style={{ marginBottom: 12 }}>
        <div>
          <div className="label">Category</div>
          <select
            className="input"
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setIndex(0);
            }}
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="label">Start date</div>
          <input
            type="date"
            className="input date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setIndex(0);
            }}
          />
        </div>
        <div>
          <div className="label">End date</div>
          <input
            type="date"
            className="input date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setIndex(0);
            }}
          />
        </div>
      </div>

      {pool.length === 0 ? (
        <div className="panel">No questions found with these filters.</div>
      ) : (
        <div className="panel">
          <div className="label">Expression</div>
          <div style={{ fontSize: 18, marginBottom: 8 }}>
            <strong>{current.expression}</strong>
          </div>

          <div className="row" style={{ marginBottom: 8 }}>
            <input
              className="input"
              placeholder="Type your answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") check();
              }}
            />
            <button className="btn primary" onClick={check}>
              Check
            </button>
            <button className="btn" onClick={next}>
              Next
            </button>
          </div>
          {feedback && <div style={{ marginTop: 6 }}>{feedback}</div>}
          <div className="label" style={{ marginTop: 6 }}>
            Pool: {pool.length} items
          </div>
        </div>
      )}
    </section>
  );
}
