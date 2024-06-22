import { PrismaClient } from '@prisma/client';
import productsData from './data/products.js';

const prisma = new PrismaClient();

const getRandomProducts = (productMap, num = 1) => {
    const productKeys = Object.keys(productMap);
    const randomProducts = [];
    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * productKeys.length);
        const productKey = productKeys[randomIndex];
        randomProducts.push(productKey);
    }
    return randomProducts;
};

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
    const productMap = {};
    for (const product of productsData) {
        const createdProduct = await prisma.product.create({
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
        productMap[product.name] = createdProduct.id;
    }

    console.log('Products and Categories seeding completed!');

    // Seed data for Customers
    const customersData = [
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            address: '123 Main St',
            city: 'Metropolis',
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '0987654321',
            address: '456 Elm St',
            city: 'Gotham',
        },
        {
            firstName: 'Alice',
            lastName: 'Johnson',
            email: 'alice.johnson@example.com',
            phone: '5556667777',
            address: '789 Oak St',
            city: 'Star City',
        },
    ];

    const customerMap = {};
    for (const customer of customersData) {
        const createdCustomer = await prisma.customer.create({
            data: customer,
        });
        customerMap[customer.email] = createdCustomer.id;
    }

    console.log('Customers seeding completed!');

    // Seed data for Orders and Order Details
    const ordersData = [
        {
            orderDate: new Date(),
            totalAmount: 2000,
            customerEmail: 'john.doe@example.com',
        },
        {
            orderDate: new Date(),
            totalAmount: 3000,
            customerEmail: 'jane.smith@example.com',
        },
        {
            orderDate: new Date(),
            totalAmount: 1500,
            customerEmail: 'alice.johnson@example.com',
        },
    ];

    for (const order of ordersData) {
        const createdOrder = await prisma.order.create({
            data: {
                orderDate: order.orderDate,
                totalAmount: order.totalAmount,
                customerId: customerMap[order.customerEmail],
            },
        });

        // Add random products to order details
        const randomProducts = getRandomProducts(productMap, 2);

        for (const productName of randomProducts) {
            const productId = productMap[productName];
            await prisma.orderDetail.create({
                data: {
                    quantity: Math.floor(Math.random() * 5) + 1, // Random quantity from 1 to 5
                    price: await prisma.product
                        .findUnique({
                            where: { id: productId },
                        })
                        .then((product) => product.salePrice),
                    orderId: createdOrder.id,
                    productId: productId,
                },
            });
        }
    }

    console.log('Orders and Order Details seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
