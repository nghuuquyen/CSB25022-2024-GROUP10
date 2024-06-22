import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getProducts = async (req, res) => {
    const posts = await prisma.product.findMany();

    return res.json(posts);
};

const getProductById = async (req, res) => {
    const { id } = req.params;

    const post = await prisma.product.findUnique({
        where: { id: parseInt(id) },
    });

    if (!post) {
        throw new Error('Post not found');
    }

    return res.json(post);
};

export default { getProducts, getProductById };
