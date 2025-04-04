export default function handler(req, res) {
    // ดึง header ที่เราสนใจ
    const accessToken = req.headers['access-token'] || "";
    const tokenType = req.headers['token-type'] || "";
    const expiresIn = req.headers['expires-in'] || "";
    const userAgent = req.headers['user-agent'] || "";
  
    // ตรวจสอบว่าเป็น TrueMoney มั้ย (ตาม pattern เดิม)
    const isTrueMoney = userAgent.toLowerCase().includes("truemoney");
    console.log("🧾 Full request headers:", req.headers);

  
    // log ทั้งหมดไว้ใน console (สามารถเก็บใน Firebase ได้ด้วย)
    console.log("📥 Headers received:");
    console.log("access-token:", accessToken);
    console.log("token-type:", tokenType);
    console.log("expires-in:", expiresIn);
    console.log("user-agent:", userAgent);
  
    res.status(200).json({
      message: "Received custom headers",
      headers: {
        accessToken,
        tokenType,
        expiresIn,
        userAgent
      },
      isTrueMoney,
      allHeaders: req.headers 
    });
  }
  