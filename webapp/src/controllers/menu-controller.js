import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getMenu = async (req, res) => {
    const { page = 1, category, search, sort } = req.query;
    const itemsPerPage = 10;
    let where = {};
    let orderBy = {};

    if (category) {
        where.categoryId = parseInt(category);
    }

    if (search) {
        where.name = {
            contains: search,
        };
    }

    if (sort) {
        switch (sort) {
            case 'new':
                orderBy = { createdAt: 'desc' };
                break;
            case 'popular':
                orderBy = { views: 'desc' };
                break;
            case 'priceDesc':
                orderBy = { salePrice: 'desc' };
                break;
            case 'priceAsc':
                orderBy = { salePrice: 'asc' };
                break;
        }
    }

    const totalItems = await prisma.product.count({ where });

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const products = await prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
    });

    const categories = await prisma.category.findMany({});

    return res.render('pages/menu', {
        categories,
        products,
        currentPage: parseInt(page),
        totalPages,
        category,
        search,
        sort,
    });
};

export { getMenu };
