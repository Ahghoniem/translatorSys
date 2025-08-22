import React, { useMemo, useState } from "react";

export default function TranslationManager({
  categories,
  translations,
  addTranslation,
  updateTranslation,
  deleteTranslation,
}) {
  const [form, setForm] = useState({
    expression: "",
    word: "",
    categoryId: "",
  });
  const [editingId, setEditingId] = useState(null);

  const byCatName = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.name])),
    [categories]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.expression.trim() || !form.word.trim() || !form.categoryId)
      return;
    addTranslation({
      expression: form.expression.trim(),
      word: form.word.trim(),
      categoryId: form.categoryId,
    });
    setForm({ expression: "", word: "", categoryId: "" });
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setForm({
      expression: t.expression,
      word: t.word,
      categoryId: t.categoryId,
    });
  };
  const saveEdit = () => {
    if (!form.expression.trim() || !form.word.trim() || !form.categoryId)
      return;
    updateTranslation(editingId, {
      expression: form.expression.trim(),
      word: form.word.trim(),
      categoryId: form.categoryId,
    });
    setEditingId(null);
    setForm({ expression: "", word: "", categoryId: "" });
  };

  return (
    <section className="panel">
      <h2 className="section-title">
        Translations <span className="badge">{translations.length}</span>
      </h2>

      <form
        onSubmit={
          editingId
            ? (e) => {
                e.preventDefault();
                saveEdit();
              }
            : onSubmit
        }
        className="form"
        style={{ marginBottom: 12 }}
      >
        <div>
          <div className="label">Expression</div>
          <input
            className="input"
            value={form.expression}
            onChange={(e) => setForm({ ...form, expression: e.target.value })}
            placeholder="e.g. break the ice"
          />
        </div>
        <div>
          <div className="label">Word / Answer</div>
          <input
            className="input"
            value={form.word}
            onChange={(e) => setForm({ ...form, word: e.target.value })}
            placeholder="e.g. initiate conversation"
          />
        </div>
        <div>
          <div className="label">Category</div>
          <select
            className="input"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          >
            <option value="">Select…</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ alignSelf: "end" }}>
          {editingId ? (
            <>
              <button className="btn primary" type="button" onClick={saveEdit}>
                Save
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ expression: "", word: "", categoryId: "" });
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="btn primary" type="submit">
              Add
            </button>
          )}
        </div>
      </form>

      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Expression</th>
              <th>Answer</th>
              <th>Category</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
         <tbody>
  {translations.map((t, i) => (
    <tr key={t.id}>
      <td data-label="#"> {i + 1} </td>
      <td data-label="Expression">{t.expression}</td>
      <td data-label="Answer">{t.word}</td>
      <td data-label="Category">
        <span className="badge">{byCatName[t.categoryId] || "—"}</span>
      </td>
      <td data-label="Start Date">{t.startDate}</td>
      <td data-label="Actions">
        <div className="row">
          <button className="btn" onClick={() => startEdit(t)}>Edit</button>
          <button className="btn danger" onClick={() => deleteTranslation(t.id)}>Delete</button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </section>
  );
}
