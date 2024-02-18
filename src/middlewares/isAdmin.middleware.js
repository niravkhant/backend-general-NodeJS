const isAdminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      // User is an admin, proceed to the next middleware or route handler
      next();
    } else {
      // User is not an admin, send a forbidden response
      res.status(403).json({ error: "Forbidden: Admin access required" });
    }
  };
  
  export  {isAdminMiddleware};