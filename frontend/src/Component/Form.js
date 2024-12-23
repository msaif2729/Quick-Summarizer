import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from "../assets/file.png";
import Loader from './Loader';

export default function Form() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) {
      toast.error("Please Enter a URL!!!");
      return;
    }

    setLoading(true);
    setSummary(''); // Reset summary before fetching new one

    try {
      const response = await fetch('https://quick-summarizer-backend.onrender.com//summarize/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: text }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message);
      } else {
        const res = await response.json();
        setSummary(res.result);
      }

    } catch (error) {
      console.log("Error: " + error.message);
      toast.error("Failed To Summarize Content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center inset-0 fixed">
      <div className="p-5 rounded-2xl w-[80%] h-[80%] gap-5 flex flex-col lg:flex-row bg-white">
        <div className="w-full p-10 lg:w-[50%]">
          <div className="flex gap-3 mb-5">
            <img src={image} alt="saif" className="w-8" />
            <h1 className="text-2xl font-bold text-slate-950">Quick Summarizer</h1>
          </div>
          <p className="mb-10">It is a user-friendly platform that extracts and summarizes content from any URL you provide. Simply paste the link, and it generates a concise summary, helping you quickly understand the key points of a webpage without reading everything. Perfect for saving time while browsing!</p>
          <form onSubmit={handleSubmit} className="flex justify-center flex-col gap-5">
            <label htmlFor="url" className="w-full">
              Enter URL
              <input
                name="url"
                type="text"
                placeholder="Enter URL.."
                value={text}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-slate-900 w-full p-3 text-lg shadow-md focus:shadow-lg focus:outline-none ring-0 hover:shadow-lg transform transition-transform duration-200 focus:translate-y-[-2px] focus:translate-x-[-2px] hover:translate-y-[-1px] hover:translate-x-[-1px]"
              />
            </label>
            <button
              type="submit"
              className="bg-slate-900 text-white text-xl p-3 rounded-lg hover:bg-slate-950 shadow-slate-500 hover:shadow-lg"
            >
              {loading ? 'Summarizing....' : 'Summarize'}
            </button>
          </form>
        </div>
        <div className="w-full p-10 h-full lg:w-[50%]">
          <h1 className="text-lg mb-3">Summary of Website Content</h1>
          {
            loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              summary ? (
                <div className="overflow-auto w-full h-full">
                  <p>{summary}</p>
                </div>
              ) : (
                <p>Summary Not Available!!!</p>
              )
            )
          }
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
