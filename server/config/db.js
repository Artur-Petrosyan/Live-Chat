import mongoose from "mongoose";

export const connectDB = async () => {
		try {
				await mongoose.connect("mongodb://127.0.0.1:27017/reactkiller", {
						useNewUrlParser: true,
						useUnifiedTopology: true,
				});
				console.log("✅ MongoDB подключена");
		} catch (error) {
				console.error("❌ Ошибка подключения MongoDB:", error.message);
				process.exit(1);
		}
};