'use client';

export default function AdminLogin() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;

    if (password === 'vinorodante2024') {
      // Primero guardamos la autenticación
      sessionStorage.setItem('adminAuth', 'true');
      // Luego redirigimos
      document.location.href = '/admin/orders';
    } else {
      alert('Contraseña incorrecta');
    }
  };

  return (
    <div className="min-h-screen bg-[#D4C1A1] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#D9D3C8] rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-pinot text-[#A83935] text-center mb-8 uppercase">
          Panel Administrativo
        </h1>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="password"
            defaultValue="vinorodante2024"
            className="w-full px-4 py-3 border-2 border-[#A83935] bg-[#D4C1A1] mb-4"
          />
          <button
            type="submit"
            className="w-full bg-[#A83935] text-[#D4C1A1] py-3 px-4 font-pinot text-xl uppercase"
          >
            INGRESAR
          </button>
        </form>
      </div>
    </div>
  );
}