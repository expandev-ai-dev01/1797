import type { CarDetail } from '@/domain/car/types';

export interface VehicleSpecsProps {
  specifications: CarDetail['specifications'];
  year: number;
}
