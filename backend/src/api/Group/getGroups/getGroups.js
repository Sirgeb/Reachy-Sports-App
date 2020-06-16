import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getGroups: () => {
      return prisma.groups({ orderBy: "name_ASC" });
    }
  }
};
