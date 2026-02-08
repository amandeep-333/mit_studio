import prisma from '../config/prisma.js';

export const createDesign = (data) => {
  return prisma.design.create({ data });
};

export const getUserDesigns = (userId) => {
  return prisma.design.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};
