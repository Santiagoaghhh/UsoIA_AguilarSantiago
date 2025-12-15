import fs from "fs";
import { encoding_for_model } from "tiktoken";

async function contarTokensLibro() {

  const texto = fs.readFileSync("./cienlibro.txt", "utf8");


  const modelo = "gpt-4";
  const encoding = encoding_for_model(modelo);

 
  const tokens = encoding.encode(texto);
  console.log("Cantidad de caracteres y simbolos",texto.length);


  console.log(" Archivo analizado: cienAñosSoledad.txt");
  console.log(" Modelo usado:", modelo);
  console.log(" Cantidad de tokens:", tokens.length);


  const costoPorMilTokens = 0.03; 
  const costo = (tokens.length * costoPorMilTokens) / 1000;

  console.log(`Costo estimado (entrada): $${costo.toFixed(6)} USD`);
}

contarTokensLibro();