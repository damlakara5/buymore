import FooterItemContainer from "./FooterItemContainer"

function Footer() {
    return (
        <footer className="bg-blue-950 text-white sm:p-10 py-10 px-5 grid grid-cols-2 sm:grid-cols-4 text-start mt-20">
            
            <FooterItemContainer  
                header="BuyMore" 
                items={["Safe Shopping","Your Trusted Marketplace"]} 
            />
            <FooterItemContainer  
                header="Customer Service" 
                items={["Help Center","Contact Us","Order Tracking","Returns & Exchanges","FAQs"]} 
            />
            <FooterItemContainer  
                header="Quick Links" 
                items={["Shop All Categories","Daily Deals","New Arrivals","Gift Cards"]} 
            />
            <FooterItemContainer  
                header="Legal" 
                items={["Terms & Conditions","Privacy Policy","Cookie Policy"]} 
            />
            
            <p> &copy; 2023 Damla Kara. All Rights Reserved. </p>
        </footer>
    )
}

export default Footer
