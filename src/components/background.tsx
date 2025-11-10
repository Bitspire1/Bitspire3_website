import React from 'react';

export const Background: React.FC = () => {
  return (
    <>
      {/* Główne duże światła - tło */}
      <div className="absolute top-[25%] left-[33%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[25%] right-[25%] w-80 h-80 bg-blue-700/15 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl"></div>
      
      {/* Średnie światła - warstwa środkowa */}
      <div className="absolute top-10 right-[33%] w-64 h-64 bg-cyan-400/12 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-sky-500/18 rounded-full blur-3xl"></div>
      <div className="absolute top-[33%] right-10 w-56 h-56 bg-blue-300/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[33%] left-[25%] w-40 h-40 bg-indigo-600/14 rounded-full blur-3xl"></div>
      <div className="absolute top-[75%] right-1/2 w-32 h-32 bg-cyan-600/16 rounded-full blur-3xl"></div>
      <div className="absolute top-16 left-1/2 w-28 h-28 bg-blue-400/12 rounded-full blur-3xl"></div>
      
      {/* Dodatkowe duże światła */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[22rem] h-[22rem] bg-blue-600/12 rounded-full blur-3xl"></div>
      <div className="absolute top-[20%] right-[20%] w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[20%] left-[20%] w-[19rem] h-[19rem] bg-sky-600/14 rounded-full blur-3xl"></div>
      
      {/* Średnie światła - dodatkowe */}
      <div className="absolute top-[66.666%] left-[16.666%] w-44 h-44 bg-blue-400/16 rounded-full blur-3xl"></div>
      <div className="absolute top-[16.666%] right-1/2 w-52 h-52 bg-indigo-300/12 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[66.666%] right-[16.666%] w-36 h-36 bg-cyan-700/18 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-0 w-48 h-48 bg-sky-400/14 rounded-full blur-3xl"></div>
      
      {/* Małe światła - akcenty */}
      <div className="absolute top-5 left-1/4 w-24 h-24 bg-cyan-300/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-5 right-[33%] w-20 h-20 bg-blue-200/22 rounded-full blur-2xl"></div>
      <div className="absolute top-[12.5%] left-3/4 w-32 h-32 bg-indigo-400/18 rounded-full blur-2xl"></div>
      <div className="absolute bottom-[12.5%] left-1/2 w-28 h-28 bg-sky-300/16 rounded-full blur-2xl"></div>
      <div className="absolute top-[37.5%] right-[12.5%] w-36 h-36 bg-blue-300/14 rounded-full blur-2xl"></div>
      <div className="absolute bottom-[37.5%] left-[12.5%] w-[7.5rem] h-[7.5rem] bg-cyan-500/20 rounded-full blur-2xl"></div>
      
      {/* Bardzo małe światła - detale */}
      <div className="absolute top-12 right-12 w-16 h-16 bg-blue-100/25 rounded-full blur-xl"></div>
      <div className="absolute bottom-12 left-12 w-[4.5rem] h-[4.5rem] bg-cyan-200/23 rounded-full blur-xl"></div>
      <div className="absolute top-20 left-20 w-14 h-14 bg-indigo-200/28 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-[5.5rem] h-[5.5rem] bg-sky-200/26 rounded-full blur-xl"></div>
      <div className="absolute top-[33.333%] left-[66.666%] w-12 h-12 bg-blue-50/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-[33.333%] right-[66.666%] w-20 h-20 bg-cyan-100/24 rounded-full blur-xl"></div>
      
      {/* Czarna maska z 50% przezroczystością */}
      <div className="absolute inset-0 bg-black/35"></div>
    </>
  );
};
