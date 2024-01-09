export interface CreateImmobileDTO {
    ownerId: string;
    addressId: string;
    typeId: string;
    price: number;
    bedroomsQty: number;
    bathroomsQty: number;
    parkingQty: number;
    sqrFootage: number;
    petFriendly: boolean;
    description: string;
}

export interface UpdateImmoblieDTO {
    ownerId: string;
    addressId: string;
    typeId: string;
    price?: number;
    bedroomsQty?: number;
    bathroomsQty?: number;
    parkingQty?: number;
    sqrFootage?: number;
    petFriendly?: boolean;
    description?: string;
}