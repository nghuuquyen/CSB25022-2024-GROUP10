import { PrismaClient } from '@prisma/client';
import { createPagination } from '../utils/pagination.js';

const prisma = new PrismaClient();

const getMenu = async (req, res) => {
    const { page = 1, category, search, sort } = req.query;
    const currentPage = parseInt(page);
    const itemsPerPage = 10;

    let where = {};

    if (category) {
        where.categoryId = parseInt(category);
    }

    if (search) {
        where.name = { contains: search };
    }

    const orderBy = createOrderByClause(sort);

    const totalItems = await prisma.product.count({ where });

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const products = await prisma.product.findMany({
        where,
        orderBy,
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    });

    const categories = await prisma.category.findMany({});

    const pagination = createPagination(req, totalPages, currentPage);

    return res.render('pages/menu', {
        categories,
        products,
        currentPage,
        totalPages,
        category,
        search,
        sort,
        pagination,
    });
};

const createOrderByClause = (sort) => {
    switch (sort) {
        case 'new':
            return { createdAt: 'desc' };
        case 'popular':
            return { OrderDetail: { _count: 'desc' } }; // Order by purchase count
        case 'priceDesc':
            return { salePrice: 'desc' };
        case 'priceAsc':
            return { salePrice: 'asc' };
        default:
            return {};
    }
};

export { getMenu };
