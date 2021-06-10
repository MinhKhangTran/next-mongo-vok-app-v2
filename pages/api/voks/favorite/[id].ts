import { connectDB } from "@/config/db";
import { updateFavorite } from "@/controllers/vokControllers";
import nextConnect from "next-connect";
import onError from "@/middlewares/errors";

//Init handler
const handler = nextConnect({ onError });

//connect to db
connectDB();

handler.put(updateFavorite);

export default handler;
