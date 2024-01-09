export interface CreateImmobileDTO {
    id: string;
    ownerId: string;
    tenantId: string | null;
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