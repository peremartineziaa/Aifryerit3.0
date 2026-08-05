import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "AirFryFit" });
  });

  // AI Chef Endpoint using Gemini
  app.post("/api/ai-chef", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "API Key GEMINI_API_KEY no está configurada.",
        });
      }

      const { prompt, type, ingredients, calories } = req.body;

      const ai = new GoogleGenAI({ apiKey });

      let systemInstruction = `Eres Chef AirFryFit, un nutricionista experto y chef especializado en recetas de freidora de aire (Airfryer) para perder peso y grasa corporal de forma saludable.
Tus respuestas deben estar siempre en español, con un tono motivador, profesional y cercano.
Proporciona instrucciones detalladas con temperatura exacta en Celsius (°C), tiempo en minutos, trucos para crujiente sin aceite y desglose de macronutrientes (Calorías, Proteínas, Carbohidratos, Grasas).`;

      let userPrompt = prompt;
      if (type === "recipe_from_ingredients") {
        userPrompt = `Crea una receta rápida y deliciosa para Airfryer orientada a la pérdida de peso usando estos ingredientes disponibles: ${ingredients}. Límite aproximado de calorías: ${calories || 400} kcal. Incluye: Nombre, Tiempo (min), Temp (°C), Calorías, Proteínas, Carbos, Grasas, Ingredientes exactos, Pasos detallados y un Consejo del Chef. Devuelve la respuesta en JSON estructurado con los campos: title, description, prepTimeMinutes, cookTimeMinutes, temperatureCelsius, calories, proteinGrams, carbsGrams, fatGrams, ingredients (array de strings), instructions (array de strings), chefTip.`;
      } else if (type === "custom_menu") {
        userPrompt = `Genera un menú semanal equilibrado de 7 días (Lunes a Domingo) para freidora de aire enfocado en adelgazar. Preferencias/Restricciones: ${prompt || "Equilibrado bajo en calorías"}. Incluye Desayuno, Comida, Cena y Snack para cada día con calorías aproximadas. Devuelve un formato claro y estructurado en Markdown.`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: type === "recipe_from_ingredients" ? "application/json" : "text/plain",
        },
      });

      const text = response.text;
      if (type === "recipe_from_ingredients") {
        try {
          const parsed = JSON.parse(text || "{}");
          return res.json({ success: true, recipe: parsed });
        } catch {
          return res.json({ success: true, textResponse: text });
        }
      }

      return res.json({ success: true, textResponse: text });
    } catch (err: any) {
      console.error("Error in AI Chef:", err);
      return res.status(500).json({
        error: "Error procesando la solicitud con el Chef AI",
        message: err.message || String(err),
      });
    }
  });

  // Vite middleware for dev or static serving for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
