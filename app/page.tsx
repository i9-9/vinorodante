'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Loader from './components/Loader';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga inicial
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="bg-[#D4C1A1] scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#D4C1A1] z-50">
        <div className="mx-10 py-4">
          <div className="flex justify-between items-center">
            <Link href="#" className="flex items-center">
              <img src="/logo/logo_vr.svg" alt="Vino Rueda Logo" className="h-8 md:h-10 w-auto" />
            </Link>

            <div className="flex items-center gap-6">
              {/* Desktop Menu */}
              <div className="hidden md:flex gap-6">
                <a href="#inicio" className="font-medium text-[#A83935] hover:text-[#5B0E2D] text-base">
                  Inicio
                </a>
                <a href="#explorar" className="font-medium text-[#A83935] hover:text-[#5B0E2D] text-base">
                  Explorar
                </a>
                <a href="#nosotros" className="font-medium text-[#A83935] hover:text-[#5B0E2D] text-base">
                  Nosotros
                </a>
              </div>

              {/* Cart Icon */}
              <Link href="/checkout" className="text-[#A83935] hover:text-[#5B0E2D]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </Link>

              {/* Hamburger Menu Button */}
              <button 
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6 text-[#5B0E2D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <div className="space-y-2">
                    <div className="w-6 h-0.5 bg-[#5B0E2D]"></div>
                    <div className="w-6 h-0.5 bg-[#5B0E2D]"></div>
                    <div className="w-6 h-0.5 bg-[#5B0E2D]"></div>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-8 pt-4 border-t border-[#A83935]`}>
            <div className="flex flex-col gap-4">
              <a href="#inicio" className="font-medium text-[#A83935] hover:text-[#5B0E2D] text-base">
                Inicio
              </a>
              <a href="#explorar" className="font-medium text-[#A83935] hover:text-[#5B0E2D] text-base">
                Explorar
              </a>
              <a href="#nosotros" className="font-medium text-[#A83935] hover:text-[#5B0E2D] text-base">
                Nosotros
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="inicio" 
        className="min-h-screen w-full flex items-center justify-center bg-cover bg-center pt-20"
        style={{ backgroundImage: "url('/hero/hero_bg.png')" }}
      >
        <div className="text-center text-[#D4C1A1] max-w-4xl px-10">
          <h1 className="text-5xl font-bold mb-8 leading-tight font-pinot uppercase">
            EL VINO RUEDA EN EL TIEMPO Y CRECE CON LA HISTORIA
          </h1>
          <a 
            href="#explorar" 
            className="inline-block px-8 py-4 bg-[#D4C1A1] text-[#5B0E2D] uppercase font-bold rounded hover:bg-[#E3C16F] transition-colors"
          >
            Explorar
          </a>
        </div>
      </section>

      {/* Explorar Section */}
      <section id="explorar" className="min-h-screen py-20">
        <div className="mx-10">
          <h2 className="text-3xl font-bold mb-8 text-[#A83935] font-pinot uppercase">Explorar</h2>
          
          {/* Text content */}
          <div className="max-w-3xl mb-16 space-y-6">
            <p className="text-lg text-[#A83935]">
              Descubrí nuestra selección de Clubes de Vino Natural, entregados directamente a tu casa y curados por nuestro apasionado equipo de Vino Rodante. Con envíos únicos cada vez, vas a experimentar vinos naturales diferentes en cada entrega.
            </p>
            <p className="text-lg font-medium text-[#A83935]">
              ¡Todos los suscriptores se llevan un 10% de descuento en botellas, prioridad en vinos exclusivos e invitaciones a eventos especiales!
            </p>
            <p className="text-lg text-[#A83935]">
              Sumergite en el mundo del vino natural con Vino Rodante, donde cada botella cuenta una historia y cada sorbo es una aventura.
            </p>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-[#D9D3C8] rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-[#F99B79]"></div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-[#A83935] font-pinot uppercase">Club Básico</h3>
                <p className="text-[#A83935] mb-4">2 botellas mensuales de vino natural seleccionado</p>
                <p className="font-bold text-xl text-[#A83935]">$45/mes</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#D9D3C8] rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-[#F99B79]"></div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-[#A83935] font-pinot uppercase">Club Premium</h3>
                <p className="text-[#A83935] mb-4">4 botellas mensuales de vino natural premium</p>
                <p className="font-bold text-xl text-[#A83935]">$85/mes</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#D9D3C8] rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-[#F99B79]"></div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-[#A83935] font-pinot uppercase">Club Exclusivo</h3>
                <p className="text-[#A83935] mb-4">3 botellas de edición limitada cada trimestre</p>
                <p className="font-bold text-xl text-[#A83935]">$120/trimestre</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#D9D3C8] rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-[#F99B79]"></div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-[#A83935] font-pinot uppercase">Club Descubrimiento</h3>
                <p className="text-[#A83935] mb-4">6 botellas variadas cada semestre</p>
                <p className="font-bold text-xl text-[#A83935]">$200/semestre</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros section */}
      <section id="nosotros" className="min-h-screen py-20 bg-[#A83935]">
        <div className="mx-10">
          <h2 className="text-3xl font-bold text-[#D4C1A1] font-pinot uppercase mb-4">Nosotros</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Columna de texto */}
            <div className="space-y-6 text-[#D4C1A1]">
              <p className="text-xl font-medium italic mb-2">
                Entendemos el vino como una ventana a la historia, a la cultura y al recorrido de la humanidad.
              </p> 
              
              <div className="space-y-4">
                <p>
                  En 2010, colaboramos con un proyecto que se llamó XXVII donde participamos de cerca en la creación de una etiqueta personal.
                </p>
                
                <p>
                  En 2014, creamos @hachealmacen, un espacio para pequeños productores, donde el relato tradicional se fusiona con las anécdotas de las personas que trazan la historia en cada etiqueta.
                </p>
                
                <p>
                  En el 2021: un viaje hacia el sur del país, con Hache Patagonia en Esquel, acercando etiquetas desconocidas a una provincia en pleno desarrollo vitivinícola, permitiendo la comparación de perfiles de producción y apreciar la fusión de lo recorrido.
                </p>
                
                <p>
                  En este 2025 la intención es interpelar a la producción del vino en Argentina trazando una línea de tiempo histórica, cultural y social que nos permita conocer en profundidad la búsqueda de cada productor a la hora de desarrollar una etiqueta.
                </p>
              </div>
            </div>

            {/* Columna de imagen */}
            <div className="flex flex-col items-center md:items-end">
              <img 
                src="/nico/nico.png" 
                alt="Nico" 
                className="w-full max-w-md h-auto rounded-lg mb-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#D4C1A1] py-4">
        <div className="mx-10 flex justify-between items-center">
          <p className="text-[#A83935]">&copy; {currentYear}</p>
          <a href="https://instagram.com/vinorodante" target="_blank" rel="noopener noreferrer" className="text-[#A83935] hover:text-[#5B0E2D]">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </footer>
    </main>
  );
}
