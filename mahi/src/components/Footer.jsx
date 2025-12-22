import { Link } from "react-router-dom";
import { FaBriefcase, FaStar, FaGift, FaQuestionCircle, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-gray-50">
      <div className="grid grid-cols-2 gap-10 px-6 py-12 mx-auto text-sm max-w-7xl md:grid-cols-4 lg:grid-cols-6">
        
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold tracking-wider text-gray-900 uppercase">About</h3>
          <Link to="/about" className="text-gray-600 hover:text-pink-600">About Us</Link>
          <Link to="/contact" className="text-gray-600 hover:text-pink-600">Contact Us</Link>
          <Link to="/careers" className="text-gray-600 hover:text-pink-600">Careers</Link>
          <Link to="/stories" className="text-gray-600 hover:text-pink-600">Marketzen Stories</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold tracking-wider text-gray-900 uppercase">Help</h3>
          <Link to="/payments" className="text-gray-600 hover:text-pink-600">Payments</Link>
          <Link to="/shipping" className="text-gray-600 hover:text-pink-600">Shipping</Link>
          <Link to="/returns" className="text-gray-600 hover:text-pink-600">Cancellation & Returns</Link>
          <Link to="/faq" className="text-gray-600 hover:text-pink-600">FAQ</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold tracking-wider text-gray-900 uppercase">Policy</h3>
          <Link to="/privacy" className="text-gray-600 hover:text-pink-600">Privacy Policy</Link>
          <Link to="/terms" className="text-gray-600 hover:text-pink-600">Terms of Use</Link>
          <Link to="/security" className="text-gray-600 hover:text-pink-600">Security</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold tracking-wider text-gray-900 uppercase">Social</h3>
          <a href="#" className="text-gray-600 hover:text-pink-600">Instagram</a>
          <a href="#" className="text-gray-600 hover:text-pink-600">Facebook</a>
          <a href="#" className="text-gray-600 hover:text-pink-600">Twitter</a>
        </div>

        <div className="flex flex-col gap-3 pl-8 border-l border-gray-200 lg:col-span-2">
          <h3 className="text-xs font-bold tracking-wider text-gray-900 uppercase">Registered Office</h3>
          <p className="text-xs leading-relaxed text-gray-500">
            Marketzen Internet Private Limited,<br />
            Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103, Karnataka, India
          </p>
        </div>
      </div>

      <div className="bg-white border-t border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-6 px-6 py-8 mx-auto text-xs font-medium text-gray-700 max-w-7xl">
          <div className="flex gap-8">
            <span className="flex items-center gap-2 cursor-pointer hover:text-pink-600"><FaBriefcase className="text-pink-500" /> Become a Seller</span>
            <span className="flex items-center gap-2 cursor-pointer hover:text-pink-600"><FaStar className="text-pink-500" /> Advertise</span>
            <span className="flex items-center gap-2 cursor-pointer hover:text-pink-600"><FaGift className="text-pink-500" /> Gift Cards</span>
            <span className="flex items-center gap-2 cursor-pointer hover:text-pink-600"><FaQuestionCircle className="text-pink-500" /> Help Center</span>
          </div>
          
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} Marketzen.com</p>
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" alt="Payments" className="opacity-70" />
          </div>
        </div>
      </div>
    </footer>
  );
}