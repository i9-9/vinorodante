'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Loader from './components/Loader';
import CartSidebar from './components/CartSidebar';
import { useCart } from './store/cartStore';
import { Button } from './components/Button';
import Navbar from './components/Navbar';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();
  const currentYear = new Date().getFullYear();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="bg-[#D4C1A1] scroll-smooth">
      {/* Usar el componente Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section 
        id="inicio" 
        className="min-h-screen w-full flex items-center justify-center bg-cover bg-center pt-20"
        style={{ backgroundImage: "url('/hero/hero_bg.png')" }}
      >
        <div className="animate-fade-in text-center text-[#D4C1A1] max-w-4xl px-10">
          <h1 className="text-5xl mb-2 leading-[0,13px] tracking-normal font-pinot uppercase">
            EL VINO RUEDA EN EL TIEMPO Y CRECE CON LA HISTORIA
          </h1>
          <Button 
            variant="secondary" 
            onClick={() => {
              const element = document.getElementById('explorar');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explorar
          </Button>
        </div>
      </section>

      {/* Explorar Section */}
      <section id="explorar" className="min-h-screen py-20 bg-[#D4C1A1]">
        <div className="mx-10">
          <h2 className="animate-fade-in text-5xl font-pinot mb-12 text-[#A83935] uppercase">
            Weekly Wine
          </h2>
          
          {/* Two columns layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Left column */}
            <div className="animate-fade-in space-y-6 text-[#A83935]">
              <h3 className="text-4xl font-pinot text-[#A83935] uppercase">Tu viaje semanal por el mundo del vino</h3>
              <p className="text-lg text-[#A83935]">
                Weekly Wine es nuestra propuesta para explorar historias y contextos a través de botellas cuidadosamente seleccionadas. Cada semana, te acercamos vinos que narran la búsqueda de sus productores, el espíritu de su época y la evolución de la enología.
              </p>
              <div>
                <h4 className="text-3xl font-pinot text-[#A83935] uppercase mb-4">Cómo funciona:</h4>
                <p className="text-lg text-[#A83935]">
                  Cada viernes anunciamos una nueva selección. Tenés hasta el miércoles para reservar tu Weekly Wine, que recibirás en tu casa el jueves siguiente, justo a tiempo para disfrutarlo el fin de semana.
                </p>
              </div>
            </div>

            {/* Right column */}
            <div className="animate-fade-in space-y-6 text-[#A83935]">
              <h4 className="text-3xl font-pinot text-[#A83935] uppercase mb-4">Lo que nos hace diferentes:</h4>
              <ul className="space-y-4 text-lg text-[#A83935]">
                <li className="flex items-start transition-all duration-300 hover:translate-x-2">
                  <span className="mr-2">•</span>
                  <span>Sin compromisos: Participás cuando querés, sin suscripciones obligatorias</span>
                </li>
                <li className="flex items-start transition-all duration-300 hover:translate-x-2">
                  <span className="mr-2">•</span>
                  <span>Contexto y profundidad: Cada vino viene con su historia y trasfondo</span>
                </li>
                <li className="flex items-start transition-all duration-300 hover:translate-x-2">
                  <span className="mr-2">•</span>
                  <span>Curaduría especializada: Seleccionamos vinos que representan momentos significativos en la evolución vitivinícola</span>
                </li>
                <li className="flex items-start transition-all duration-300 hover:translate-x-2">
                  <span className="mr-2">•</span>
                  <span>Puntualidad: Del productor a tu mesa en el momento perfecto</span>
                </li>
              </ul>
              <p className="text-lg text-[#A83935] mt-6">
                Con Weekly Wine, no solo descubrís nuevos sabores, sino que te sumergís en un recorrido que conecta el pasado, presente y futuro del vino, invitándote a reflexionar sobre cada copa desde una nueva perspectiva.
              </p>
            </div>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
            {[0, 1, 2, 3].map((index) => (
              <div 
                key={index}
                className="animate-fade-in bg-[#D9D3C8] rounded-lg shadow-lg overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="h-56 bg-[#F99B79]"></div>
                <div className="p-8">
                  <h3 className="text-2xl font-pinot mb-4 text-[#5B0E2D] uppercase">Club Básico</h3>
                  <p className="text-[#5B0E2D] mb-6 h-20">2 botellas mensuales de vino natural seleccionado</p>
                  <div className="flex flex-col gap-4">
                    <p className="font-bold text-2xl text-[#5B0E2D]">$45/mes</p>
                    <Button 
                      variant="primary"
                      onClick={() => {
                        const product = {
                          id: 'club-basico',
                          name: 'Club Básico',
                          price: 45,
                          frequency: 'mes'
                        };
                        cart.addItem(product);
                        setIsCartOpen(true);
                      }}
                      className="w-full"
                    >
                      Agregar al carrito
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nosotros section */}
      <section id="nosotros" className="pt-20 bg-[#A83935]">
        <div className="mx-10">
          <h2 className="animate-fade-in text-5xl font-pinot text-[#D4C1A1] uppercase mb-4">
            Nosotros
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Columna de texto */}
            <div className="animate-fade-in space-y-6 text-[#D4C1A1]" style={{ animationDelay: '200ms' }}>
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
            <div className="animate-fade-in flex flex-col items-center md:items-end" style={{ animationDelay: '400ms' }}>
              <Image 
                src="/nico/nico.png" 
                alt="Nico" 
                width={1000}
                height={800}
                className="w-full max-w-md h-auto rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
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

      {/* Add CartSidebar */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      {/* Hamburger Menu Button */}
      <button 
        className="md:hidden flex items-center justify-center px-4 py-2 text-[#5B0E2D] hover:text-[#A83935] transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="font-pinot text-xl uppercase">
          {isMenuOpen ? 'CERRAR' : 'MENU'}
        </span>
      </button>
    </main>
  );
}
