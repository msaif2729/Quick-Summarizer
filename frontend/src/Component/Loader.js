import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center ">
      <div className="h-16 w-16 border-8 border-t-slate-900 border-slate-300 rounded-full animate-spin">
      </div>
    </div>
  );
}