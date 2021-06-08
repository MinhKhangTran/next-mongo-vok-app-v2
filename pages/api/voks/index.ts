import { connectDB } from "@/config/db";
import { createVok, getVoks } from "@/controllers/vokControllers";
import nextConnect from "next-connect";
import onError from "@/middlewares/errors";

//Init handler
const handler = nextConnect({ onError });

//connect to db
connectDB();

handler.post(createVok);
handler.get(getVoks);

export default handler;
