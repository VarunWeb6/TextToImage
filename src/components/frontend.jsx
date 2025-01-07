import React, { useState } from 'react';

export default function Frontend() {
  const token = "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";

  const [inputText, setInputText] = useState('');
  const [imageURL, setImageURL] = useState('');

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ "inputs": data }),
      }
    );
    const result = await response.blob();
    return result;
  }

  const handleClick = () => {
    query(inputText).then((response) => {
      const objectURL = URL.createObjectURL(response);
      setImageURL(objectURL);
    });
  };

  return (
    <div className='h-screen w-full bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center space-y-6'>
        <h1 className='mt-14 text-3xl font-semibold'>Enter Your Prompt</h1>
        <input
          className='p-3 text-xl rounded-lg border-4 border-pink-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-black shadow-xl w-72'
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)} // Handle input change
        />
        <button
          className="p-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-bold shadow-xl hover:scale-105 transform transition"
          onClick={handleClick}
        >
          Generate Image
        </button>
        {imageURL && (
          <img
            src={imageURL}
            alt="Generated"
            className="rounded-lg shadow-2xl mt-6"
            style={{ width: '256px', height: '256px' }}
          />
        )}
      </div>
    </div>
  );
}
