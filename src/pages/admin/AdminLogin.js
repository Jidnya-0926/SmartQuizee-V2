import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_CREDENTIALS } from "../../utils/helpers";

export default function AdminLogin({ onAdminLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      onAdminLogin({ name: ADMIN_CREDENTIALS.name, email });
      navigate("/admin");
    } else {
      alert("Invalid admin credential");
    }
  };

  return (
    <div className="card" style={{maxWidth:420}}>
      <h2 className="center">Admin Login</h2>
      <form onSubmit={submit}>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div style={{marginTop:10}}>
          <button type="submit">Login as Admin</button>
        </div>
      </form>
    </div>
  );
}
