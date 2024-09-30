"use client";

import { FolderArchive } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    
    const [file, setFile] = useState(null)

    useEffect(() => {
        console.log(file)
    }, [file])


    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', file);
      
        try {
          const response = await axios.post('/api/create-context', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          // Aquí puedes manejar la respuesta (descargar el JSON o mostrar el resultado)
          console.log(response.data);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };

    return (
        <section className='flex justify-center items-center min-h-screen h-full'>
            <div className='flex flex-col gap-10 items-center'>
                <div className='flex flex-col gap-0 justify-center items-center'>
                    <h1 className='text-[100px] text-teal-400 font-bold'>
                        Contextualizer
                    </h1>
                    <p>
                        A simple app to help you contextualize your thoughts
                    </p>
                </div>
                
                <div class="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" class="flex flex-col items-center justify-center w-full h-32 border-2  border-dashed rounded-lg cursor-pointer bg-gray-700 border-teal-600 hover:border-gray-500 hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <FolderArchive size={48} strokeWidth={2.5} className='text-teal-500'/>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                               {file?.name? ( <span>{file.name}  </span>) : (<span> ZIP  </span> ) } 
                            </p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" onChange={handleFileChange} />
                    </label>
                </div> 

                <button className='border border-teal-600 rounded-md p-3 w-1/6 hover:bg-teal-500 ' 
                onClick={handleSubmit}>
                    submit
                </button>
                
            </div>
        </section>
    )
}

export default Home