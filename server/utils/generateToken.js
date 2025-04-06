import jwt from "jsonwebtoken";

export const generateToken = (id) => {
		return jwt.sign({ id }, "super_secret_jwt_key", { expiresIn: "7d" });
};