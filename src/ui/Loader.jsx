import { Oval } from "react-loader-spinner"

const Loader = () => {
  return (
    <div className="loader justify-center mt-20  flex col-span-3 h-screen">
        <Oval
            height={80}
            width={80}
            color="blue"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="blue"
            strokeWidth={2}
            strokeWidthSecondary={2}

            />
    </div>
  )
}

export default Loader