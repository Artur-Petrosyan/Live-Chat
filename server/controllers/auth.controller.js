import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const register = async (req, res) => {
		const { email, password } = req.body;

		try {
				const candidate = await User.findOne({ email });
				if (candidate) {
						return res.status(400).json({ message: "Пользователь уже существует" });
				}

				const hashedPassword = await bcrypt.hash(password, 10);
				console.log(hashedPassword);
				const user = new User({ email, password: hashedPassword });
				await user.save();

				return res.status(201).json({ message: "Регистрация успешна" });
		} catch (err) {
				return res.status(500).json({ message: "Ошибка сервера" });
		}
};

export const login = async (req, res) => {
		const { email, password } = req.body;

		try {
				const user = await User.findOne({ email });
				if (!user) {
						return res.status(400).json({ message: "Неверный email или пароль" });
				}

				const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch) {
						return res.status(400).json({ message: "Неверный email или пароль" });
				}

				const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

				return res.json({ token });
		} catch (err) {
				return res.status(500).json({ message: "Ошибка сервера" });
		}
};