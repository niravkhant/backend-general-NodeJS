// user.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullname, password } = req.body;

  if([username, email, fullname, password].some((field)=> field?.trim() === "" ) ){
    throw new ApiError(401, "All Fields are required")
  }

 return res.status(200).json({ success: true, message: "User registered successfully" });
});

export { registerUser };
