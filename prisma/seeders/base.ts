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
        burgh: 'Violete',
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
        burgh: 'Violete',
      },
      {
        id: '003',
        street: 'Rua 03',
        city: 'Itapipoca',
        state: 'Ceará',
        postalCode: '62500-000',
        number: '0003',
        burgh: 'Cruzeiro',
      },
      {
        id: '004',
        street: 'Rua 04',
        city: 'Fortaleza',
        state: 'Ceará',
        postalCode: '06803-440',
        number: '0004',
        burgh: 'Aldeota',
      },
      {
        id: '005',
        street: 'General Sampaio',
        city: 'Fortaleza',
        state: 'Ceará',
        postalCode: '06803-440',
        number: '0005',
        burgh: 'Centro',
      },
      {
        id: '006',
        street: 'Av. 13 de maio',
        city: 'Fortaleza',
        state: 'Ceará',
        postalCode: '06803-440',
        number: '0006',
        burgh: 'Fátima',
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
        id: '000',
        ownerId: 'google-oauth2|10015361573371827215',
        addressId: '000',
        price: '500',
        typeId: '002',
        sqrFootage: '70',
        bedroomsQty: 2,
        bathroomsQty: 2,
        petFriendly: true,
        description: 'Apartamento espaçoso com 70m², 2 quartos, sendo uma suíte, e com um banheiro social.',
      },
      {
        id: '001',
        ownerId: 'google-oauth2|10015361573371827215',
        addressId: '001',
        price: '500',
        typeId: '002',
        sqrFootage: '70',
        bedroomsQty: 2,
        bathroomsQty: 2,
        petFriendly: true,
        description: 'Apartamento espaçoso com 70m², 2 quartos, sendo uma suíte, e com um banheiro social.',
      },
      {
        id: '002',
        ownerId: 'google-oauth2|10015361573371827215',
        addressId: '004',
        price: '500',
        typeId: '002',
        sqrFootage: '70',
        bedroomsQty: 2,
        bathroomsQty: 2,
        petFriendly: true,
        description: 'Apartamento espaçoso com 70m², 2 quartos, sendo uma suíte, e com um banheiro social.',
      },
      {
        id: '003',
        ownerId: 'google-oauth2|10015361573371827215',
        addressId: '005',
        price: '1000',
        typeId: '001',
        sqrFootage: '100',
        bedroomsQty: 4,
        bathroomsQty: 3,
        petFriendly: true,
        description: 'Casa com sala e cozinha integradas, 4 quartos, sendo 2 suítes, e um banheiro social',
      },
      {
        id: '004',
        ownerId: 'google-oauth2|10015361573371827215',
        addressId: '006',
        price: '850',
        typeId: '005',
        sqrFootage: '80',
        bedroomsQty: 3,
        bathroomsQty: 2,
        petFriendly: true,
        description: 'Sobrado com 80m² com sala e cozinha integradas, mezanino e 3 quartos.',
      },
    ],
  });

  const photos = await prisma.photo.createMany({
    data: [
      {
        id: '000',
        url: 'https://images.unsplash.com/photo-1614568742191-1ec6d6c183b3?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NTN8fHxlbnwwfHx8fHw%3D',
      },
      {
        id: '001',
        url: 'https://images.unsplash.com/photo-1614568054271-2381b5b1beab?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NTV8fHxlbnwwfHx8fHw%3D',
      },
    ],
  });

  const immobilePhotos = await prisma.immobilePhoto.createMany({
    data: [
      {
        immobileId: '000',
        photoId: '000',
      },
      {
        immobileId: '000',
        photoId: '001',
      },
      {
        immobileId: '001',
        photoId: '000',
      },
      {
        immobileId: '001',
        photoId: '001',
      },
      {
        immobileId: '002',
        photoId: '000',
      },
      {
        immobileId: '002',
        photoId: '001',
      },
      {
        immobileId: '003',
        photoId: '000',
      },
      {
        immobileId: '003',
        photoId: '001',
      },
      {
        immobileId: '004',
        photoId: '000',
      },
      {
        immobileId: '004',
        photoId: '001',
      },
    ],
  });
  
  const favoriteImmobile = await prisma.favoriteImmobile.createMany({
    data: [{
      userId: 'google-oauth2|10015361573371827215',
      immobileId: '000',
    },
    {
      userId: 'google-oauth2|10015361573371827215',
      immobileId: '001',
    },
    ],
  });

  console.table({
    users,
    addresses,
    immobileTypes,
    immobiles,
    photos,
    immobilePhotos,
    favoriteImmobile,
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