import { PrismaClient } from '@prisma/client';
import productsData from './data/products.js';

const prisma = new PrismaClient();

async function main() {
    // Remove old data if exists
    await prisma.orderDetail.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.contact.deleteMany();

    // Get unique categories from products data
    const categories = [...new Set(productsData.map((product) => product.category))];

    // Seed data for Categories
    const categoryMap = {};
    for (const category of categories) {
        const createdCategory = await prisma.category.create({
            data: { name: category },
        });
        categoryMap[category] = createdCategory.id;
    }

    // Seed data for Products
    for (const product of productsData) {
        await prisma.product.create({
            data: {
                image: product.image,
                name: product.name,
                description: product.description,
                regularPrice: product.regular_price,
                salePrice: product.sale_price,
                quantityInStock: 100, // Set default quantity in stock
                categoryId: categoryMap[product.category],
            },
        });
    }

    console.log('Products and Categories seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
