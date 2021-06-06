import { connectDB } from "@/config/db";
import { createVok, getVoks } from "@/controllers/vokControllers";
import nextConnect from "next-connect";

//Init handler
const handler = nextConnect();

//connect to db
connectDB();

handler.post(createVok).get(getVoks);

export default handler;
