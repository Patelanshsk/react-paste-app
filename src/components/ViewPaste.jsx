import React from 'react'
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
console.log("Final Paste ", paste);

  return (
     <div>
     <div className='flex flex-row gap-7 place-content-between'>
      <input 
      className='p-1  rounded-2xl mt-2
      w-[63%] pl-4 border'
      type="text"
      placeholder='Enter title here'
      value={paste.title}
      disabled
      onChange={(e) => setTitle(e.target.value)}
      />
      {/* <button 
      className='p-2  rounded-2xl mt-2'
      onClick={createPaste}>
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button> */}
    </div>
    <div className='mt-4 border rounded-2xl'>
      <textarea
      className='rounded-2xl mt-4,
      min-w-125 p-4'
      value={paste.content}
      onChange={(e) => setValue(e.target.value)}
      placeholder='Enter your content here'
      disabled
      rows={20}
      />
    </div>
   </div>
  
  )
}

export default ViewPaste