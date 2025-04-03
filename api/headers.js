export default function handler(req, res) {
    const userAgent = req.headers['user-agent'] || "";
  
    // ตรวจสอบว่ามาจาก TrueMoney หรือไม่
    const isTrueMoney = userAgent.toLowerCase().includes("truemoney");
  
    if (isTrueMoney) {
      console.log("✅ Request มาจาก TrueMoney mini app");
    } else {
      console.log("⚠️ ไม่ใช่ TrueMoney");
    }
  
    res.status(200).json({
      message: "Checked user agent",
      userAgent,
      isTrueMoney
    });
  }
  