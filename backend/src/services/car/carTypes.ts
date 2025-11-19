// Basic car type for list view
export interface Car {
  id: string;
  model: string;
  brand: string;
  year: number;
  price: number;
  imageUrl: string;
  mileage: number;
  transmission: 'Manual' | 'Automático' | 'CVT' | 'Semi-automático' | 'Automatizado';
}

// Detailed types for the details page
export interface Photo {
  url: string;
  isPrincipal: boolean;
  legend?: string;
}

export interface Specification {
  brand: string;
  model: string;
  yearManufacture: number;
  yearModel: number;
  mileage: number;
  fuel: 'Gasolina' | 'Etanol' | 'Flex' | 'Diesel' | 'Elétrico' | 'Híbrido';
  transmission: 'Manual' | 'Automático' | 'CVT' | 'Semi-automático' | 'Automatizado';
  power: string; // e.g., "185 cv"
  color: string;
  doors: number;
  bodyType: 'Hatch' | 'Sedan' | 'SUV' | 'Picape' | 'Minivan' | 'Conversível' | 'Cupê' | 'Wagon';
  engine: string; // e.g., "2.0"
  plateEnd: number;
}

export interface Item {
  name: string;
  category: 'Conforto' | 'Segurança' | 'Tecnologia' | 'Performance' | 'Estética';
}

export interface Revision {
  date: string; // ISO 8601
  mileage: number;
  location: string;
}

export interface Claim {
  date: string; // ISO 8601
  type: string;
  description: string;
}

export interface TechnicalReport {
  inspectionDate: string; // ISO 8601
  result: 'Aprovado' | 'Aprovado com ressalvas' | 'Reprovado';
}

export interface VehicleHistory {
  origin: 'Particular' | 'Concessionária' | 'Leilão' | 'Importado' | 'Locadora';
  previousOwners: number;
  warranty?: string; // e.g., "3 anos" or "Até 10/2025"
  revisions?: Revision[];
  claims?: Claim[];
  technicalReport?: TechnicalReport;
}

export interface FinancingConditions {
  minEntry: number; // percentage
  interestRate: number; // percentage
  maxInstallments: number;
}

export interface DocumentalSituation {
  status: 'Regular' | 'Pendente' | 'Em andamento';
  pendingIssues?: string[];
  observations?: string;
}

export interface SalesConditions {
  paymentMethods: ('À vista' | 'Financiamento' | 'Consórcio' | 'Leasing')[];
  financing?: FinancingConditions;
  acceptsTrade: boolean;
  salesObservations?: string;
  requiredDocuments: string[];
  documentalSituation: DocumentalSituation;
}

// The main detailed car object
export interface CarDetail {
  id: string;
  announcementTitle: string;
  price: number;
  status: 'Disponível' | 'Reservado' | 'Vendido';
  principalImageUrl: string;
  gallery: Photo[];
  specifications: Specification;
  standardItems: Item[];
  optionalItems: Item[];
  history: VehicleHistory;
  salesConditions: SalesConditions;
}

export interface CarFilters {
  brand?: string[];
  model?: string[];
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  transmission?: string[];
}

export interface CarSort {
  sortBy?: 'relevance' | 'price' | 'year' | 'model';
  sortOrder?: 'asc' | 'desc';
}

export interface CarPagination {
  page?: number;
  limit?: number;
}

export interface ListCarsParams extends CarFilters, CarSort, CarPagination {}

export interface PaginatedCarList {
  cars: Car[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterOptions {
  brands: string[];
  models: string[];
  transmissions: string[];
  yearRange: { min: number; max: number };
  priceRange: { min: number; max: number };
}
