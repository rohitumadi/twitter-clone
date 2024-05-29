import { PrismaClient } from "@prisma/client";

/*

whenever we save a file in next js 
next js will run a hot reload and it will reinitialize 
a new prisma client everytime and we will get some warning in 
our terminal that we have too many active prisma client 
to avoid that we will use a global variable 
in development so when we reload we will check if we have prisma already initialized
global is not affected by hot reload 
that is why we store it there 

*/

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
