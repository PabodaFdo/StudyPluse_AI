const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
