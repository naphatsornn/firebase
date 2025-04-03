import React, { useState, useEffect } from "react";
import { registerUser, loginUser, logoutUser, saveContact, getContactByPhone } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [foundName, setFoundName] = useState("");

  const [accessToken, setAccessToken] = useState("");

  // ✅ โหลด accessToken จาก global variable ที่ฝังมาจาก server
  useEffect(() => {
    const token = window.accessToken || "";
    setAccessToken(token);
    console.log("Access Token from header:", token);
  }, []);

  // ตรวจสอบว่า User Login อยู่หรือไม่
  const auth = getAuth();
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleRegister = () => {
    registerUser(email, password);
  };

  const handleLogin = () => {
    loginUser(email, password);
  };

  const handleLogout = () => {
    logoutUser();
  };

  const handleSaveContact = () => {
    if (user) {
      saveContact(user.uid, name, phone);
      setName("");
      setPhone("");
    } else {
      alert("กรุณาเข้าสู่ระบบก่อน");
    }
  };

  const handleSearchContact = async () => {
    if (user) {
      const result = await getContactByPhone(user.uid, searchPhone);
      setFoundName(result);
    } else {
      alert("กรุณาเข้าสู่ระบบก่อน");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🔐 ระบบล็อกอิน</h2>
      <p>🟢 Access Token: <code>{accessToken}</code></p>

      <input type="email" placeholder="อีเมล" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="รหัสผ่าน" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleRegister}>สมัครสมาชิก</button>
      <button onClick={handleLogin}>เข้าสู่ระบบ</button>
      <button onClick={handleLogout}>ออกจากระบบ</button>

      {user && (
        <>
          <h2>📞 บันทึกเบอร์โทร</h2>
          <input type="text" placeholder="ชื่อ" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="เบอร์โทร" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button onClick={handleSaveContact}>บันทึก</button>

          <h2>🔍 ค้นหาชื่อจากเบอร์</h2>
          <input type="text" placeholder="กรอกเบอร์โทร" value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} />
          <button onClick={handleSearchContact}>ค้นหา</button>

          {foundName && <h3>📌 ชื่อที่พบ: {foundName}</h3>}
        </>
      )}
    </div>
  );
}

export default App;
