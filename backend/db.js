// This file initializes and exports a Prisma Client instance for database operations.

import { PrismaClient } from '@prisma/client'; 
const prisma = new PrismaClient();
export default prisma;