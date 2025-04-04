export default function handler(req, res) {
  const accessToken = req.headers['tmn-access-token'] || "";
  const tokenType = req.headers['tmn-token-type'] || "";
  const expiresIn = req.headers['tmn-expires-in'] || "";
  const userAgent = req.headers['user-agent'] || "";

  const isTrueMoney = userAgent.toLowerCase().includes("truemoney");

  console.log("🧾 Full request headers:", req.headers);
  console.log("📥 Headers received:");
  console.log("access-token:", accessToken);
  console.log("token-type:", tokenType);
  console.log("expires-in:", expiresIn);
  console.log("user-agent:", userAgent);

  // ✅ ส่ง header กลับ และตั้ง cookie (เหมือน middleware)
  res.setHeader('Set-Cookie', [
    `accessToken=${encodeURIComponent(accessToken)}; Path=/; HttpOnly`,
    `userAgent=${encodeURIComponent(userAgent)}; Path=/; HttpOnly`
  ]);

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
