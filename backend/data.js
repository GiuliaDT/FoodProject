import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Giulia',
      surname: 'Di Tomassi',
      email: 'admin@test.com',
      password: bcrypt.hashSync('admintest1'),
      isAdmin: true,
    },
    {
      name: 'Utente',
      surname: 'Prova',
      email: 'user@test.com',
      password: bcrypt.hashSync('usertest1'),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: 'Juicy Strawberry',
      slug: 'juicy-strawberry',
      category: 'Fruits',
      origin: 'Italy',
      price: 14.99,
      image: '/images/prod1.jpg',
      stock: 150,
    },
    {
      name: 'Lemony Lemonade',
      slug: 'lemony-lemonade',
      category: 'Drinks',
      origin: 'Italy',
      price: 0.99,
      image: '/images/prod2.jpg',
      stock: 0,
    },
    {
      name: 'Bio Red Berries Cake',
      slug: 'bio-red-berries-cake',
      category: 'Pastries',
      origin: 'Italy',
      price: 4.99,
      image: '/images/prod3.jpg',
      stock: 15,
    },
    {
      name: 'Vegan Granola',
      slug: 'vegan-granola',
      category: 'Cereals',
      origin: 'Italy',
      price: 1.99,
      image: '/images/prod4.jpg',
      stock: 25,
    },
    {
      name: 'Organic Infusion',
      slug: 'organic-infusion',
      category: 'Drinks',
      origin: 'Italy',
      price: 2.99,
      image: '/images/prod5.jpg',
      stock: 56,
    },
    {
      name: 'Bread with Grains',
      slug: 'bread-with-grains',
      category: 'Cereals',
      origin: 'Italy',
      price: 3.99,
      image: '/images/prod6.jpg',
      stock: 84,
    },
    {
      name: 'Vegan Patties',
      slug: 'vegan-patties',
      category: 'Main Courses',
      origin: 'Italy',
      price: 2.5,
      image: '/images/prod7.jpg',
      stock: 120,
    },
    {
      name: 'Vegan Pizza',
      slug: 'vegan-pizza',
      category: 'Main Courses',
      origin: 'Italy',
      price: 4.7,
      image: '/images/prod8.jpg',
      stock: 69,
    },
  ],
};

export default data;
