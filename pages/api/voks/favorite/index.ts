import { connectDB } from "@/config/db";
import { getFavorite } from "@/controllers/vokControllers";
import nextConnect from "next-connect";
import onError from "@/middlewares/errors";

//Init handler
const handler = nextConnect({ onError });

//connect to db
connectDB();

handler.get(getFavorite);

export default handler;
