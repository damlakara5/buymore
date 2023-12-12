import kapinda from "../assets/svg/mobil-yarin-kapinda.svg"
import safeShopping from "../assets/svg/mobil-tek-tikla-alisveris.svg"
import mallInPocket from "../assets/svg/mobil-cebinizde.svg"
/* import returnSafe from "../assets/img/kargo.webp"
 */import OverviewIconCard from "./OverviewIconCard"

function OverviewInfo() {
    return (
        <div className="my-20 max-w-max">
            <div className="grid sm:grid-cols-3 gap-5 ">
                <OverviewIconCard  text="Get it the next day with Tomorrow at the Door!" header=" Tomorrow at the Door" icon={kapinda} />
                <OverviewIconCard  text="Save your payment and address information and shop safely." header="Secure Shopping" icon={safeShopping} />
                <OverviewIconCard  text="Enjoy safe shopping wherever you want." header="Shopping Mall in Your Pocket" icon={mallInPocket} />
{/*                 <OverviewIconCard  text="Returning the product you purchased has never been easier." header="Safe Return" icon={returnSafe} />
 */}           </div>

        </div>
    )
}

export default OverviewInfo
