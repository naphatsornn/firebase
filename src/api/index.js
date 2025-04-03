// api/index.js
export default async function handler(req, res) {
    const accessToken = req.headers["tmn-access-token"] || req.headers["authorization"] || "";
    const userAgent = req.headers["user-agent"] || "";
    
  
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Mini App</title>
          <script>window.accessToken = "${accessToken}";</script>
          <script>window.userAgent = "${userAgent}";</script>
        </head>
        <body>
          <div id="root"></div>
          <script src="/static/js/bundle.js"></script>
        </body>
      </html>
    `;
  
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  }
  