import React, { use, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useEffect } from 'react';

const Home = () => {

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    console.log("Inside use effect");
    
    if(pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      console.log("Page Found");
      
        setTitle(paste.title);
        setValue(paste.content);
      
    }
  }, [pasteId]);

  function createPaste() {
   const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
    if(pasteId) {
      // update paste
      dispatch(updateToPastes(paste));
    } else {
      // create paste
      dispatch(addToPastes(paste));
    }

     // After creating or updating paste, we can reset the form and search params
  setTitle('');
  setValue('');
  setSearchParams({});

  }

 

  return (
   <div>
     <div className='flex flex-row gap-7 place-content-between'>
      <input 
      className='p-2 rounded-2xl mt-2 w-[63%] pl-4 border border-zinc-600 bg-transparent text-white focus:outline-none focus:border-blue-500'
      type="text"
      placeholder='Enter title here'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      />
      <button 
      className='py-2 px-4 rounded-xl mt-2 bg-[#1a1a1a] text-white border border-transparent hover:border-[#646cff] transition-colors font-medium'
      onClick={createPaste}>
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button>
    </div>
    <div className='mt-6'>
      <textarea
      className='rounded-2xl min-w-[500px] w-full p-4 border border-zinc-600 bg-transparent text-white focus:outline-none focus:border-blue-500'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder='Enter your content here'
      rows={20}
      />
    </div>
   </div>
  
  )
}

export default Home