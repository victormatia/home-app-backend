export interface Address {
    id: string;
    street: string;
    burgh: string;
    city: string;
    state: string;
    postalCode: string;
    number: string;
    apto: string;
    complement: string;
    createdAt: string;
    updatedAt: string;
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
    price: string;
    bedroomsQty: number;
    bathroomsQty: number;
    parkingQty: number;
    sqrFootage: string;
    petFriendly: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    address: Address;
    type: Type;
    photos: string[];
  }
  
export type ImmobileList = Immobile[];