import { ApiError } from "../utils/ApiError.js";

const isAdminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      // User is an admin, proceed to the next middleware or route handler
      next();
    } else {
      throw new ApiError(403, "Forbidden: Admin access required");
    }
  };
  
  export  {isAdminMiddleware};