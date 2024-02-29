
export interface Address {
  id: string;
  immobileId: string;
  street: string;
  burgh: string;
  city: string;
  state: string;
  postalCode: string;
  number: string;
  apto: string;
  complement: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Type {
  id: string;
  type: string;
}

export interface CreateImmobileDTO {
  id?: string;
  ownerId: string;
  tenantId: string | null;
  typeId: string;
  price: number;
  bedroomsQty: number;
  bathroomsQty: number;
  parkingQty: number;
  sqrFootage: number;
  petFriendly: boolean;
  description: string;
  address: Address;
  photos: Photo[];
}

export interface UpdateImmobileDTO {
  price?: number | string;
  bedroomsQty?: number;
  bathroomsQty?: number;
  parkingQty?: number;
  sqrFootage?: number;
  petFriendly?:  boolean
  description?: string
  createdAt?: Date | string
  updatedAt?: Date | string
  address?: Address;
  photos?: Photo[];
  tenantId?: string;
  typeId?: string;

}

export interface Photo {
  id?: string;
  url: string;
} 

export type ImmobileList = CreateImmobileDTO[];