import React, { useEffect } from 'react';

interface staticCardStruct {
    count: string;
    title: string;
  }

function StatisticsCard(data: staticCardStruct) {
  
  return (
    <div>
        <div className='bg-[#24243557] text-center my-auto p-20 rounded-md border border-[#ffffff14]'>
            <span className='text-3xl font-bold text-[#00a3ff]'>{data.count}</span>
            <p className='text-white'>{data.title}</p>
        </div>
    </div>
  )
}

export default StatisticsCard