import React from 'react';

export default function AdminLoading() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-28 bg-[#1C1917] rounded-3xl border border-[#292524] p-6 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="w-40 h-4 bg-[#292524] rounded-md" />
          <div className="w-64 h-6 bg-[#292524] rounded-md" />
        </div>
        <div className="w-32 h-10 bg-[#292524] rounded-xl" />
      </div>

      {/* Metrics Row Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-28 bg-[#1C1917] rounded-2xl border border-[#292524] p-5 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="w-16 h-3 bg-[#292524] rounded" />
              <div className="w-7 h-7 bg-[#292524] rounded-lg" />
            </div>
            <div className="w-12 h-6 bg-[#292524] rounded" />
          </div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="bg-[#1C1917] rounded-3xl border border-[#292524] p-6 sm:p-8 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4">
          <div className="w-48 h-5 bg-[#292524] rounded" />
          <div className="w-24 h-4 bg-[#292524] rounded" />
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 bg-[#0C0A09] rounded-2xl border border-[#292524] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#292524] rounded-lg" />
              <div className="flex flex-col gap-1.5">
                <div className="w-36 h-4 bg-[#292524] rounded" />
                <div className="w-24 h-3 bg-[#292524] rounded" />
              </div>
            </div>
            <div className="w-20 h-6 bg-[#292524] rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
