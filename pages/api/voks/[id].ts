import { connectDB } from "@/config/db";
import { deleteVok, getVokById, updateVok } from "@/controllers/vokControllers";
import nextConnect from "next-connect";
import onError from "@/middlewares/errors";

//Init handler
const handler = nextConnect({ onError });

//connect to db
connectDB();

handler.get(getVokById).put(updateVok).delete(deleteVok);

export default handler;
