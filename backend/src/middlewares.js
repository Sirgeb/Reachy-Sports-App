export const isAuthenticated = request => {
  if (!request.user) {
    throw new Error("You need to log in to perform this action");
  }
  return;
};

export const isAdmin = request => {
  if (request.user.permission !== "ADMIN") {
    throw new Error("You are not authorized to perform this action");
  }
  return;
}
