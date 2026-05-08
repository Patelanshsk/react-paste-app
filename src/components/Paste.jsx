import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Pencil, Eye, Trash2, Copy, Share2, Link as LinkIcon } from 'lucide-react';
import { 
  FacebookShareButton, FacebookIcon, 
  WhatsappShareButton, WhatsappIcon, 
  TwitterShareButton, XIcon, 
  LinkedinShareButton, LinkedinIcon, 
  TelegramShareButton, TelegramIcon 
} from 'react-share';
const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const [sharePasteId, setSharePasteId] = useState(null);

  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes
      (searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className='px-4 sm:px-8'>
      <div className='flex justify-center'>
        <input
          className='p-3 rounded-xl w-full max-w-[600px] mt-8 border border-zinc-700 bg-zinc-800/50 text-white placeholder-zinc-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 backdrop-blur-sm transition-all shadow-lg'
          type='search'
          placeholder='Search your pastes here...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className='p-5 rounded-2xl border border-zinc-700/60 shadow-xl flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 bg-zinc-800/40 backdrop-blur-md hover:bg-zinc-800/60 transition-all duration-300 group' key={paste?._id}>
                <div className='flex-1 overflow-hidden w-full'>
                  <div className='font-bold text-xl mb-1 truncate text-zinc-100 group-hover:text-blue-400 transition-colors duration-300'>
                    {paste.title}
                  </div>
                  <div className='text-zinc-400 line-clamp-2 text-sm font-medium'>
                    {paste.content}
                  </div>
                  <div className='text-xs text-zinc-500 mt-3 flex items-center gap-2'>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span>
                    {new Date(paste.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <div className='flex flex-col items-center gap-3 w-full md:w-auto'>
                  <div className='flex flex-wrap gap-2 justify-center md:justify-end'>
                    <Link to={`/?pasteId=${paste._id}`} className="p-2.5 border border-zinc-700 rounded-xl hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 flex items-center justify-center text-zinc-300 hover:text-white bg-zinc-800/50" title="Edit">
                      <Pencil size={18} />
                    </Link>
                    
                    <Link to={`/pastes/${paste._id}`} className="p-2.5 border border-zinc-700 rounded-xl hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 flex items-center justify-center text-zinc-300 hover:text-white bg-zinc-800/50" title="View">
                      <Eye size={18} />
                    </Link>
                
                    <button className="p-2.5 border border-zinc-700 rounded-xl text-red-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-300 transition-all duration-200 flex items-center justify-center bg-zinc-800/50" onClick={() => handleDelete(paste._id)} title="Delete">
                      <Trash2 size={18} />
                    </button>
                    
                    <button className="p-2.5 border border-zinc-700 rounded-xl hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 flex items-center justify-center text-zinc-300 hover:text-white bg-zinc-800/50" onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("Content copied to clipboard!", {
                        style: { background: '#334155', color: '#fff' }
                      })
                    }} title="Copy">
                      <Copy size={18} />
                    </button>
                    
                    <button className="p-2.5 border border-zinc-700 rounded-xl hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 flex items-center justify-center text-zinc-300 hover:text-white bg-zinc-800/50" onClick={() => {
                      setSharePasteId(sharePasteId === paste._id ? null : paste._id);
                    }} title="Share">
                      <Share2 size={18} />
                    </button>
                  </div>

                  {sharePasteId === paste._id && (
                    <div className='flex flex-row gap-2 justify-center w-full'>
                      <WhatsappShareButton url={`${window.location.origin}/pastes/${paste._id}`} title={paste.title}>
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                      <FacebookShareButton url={`${window.location.origin}/pastes/${paste._id}`} quote={paste.title}>
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton url={`${window.location.origin}/pastes/${paste._id}`} title={paste.title}>
                        <XIcon size={32} round />
                      </TwitterShareButton>
                      <LinkedinShareButton url={`${window.location.origin}/pastes/${paste._id}`} title={paste.title}>
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>
                      <TelegramShareButton url={`${window.location.origin}/pastes/${paste._id}`} title={paste.title}>
                        <TelegramIcon size={32} round />
                      </TelegramShareButton>
                      <button onClick={() => {
                        const shareUrl = `${window.location.origin}/pastes/${paste._id}`;
                        if (navigator.share) {
                          navigator.share({
                            title: paste.title,
                            text: `Check out this paste: ${paste.title}`,
                            url: shareUrl,
                          }).catch((err) => console.error("Error sharing", err));
                        } else {
                          navigator.clipboard.writeText(shareUrl);
                          toast.success("Share link copied to clipboard!", {
                            style: { background: '#334155', color: '#fff' }
                          });
                        }
                      }} className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-white transition-colors" title="Copy Link">
                        <LinkIcon size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          }
          )
        }

      </div>
    </div>
  )
}

export default Paste