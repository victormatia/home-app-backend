import { Prisma } from '@prisma/client';

export interface Address {
      id: string;
      street: string;
      burgh: string;
      city: string;
      state: string;
      postalCode: string;
      number: number;
      apto: number;
      complement: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
export interface Type {
    id: string;
    type: string;
  }
  
export interface Immobile {
    id: string;
    ownerId: string;
    tenantId: string | null;
    addressId: string;
    typeId: string;
    price: Prisma.Decimal;
    bedroomsQty: number;
    bathroomsQty: number;
    parkingQty: number;
    sqrFootage: Prisma.Decimal;
    petFriendly: boolean;
    description: string;
    favoriteImmobile: string[];
    createdAt: Date;
    updatedAt: Date;
    address: Address;
    type: Type;
    photos: Photo[];
  }
export interface Photo {
    id: string;
    url: string;
  }

export type ImmobileList = Immobile[];