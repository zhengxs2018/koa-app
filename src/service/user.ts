import { injectable, inject } from 'tsyringe'

import { PrismaClient } from '@prisma/client'

@injectable()
export class UserService {
  constructor(@inject(PrismaClient) private prisma: PrismaClient) {}

  async allUsers() {
    return this.prisma.user.findMany()
  }
}
