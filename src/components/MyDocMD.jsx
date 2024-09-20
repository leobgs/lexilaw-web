import images from 'assets/images'

export const MyDocMD = ({ children, handleClick }) => {
  return (
    <div className="bg-white rounded-md shadow-lg animate-spin hover:animate-none">
      {/* header */}
      <div className="border-b-4 mb-4 flex justify-between items-center">
        <span className="px-2 py-1 font-bold">DOC</span>

        <div className="flex space-x-1 px-2 py-1 hover:cursor-pointer" onClick={handleClick}>
          <img src={images.ic_copy} alt="ic_copy" className="" />
          <span>Copy</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>
    </div>
  )
}
