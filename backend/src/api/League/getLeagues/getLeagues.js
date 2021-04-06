import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getLeagues: () => {
      return prisma.leagues({ orderBy: "name_ASC" });
    }
  }
};
