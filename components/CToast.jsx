import { IoClose } from "react-icons/io5";

function CToast({className, closable, onClose, children}) {
  return (
    <main className={`${className} rounded-lg shadow-lg relative`}>
        {children}
        {closable &&
        <button className="absolute top-1 right-1 font-bold hover:bg-black hover:bg-opacity-10 p-1 rounded text-xl" 
            onClick={onClose}>
            <IoClose />
         </button>
        }
    </main>
  )
}

export default CToast;