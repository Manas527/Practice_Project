import { asyncHandler } from "../utils/asyncHandler.js";   
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // Get user details from frontend
    // Validate the data
    // Check if the user already exists
    // Check for images , check for avatar
    // Upload them to cloudinary
    // Create a new user object - create a new user in the database
    // Remove password and refresh token from response
    // Check for user creation
    // Return the user object with status 201

    const {fullname, email, username, password} = req.body
    console.log(fullname, email, username, password);

    if( !fullname || !email || !username || !password ) {
        throw new ApiError(400, "Please provide all the required fields");
    }

    const existingUser = await User.findOne({ 
        $or: [
            { email: email },
            { username: username }
        ]
     })

     if(existingUser) {
        throw new ApiError(400, "User already exists with this email or username");
     }

     const avatarLocalPath = req.files?.avatar[0]?.path
     const coverImageLocalPath = req.files?.coverimage[0]?.path

     if(!avatarLocalPath) {
        throw new ApiError(400, "Please provide an avatar image");
     }

     const avatar = await uploadOnCloudinary(avatarLocalPath, "avatars")
     const coverImage = await uploadOnCloudinary(coverImageLocalPath, "coverimages");

     if(!avatar) {
        throw new ApiError(500, "Error uploading avatar image");
     }

        const user = await User.create({
            fullname,
            email,
            username: username.toLowerCase(),
            password,
            avatar: avatar.url,
            coverImage: coverImage?.url || ""
        })
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if(!createdUser) {
            throw new ApiError(500, "Something went wrong while creating the user");
        }

        return res.status(201).json(
            new ApiResponse(200, "User created successfully", createdUser)
        );
    }
)

export { registerUser };