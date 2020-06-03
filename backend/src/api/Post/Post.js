import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    commentsCount: ({ id }) => prisma.commentsConnection({
      where: {
        post: { id }
      }
    }).aggregate().count()
  }
}
