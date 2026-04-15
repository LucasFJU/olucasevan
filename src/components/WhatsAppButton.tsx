import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5511999990000"; // Substitua pelo seu número real

const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de saber mais sobre seus serviços de design.`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contato via WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    style={{ backgroundColor: "#25D366" }}
  >
    <MessageCircle size={26} className="text-white" fill="white" />
  </a>
);

export default WhatsAppButton;
