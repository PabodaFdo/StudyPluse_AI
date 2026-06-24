const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createStudyMaterial = async (data) => {
  return await prisma.studyMaterial.create({
    data: {
      userId: data.userId,
      title: data.title,
      fileName: data.fileName,
      extractedText: data.extractedText,
      wordCount: data.wordCount
    }
  });
};

const getStudyMaterialsByUserId = async (userId) => {
  return await prisma.studyMaterial.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
};

const getStudyMaterialById = async (id, userId) => {
  return await prisma.studyMaterial.findFirst({
    where: { id, userId }
  });
};

const deleteStudyMaterial = async (id, userId) => {
  return await prisma.studyMaterial.deleteMany({
    where: { id, userId }
  });
};

module.exports = {
  createStudyMaterial,
  getStudyMaterialsByUserId,
  getStudyMaterialById,
  deleteStudyMaterial
};
