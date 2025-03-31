export default function MenuButton({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-4 py-2 text-[#5B0E2D] hover:text-[#A83935] transition-colors"
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      <span className="font-pinot text-lg uppercase">
        {isOpen ? 'CERRAR' : 'MENU'}
      </span>
    </button>
  );
} 