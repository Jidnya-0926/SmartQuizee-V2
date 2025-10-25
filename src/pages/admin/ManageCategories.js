import React, { useState } from "react";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=>setCategories(JSON.parse(localStorage.getItem("categories") || "[]")),[]);

  const addCategory = () => {
    const name = prompt("Category name:");
    if(!name) return;
    const newC = { id: Date.now(), name };
    const updated = [...categories,newC];
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
  };

  const removeCategory = id => {
    if(!window.confirm("Delete category?")) return;
    const updated = categories.filter(c=>c.id!==id);
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
  };

  const filtered = categories.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="card">
      <h2>Manage Categories</h2>
      <div className="row">
        <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <button onClick={addCategory}>Add Category</button>
      </div>
      <table style={{width:"100%", marginTop:12}}>
        <thead><tr><th>Name</th><th>Action</th></tr></thead>
        <tbody>
          {filtered.map(c=>(
            <tr key={c.id}>
              <td>{c.name}</td>
              <td><button onClick={()=>removeCategory(c.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
