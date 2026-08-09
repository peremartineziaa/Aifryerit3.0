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
  userPrompt = `Crea EXACTAMENTE 3 recetas diferentes, saludables y deliciosas para Airfryer usando EXCLUSIVAMENTE los ingredientes disponibles indicados por el usuario.

INGREDIENTES DISPONIBLES:
${ingredients}

REGLAS ABSOLUTAS:

1. Debes generar EXACTAMENTE 3 recetas diferentes.
2. Las 3 recetas deben utilizar exclusivamente los ingredientes disponibles.
3. NO puedes añadir ningún ingrediente que el usuario no haya indicado.
4. NO añadas pescado, marisco, carne, pollo, huevos, queso, lácteos, arroz, pasta, pan, legumbres, frutas o verduras que el usuario NO haya indicado.
5. Solo puedes utilizar como ingredientes auxiliares:
   - sal
   - pimienta
   - especias
   - hierbas aromáticas
   - ajo
   - agua
   - una pequeña cantidad de aceite de oliva
6. Si el usuario indica "verduras", puedes utilizar verduras, pero no añadas ninguna proteína que no haya indicado.
7. NO sustituyas ingredientes.
8. NO inventes ingredientes.
9. NO añadas pescado salvo que el usuario indique pescado.
10. NO añadas marisco salvo que el usuario indique marisco.
11. Las 3 recetas deben ser realmente diferentes entre sí, variando preparación, corte, combinación o técnica de cocción.
12. Antes de responder, comprueba que TODOS los ingredientes utilizados en CADA receta pertenecen a los ingredientes disponibles o a los auxiliares permitidos.

Si hay pocos ingredientes, crea 3 versiones sencillas y diferentes utilizando únicamente esos ingredientes.

Las recetas deben estar orientadas a pérdida de peso y preparadas para Airfryer.

Límite aproximado de calorías por receta: ${calories || 400} kcal.

Devuelve ÚNICAMENTE JSON válido con esta estructura:

{
  "recipes": [
    {
      "title": "...",
      "description": "...",
      "prepTimeMinutes": 5,
      "cookTimeMinutes": 15,
      "temperatureCelsius": 190,
      "calories": 350,
      "proteinGrams": 30,
      "carbsGrams": 20,
      "fatGrams": 10,
      "ingredients": ["..."],
      "instructions": ["..."],
      "chefTip": "..."
    },
    {
      "title": "...",
      "description": "...",
      "prepTimeMinutes": 5,
      "cookTimeMinutes": 15,
      "temperatureCelsius": 190,
      "calories": 350,
      "proteinGrams": 30,
      "carbsGrams": 20,
      "fatGrams": 10,
      "ingredients": ["..."],
      "instructions": ["..."],
      "chefTip": "..."
    },
    {
      "title": "...",
      "description": "...",
      "prepTimeMinutes": 5,
      "cookTimeMinutes": 15,
      "temperatureCelsius": 190,
      "calories": 350,
      "proteinGrams": 30,
      "carbsGrams": 20,
      "fatGrams": 10,
      "ingredients": ["..."],
      "instructions": ["..."],
      "chefTip": "..."
    }
  ]
}`;
}

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
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

    if (
      !parsed.recipes ||
      !Array.isArray(parsed.recipes) ||
      parsed.recipes.length !== 3
    ) {
      return res.status(500).json({
        error: "El Chef IA no ha generado exactamente 3 recetas.",
      });
    }

    return res.json({
      success: true,
      recipes: parsed.recipes,
    });
  } catch {
    return res.status(500).json({
      error: "La respuesta del Chef IA no tiene un formato válido.",
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
