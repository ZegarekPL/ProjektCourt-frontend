import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-darkGray text-mainWhite py-8">
            <div className="container mx-auto px-6 text-center">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold">ProjektCourt</h2>
                </div>

                <div className="flex justify-center space-x-6 mb-6">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-mainWhite hover:text-mainGreen text-2xl"/>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-mainWhite hover:text-mainGreen text-2xl"/>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-mainWhite hover:text-mainGreen text-2xl"/>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-mainWhite hover:text-mainGreen text-2xl"/>
                    </a>
                </div>

                <div className="border-t border-mainWhite pt-6 mt-6">
                    <p className="text-mainWhite text-sm">
                        &copy; 2019 - {new Date().getFullYear()} ProjektCourt
                    </p>
                </div>
            </div>
        </footer>
    );
}