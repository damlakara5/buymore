import { Oval } from "react-loader-spinner"

const MiniLoader = () => {
  return (
    <div className="loader justify-start  flex col-span-3 absolute top-[-17px] right-[-15px] ">
        <Oval
            height={20}
            width={20}
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

export default MiniLoader