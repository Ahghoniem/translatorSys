import React, { useMemo, useState } from "react";

export default function CategoryManager({
  categories,
  addCategory,
  updateCategory,
  deleteCategory,
  onCascadeDelete,
}) {
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const total = useMemo(() => categories.length, [categories]);

  const onAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCategory(name.trim());
    setName("");
  };

  const startEdit = (c) => {
    setEditId(c.id);
    setEditName(c.name);
  };
  const saveEdit = () => {
    if (editName.trim()) {
      updateCategory(editId, editName.trim());
      setEditId(null);
      setEditName("");
    }
  };

  return (
    <section className="panel">
      <h2 className="section-title">
        Categories <span className="badge">{total}</span>
      </h2>
      <form onSubmit={onAdd} className="row" style={{ marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div className="label">Name</div>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Idioms"
          />
        </div>
        <div style={{ alignSelf: "end" }}>
          <button className="btn primary" type="submit">
            Add
          </button>
        </div>
      </form>

      <div className="grid">
        {categories.map((c) => (
          <div key={c.id} className="panel" style={{ padding: 12 }}>
            {editId === c.id ? (
              <div className="row">
                <input
                  className="input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button className="btn primary" onClick={saveEdit}>
                  Save
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setEditId(null);
                    setEditName("");
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong>{c.name}</strong>
                  <div className="row">
                    <button className="btn" onClick={() => startEdit(c)}>
                      Edit
                    </button>
                    <button
                      className="btn danger"
                      onClick={() => {
                        if (
                          confirm(
                            "Delete category? Items in it will be removed."
                          )
                        ) {
                          deleteCategory(c.id);
                          onCascadeDelete?.(c.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="label">
                  ID: <span className="kbd">{c.id.slice(0, 8)}</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
