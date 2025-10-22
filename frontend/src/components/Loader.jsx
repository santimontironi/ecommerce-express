import { BounceLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
        <BounceLoader color="#36d7b7" size={100} />
    </div>
  )
}

export default Loader