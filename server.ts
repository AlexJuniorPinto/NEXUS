import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Simulated Infrastructure ---
const processedMessageIds = new Set<string>();
const webhookQueue: any[] = [];

// Simulated Worker
async function startWorker() {
  console.log("Worker started...");
  while (true) {
    if (webhookQueue.length > 0) {
      const event = webhookQueue.shift();
      console.log(`[Worker] Processing message ${event.messageId} for tenant ${event.tenantId}`);
      
      // Simulate processing (IA call, DB update)
      await new Promise(resolve => setTimeout(resolve, 500)); 
      
      console.log(`[Worker] Finished processing ${event.messageId}`);
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // 1. Webhook Ingestion
  app.post("/api/webhooks/whatsapp", async (req, res) => {
    const { messageId, tenantId, payload } = req.body;

    if (!messageId || !tenantId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Idempotency
    const lockKey = `${tenantId}:${messageId}`;
    if (processedMessageIds.has(lockKey)) {
      return res.status(200).json({ status: "duplicate_ignored" });
    }
    processedMessageIds.add(lockKey);

    // Push to queue
    webhookQueue.push({ messageId, tenantId, payload });

    res.status(200).json({ status: "queued" });
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

  startWorker();
}

startServer();
