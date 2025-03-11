// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// ตั้งค่า Firebase (ใส่ค่าของคุณจาก Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyD3AyGr9ka3MRVUndiN1BHu80FttDmVJLQ",
    authDomain: "webtest-68f35.firebaseapp.com",
    databaseURL: "https://webtest-68f35-default-rtdb.firebaseio.com",
    projectId: "webtest-68f35",
    storageBucket: "webtest-68f35.firebasestorage.app",
    messagingSenderId: "964898727866",
    appId: "1:964898727866:web:c558c8ab1cd281fe6fdf83",
    measurementId: "G-L2GMCJ97EB"
};

// เริ่มต้น Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// 🔹 ฟังก์ชันสมัครสมาชิก
export const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("สมัครสมาชิกสำเร็จ! 🎉");
      return userCredential.user;
    } catch (error) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    }
  };
  
  // 🔹 ฟังก์ชันเข้าสู่ระบบ
  export const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert("เข้าสู่ระบบสำเร็จ!");
      return userCredential.user;
    } catch (error) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    }
  };
  
  // 🔹 ฟังก์ชันออกจากระบบ
  export const logoutUser = async () => {
    try {
      await signOut(auth);
      alert("ออกจากระบบสำเร็จ!");
    } catch (error) {
      alert("เกิดข้อผิดพลาด: " + error.message);
    }
  };
  
  // 🔹 ฟังก์ชันบันทึกข้อมูล (ชื่อและเบอร์โทร)
  export const saveContact = (userId, name, phone) => {
    if (!userId) {
      alert("กรุณาเข้าสู่ระบบก่อน");
      return;
    }
  
    set(ref(db, "users/" + userId + "/contacts/" + phone), {
      name: name,
      phone: phone
    })
      .then(() => {
        alert("บันทึกข้อมูลสำเร็จ!");
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาด: ", error);
        alert("เกิดข้อผิดพลาด: " + error.message);
      });
  };
  
  // 🔹 ฟังก์ชันค้นหาชื่อจากเบอร์โทร
  export const getContactByPhone = async (userId, phone) => {
    if (!userId) {
      alert("กรุณาเข้าสู่ระบบก่อน");
      return;
    }
  
    const dbRef = ref(db);
    try {
      const snapshot = await get(child(dbRef, `users/${userId}/contacts/${phone}`));
      if (snapshot.exists()) {
        return snapshot.val().name;
      } else {
        return "ไม่พบข้อมูล";
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด: ", error);
      return "เกิดข้อผิดพลาด";
    }
  
};
