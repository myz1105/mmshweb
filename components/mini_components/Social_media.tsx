import { Link } from "@heroui/link";
import { FaInstagram, FaTelegram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export const SocialMedia = () => {
    return (
        <div className="hidden sm:flex gap-2">
            {/* Telegram */}
            <Link isExternal aria-label="Telegram" href="https://telegram.me/logistikammsh">
                <FaTelegram className="text-default-500 w-5 h-5 hover:text-blue-500 transition" />
            </Link>

            {/* Instagram */}
            <Link isExternal aria-label="Instagram" href="https://www.instagram.com/mmshlogistics?igsh=MW9mbjd0aXB0Y2xpdw==">
                <FaInstagram className="text-default-500 w-5 h-5 hover:text-pink-500 transition" />
            </Link>

            {/* Email */}
            <Link isExternal aria-label="Email" href="https://mail.google.com/mail/?view=cm&fs=1&to=info@mmshlogistics.com">
                <FaEnvelope className="text-default-500 w-5 h-5 hover:text-red-500 transition" />
            </Link>

            {/* WhatsApp */}
            <Link isExternal aria-label="WhatsApp" href="https://wa.me/998945624282">
                <FaWhatsapp className="text-default-500 w-5 h-5 hover:text-green-500 transition" />
            </Link>
        </div>
    );
};
