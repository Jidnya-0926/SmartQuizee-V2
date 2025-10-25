import React, { useState } from "react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users") || "[]"));
    setAttempts(JSON.parse(localStorage.getItem("attempts") || "[]"));
  }, []);

  const deactivate = email => {
    if (!window.confirm("Deactivate user?")) return;
    const updated = users.map(u => u.email === email ? { ...u, deactivated: true } : u);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  return (
    <div className="card">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Quizzes Attempted</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => {
            const userAttempts = attempts.filter(a => a.userEmail === u.email);
            return (
              <tr key={i}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{userAttempts.length}</td>
                <td>
                  <button onClick={() => deactivate(u.email)}>
                    {u.deactivated ? "Deactivated" : "Deactivate"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
