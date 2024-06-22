import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Seed data for Products
    await prisma.product.createMany({
        data: [
            {
                productName: 'Product A',
                category: 'Category 1',
                description: 'Description for Product A',
                price: 100.0,
                quantityInStock: 10,
            },
            {
                productName: 'Product B',
                category: 'Category 2',
                description: 'Description for Product B',
                price: 200.0,
                quantityInStock: 5,
            },
            {
                productName: 'Product C',
                category: 'Category 1',
                description: 'Description for Product C',
                price: 150.0,
                quantityInStock: 8,
            },
        ],
    });
    console.log('Products seeded');

    // Fetch created products to use in orders
    const createdProducts = await prisma.product.findMany();

    // Seed data for Customers
    const customers = [
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            address: '123 Main St',
            city: 'Cityville',
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '0987654321',
            address: '456 Oak St',
            city: 'Townsville',
        },
        {
            firstName: 'Emily',
            lastName: 'Johnson',
            email: 'emily.johnson@example.com',
            phone: '1122334455',
            address: '789 Pine St',
            city: 'Villagetown',
        },
    ];

    for (const customer of customers) {
        const createdCustomer = await prisma.customer.create({
            data: customer,
        });

        console.log(`Customer ${createdCustomer.firstName} ${createdCustomer.lastName} seeded`);

        // Create orders for each customer
        const orders = [
            { orderDate: new Date('2024-06-20'), totalAmount: 150.0, customerId: createdCustomer.id },
            { orderDate: new Date('2024-06-21'), totalAmount: 200.0, customerId: createdCustomer.id },
        ];

        for (const order of orders) {
            const createdOrder = await prisma.order.create({
                data: order,
            });
            console.log(`Order with ID ${createdOrder.id} for Customer ${createdCustomer.firstName} seeded`);

            // Create order details for each order
            for (const product of createdProducts) {
                await prisma.orderDetail.create({
                    data: {
                        quantity: Math.floor(Math.random() * 5) + 1,
                        price: product.price,
                        orderId: createdOrder.id,
                        productId: product.id,
                    },
                });
                console.log(`OrderDetail for Order ${createdOrder.id} and Product ${product.productName} seeded`);
            }
        }
    }

    console.log('Data seeding completed!');
}

main()
    .then(() => console.log('Data seeded'))
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
