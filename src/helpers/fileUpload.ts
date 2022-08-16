import { CloudinaryResponse } from "../interface/Cloudinary";

export const fileUpload = async(fileToCloud: File) => {
  try {
    if (!fileToCloud) return null
    //if (!fileToCloud) throw new Error('Archivo no especificado para subir a cloudinary')
    /* const urlClodinary = import.meta.env.VITE_CLOU_URL;

    const formData = new FormData();
    formData.append('upload_preset', 'React-journal');
    formData.append('file', fileToCloud);

    const response = await fetch(urlClodinary, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) new Error('Ha ocurrido un error al subir la imagen');

    return await response.json(); */
    return true

  } catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
  }
}