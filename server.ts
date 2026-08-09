import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());
  app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://peremartineziaa.github.io"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

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

      const systemInstruction = `Eres Chef AirFryFit, un nutricionista experto y chef especializado en recetas de freidora de aire (Airfryer) para perder peso y grasa corporal de forma saludable.

Tus respuestas deben estar siempre en español, con un tono motivador, profesional y cercano.

Proporciona instrucciones detalladas con temperatura exacta en Celsius (°C), tiempo en minutos, trucos para conseguir una textura crujiente sin exceso de aceite y desglose de macronutrientes (Calorías, Proteínas, Carbohidratos, Grasas).`;

      let userPrompt = prompt;

      if (type === "recipe_from_ingredients") {
        userPrompt = `Crea una receta saludable y deliciosa para Airfryer usando EXCLUSIVAMENTE los ingredientes disponibles indicados por el usuario.

INGREDIENTES DISPONIBLES:
${ingredients}

REGLA ABSOLUTA:
NO puedes añadir ningún ingrediente que no esté en la lista proporcionada.

NO añadas pescado, marisco, carne, pollo, huevos, queso, lácteos, arroz, pasta, pan, legumbres, frutas o verduras que el usuario NO haya indicado.

Solo puedes utilizar como ingredientes auxiliares:
- sal
- pimienta
- especias
- hierbas aromáticas
- ajo
- agua
- una pequeña cantidad de aceite de oliva

Si el usuario indica "verduras", puedes utilizar verduras, pero no añadas ninguna proteína que no haya indicado.

NO sustituyas ingredientes.
NO inventes ingredientes.
NO añadas pescado salvo que el usuario indique pescado.
NO añadas marisco salvo que el usuario indique marisco.

Antes de responder, comprueba que TODOS los ingredientes de la receta pertenecen a la lista proporcionada o a los auxiliares permitidos.

Si hay pocos ingredientes, crea una receta sencilla utilizando únicamente esos ingredientes.

La receta debe estar orientada a pérdida de peso y preparada para Airfryer.

Límite aproximado de calorías: ${calories || 400} kcal.

Incluye:
Nombre, descripción, tiempo de preparación, tiempo de cocción, temperatura, calorías, proteínas, carbohidratos, grasas, ingredientes exactos, pasos detallados y consejo del Chef.

Devuelve ÚNICAMENTE JSON válido con los campos:
title, description, prepTimeMinutes, cookTimeMinutes, temperatureCelsius, calories, proteinGrams, carbsGrams, fatGrams, ingredients, instructions, chefTip.`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType:
            type === "recipe_from_ingredients"
              ? "application/json"
              : "text/plain",
        },
      });

      const text = response.text;

      if (type === "recipe_from_ingredients") {
        try {
          const parsed = JSON.parse(text || "{}");
          return res.json({
            success: true,
            recipe: parsed,
          });
        } catch {
          return res.json({
            success: true,
            textResponse: text,
          });
        }
      }

      return res.json({
        success: true,
        textResponse: text,
      });
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
      server: {
        middlewareMode: true,
      },
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
