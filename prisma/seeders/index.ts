import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.createMany({
    data: [
      {
        id: 'google-oauth2|10015361573371827215',
        email: 'victor@gmail.com',
        name: 'Victor Matias',
      },
    ],
  });

  const addresses = await prisma.address.createMany({
    data: [
      {
        id: '000',
        street: 'Rua 00',
        city: 'Itapipoca',
        state: 'Ceará',
        postalCode: '62500-000',
        number: '0000',
        apto: '0000',
        complement: 'Próximo ao bar do Mozá',
      },
      {
        id: '001',
        street: 'Rua 01',
        city: 'Itapipoca',
        state: 'Ceará',
        postalCode: '62500-000',
        number: '0001',
        apto: '0001',
        complement: 'Próximo ao bar do Mozá',
      },
      {
        id: '003',
        street: 'Rua 03',
        city: 'Itapipoca',
        state: 'Ceará',
        postalCode: '62500-000',
        number: '0003',
      },
      {
        id: '004',
        street: 'Rua 04',
        city: 'Fortaleza',
        state: 'Ceará',
        postalCode: '06803-440',
        number: '0004',
      },
      {
        id: '005',
        street: 'General Sampaio',
        city: 'Fortaleza',
        state: 'Ceará',
        postalCode: '06803-440',
        number: '0005',
      },
      {
        id: '006',
        street: 'Av. 13 de maio',
        city: 'Fortaleza',
        state: 'Ceará',
        postalCode: '06803-440',
        number: '0006',
      },
    ],
  });

  const immobileTypes = await prisma.immobileType.createMany({
    data: [
      {
        id: '001',
        type: 'casa',
      },
      {
        id: '002',
        type: 'apartamento',
      },
      {
        id: '003',
        type: 'estúdio',
      },
      {
        id: '004',
        type: 'kitnet',
      },
      {
        id: '005',
        type: 'sobrado',
      },
    ], 
  });

  const immobiles = await prisma.immobile.createMany({
    data: [
      {
        ownerId: 'google-oauth2|10015361573371827215',
        addressId: '000',
        price: '500',
        typeId: '002',
        sqrFootage: '70',
        bedroomsQty: 2,
        bathroomsQty: 2,
        petFriendly: true,
      },
      {
        ownerId: 'google-oauth2|10015361573371827215',
        addressId: '001',
        price: '500',
        typeId: '002',
        sqrFootage: '70',
        bedroomsQty: 2,
        bathroomsQty: 2,
        petFriendly: true,
      },
      {
        ownerId: 'google-oauth2|10015361573371827215',
        addressId: '004',
        price: '500',
        typeId: '002',
        sqrFootage: '70',
        bedroomsQty: 2,
        bathroomsQty: 2,
        petFriendly: true,
      },
      {
        ownerId: 'google-oauth2|10015361573371827215',
        addressId: '005',
        price: '1000',
        typeId: '001',
        sqrFootage: '100',
        bedroomsQty: 4,
        bathroomsQty: 3,
        petFriendly: true,
      },
      {
        ownerId: 'google-oauth2|10015361573371827215',
        addressId: '006',
        price: '850',
        typeId: '002',
        sqrFootage: '80',
        bedroomsQty: 3,
        bathroomsQty: 2,
        petFriendly: true,
      },
    ],
  });

  console.table({
    users,
    addresses,
    immobileTypes,
    immobiles,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });