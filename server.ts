import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Proxy endpoint to bypass CORS for Now Playing API
  app.get("/api/proxy/nowplaying", async (req, res) => {
    const endpoints = [
      "https://radioiqraburkina.com/api/nowplaying",
      "https://radioiqraburkina.com/api/now_playing",
      "https://a10.asurahosting.com/api/nowplaying"
    ];

    let lastError = null;

    for (const url of endpoints) {
      try {
        console.log(`Attempting to fetch nowplaying from: ${url}`);
        const response = await axios.get(url, {
          timeout: 5000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/json'
          }
        });
        
        if (response.status === 200) {
          console.log(`Successfully fetched from: ${url}`);
          return res.json(response.data);
        }
      } catch (error: any) {
        console.warn(`Failed to fetch from ${url}: ${error.message}`);
        lastError = error;
      }
    }

    console.error("All nowplaying endpoints failed.");
    res.status(500).json({ 
      error: "Failed to fetch from all radio API endpoints",
      details: lastError?.message || "Unknown error"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
