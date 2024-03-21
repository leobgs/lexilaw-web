import { useGlobalContext } from "hooks/context";
import { Spinner } from "./Spinner";

export const AuthLoader = () => {
  const { authLoader } = useGlobalContext();
  
  return (
    <>
      {authLoader.isOpen && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-brightness-75 flex justify-center items-center z-50">
          <div className="fixed size-24 rounded-full bg-[#2E2C2B1A]/20 flex items-center justify-center z-49"></div>
          <Spinner innerClassName="bg-black" />
        </div>
      )}
    </>
  );
};
