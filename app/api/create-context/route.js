import { NextResponse } from 'next/server';
import unzipper from 'unzipper';

export const config = {
  api: {
    bodyParser: false, // Desactivar el bodyParser para recibir el archivo sin procesarlo
  },
};

export async function POST(req) {
  const chunks = [];
  
  // Leer los datos del archivo del cuerpo de la solicitud
  for await (const chunk of req.body) {
    chunks.push(chunk);
  }
  
  // Convertir los chunks en un buffer
  const buffer = Buffer.concat(chunks);
  
  // Procesar el archivo ZIP
  const projectJSON = await generateProjectJSON(buffer);
  
  return NextResponse.json(projectJSON);
}

async function generateProjectJSON(zipBuffer) {
  const project = {
    project_name: "Nombre del Proyecto",
    description: "Descripción no fue otorgada",
    structure: []
  };

  // Abrir el archivo ZIP en memoria
  const directory = await unzipper.Open.buffer(zipBuffer);
  
  for (const file of directory.files) {
    if (file.path.endsWith("README.md")) {
      const readmeContent = await file.buffer();
      project.description = readmeContent.toString();
    }
    
    let folder = project.structure.find(f => f.path === file.path.split("/")[0]);
    
    if (!folder) {
      folder = { path: file.path.split("/")[0], files: [] };
      project.structure.push(folder);
    }
    
    const fileContent = await file.buffer();
    folder.files.push({ name: file.path.split("/").pop(), content: fileContent.toString() });
  }
  
  return project;
}