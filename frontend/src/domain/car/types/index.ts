export interface Car {
  id: string;
  model: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;
  mileage?: number;
  transmission?: 'Manual' | 'Automático' | 'CVT' | 'Semi-automático';
}

export interface CarDetail extends Car {
  status: 'Disponível' | 'Reservado' | 'Vendido';
  photos: {
    url: string;
    caption?: string;
  }[];
  specifications: {
    yearManufacture: number;
    mileage: number;
    fuel: 'Gasolina' | 'Etanol' | 'Flex' | 'Diesel' | 'Elétrico' | 'Híbrido';
    transmission: 'Manual' | 'Automático' | 'CVT' | 'Semi-automático' | 'Automatizado';
    enginePower: string;
    color: string;
    doors: number;
    bodyStyle: 'Hatch' | 'Sedan' | 'SUV' | 'Picape' | 'Minivan' | 'Conversível' | 'Cupê' | 'Wagon';
    engineSize: string;
    plateEnd: number;
  };
  features: {
    category: 'Conforto' | 'Segurança' | 'Tecnologia' | 'Performance' | 'Estética';
    items: string[];
  }[];
  history?: {
    provenance: 'Particular' | 'Concessionária' | 'Leilão' | 'Importado' | 'Locadora';
    owners: number;
    warranty?: string;
    revisions?: { date: string; mileage: number; location: string }[];
    claims?: { date: string; type: string; description: string }[];
    technicalReport?: { inspectionDate: string; result: string };
  };
  salesConditions: {
    paymentMethods: ('À vista' | 'Financiamento' | 'Consórcio' | 'Leasing')[];
    acceptsTrade: boolean;
    financingConditions?: {
      minEntry: number;
      interestRate: number;
      maxInstallments: number;
    };
    salesNotes?: string;
  };
  similarCars: Car[];
}

export interface ListCarsParams {
  brand?: string[];
  model?: string[];
  transmission?: string[];
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  sortBy?: 'relevance' | 'price' | 'year' | 'model';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface CarFiltersOptions {
  brands: string[];
  models: string[];
  transmissions: string[];
  yearRange: {
    min: number;
    max: number;
  };
  priceRange: {
    min: number;
    max: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
