export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  frequency: 'mes' | 'trimestre' | 'semestre';
  image?: string;
}

export const products: Product[] = [
  {
    id: 'club-basico',
    name: 'Club Básico',
    description: '2 botellas mensuales de vino natural seleccionado',
    price: 45,
    frequency: 'mes',
    image: '/products/club-basico.jpg'
  },
  {
    id: 'club-premium',
    name: 'Club Premium',
    description: '4 botellas mensuales de vino natural premium',
    price: 85,
    frequency: 'mes',
    image: '/products/club-premium.jpg'
  },
  {
    id: 'club-exclusivo',
    name: 'Club Exclusivo',
    description: '3 botellas de edición limitada cada trimestre',
    price: 120,
    frequency: 'trimestre',
    image: '/products/club-exclusivo.jpg'
  },
  {
    id: 'club-descubrimiento',
    name: 'Club Descubrimiento',
    description: '6 botellas variadas cada semestre',
    price: 200,
    frequency: 'semestre',
    image: '/products/club-descubrimiento.jpg'
  }
]; 