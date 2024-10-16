import images from 'assets/images'
import React from 'react'

/**
 *
 * @param {{
 * fileCategory: "IMAGE" | "DOKUMEN" | "UNKNOWN"
 * url: string
 * itemName: string
 * isMobile: boolean
 * }} param0
 * @returns {React.ReactNode}
 */
export const FilePreview = ({ fileCategory, url, itemName, isMobile }) => {
 const googleViewer = `https://docs.google.com/gview?url=${encodeURIComponent(
   url
 )}&embedded=true&rm=minimal`

 if (!url) {
   return (
     <img
       src={isMobile ? images.ic_sand_time_mobile : images.ic_sand_time}
       alt="awaiting file"
       className="w-5 h-5 aspect-auto m-2 rounded-lg"
     />
   )
 }

 switch (fileCategory) {
   case 'IMAGE':
     return (
       <img
         src={url}
         alt={itemName}
         className="w-full h-full object-cover rounded-md"
       />
     )
   case 'DOKUMEN':
     return (
       <iframe
         src={googleViewer}
         title={itemName}
         className="w-full h-full border-none"
       />
     )
   case 'UNKNOWN':
   default:
     return (
       <img
         src={images.ic_document}
         alt="document icon"
         className="w-10 h-10 aspect-auto m-2 rounded-lg"
       />
     )
 }
}
