import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

const createContact = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);

        return res.status(400).json({ errors: errorMessages });
    }

    const { name, email, message } = req.body;

    const contact = await prisma.contact.create({
        data: {
            name,
            email,
            message,
        },
    });

    return res.json(contact);
};

export default { createContact };
