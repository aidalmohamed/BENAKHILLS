import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/212786360767"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] group"
      aria-label="Contact via WhatsApp"
    >
      <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
      <div className="w-12 h-12 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl relative transition-all duration-500 hover:scale-110 hover:-translate-y-2 group-hover:rotate-[360deg]">
        <MessageCircle className="w-6 h-6 md:w-8 md:h-8 fill-white shadow-inner" />
        <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full border-2 border-[#25D366] animate-bounce" />
      </div>
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-[#25D366] px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-xl opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 whitespace-nowrap pointer-events-none">
        Discutons sur WhatsApp
      </div>
    </a>
  );
};

export default WhatsAppButton;
