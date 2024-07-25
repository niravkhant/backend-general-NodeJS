import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const uploadGeneral = asyncHandler(async (req, res) => {
  const file = req.file;
  console.log(file);
  if (!file) {
    throw new ApiError(404, "Resource not found");
  }

  return res.status(200).json(new ApiResponse(200, { file: file }, "success"));
});
