import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import img from "../../../../public/logo.png"
const Footer = () => {
    return (
        <footer className="footer items-center p-4 bg-neutral text-neutral-content">
            <aside className="items-center grid-flow-col">
                {/* logo */}
                <img className=" w-1/2" src={img} alt="" />
                <p>Copyright © 2024 - All right reserved by University</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a href="" className=" text-2xl text-blue-400">
                    <FaTwitter></FaTwitter>
                </a>
                <a href="" className=" text-2xl text-blue-500">
                    <FaFacebook></FaFacebook>
                </a>
                <a href="" className=" text-2xl text-red-500">
                    <FaYoutube></FaYoutube>
                </a>
            </nav>
        </footer>
    );
};

export default Footer;