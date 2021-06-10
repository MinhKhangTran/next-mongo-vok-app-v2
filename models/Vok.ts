import { IVok } from "@/interfaces/Vok";
import mongoose, { Schema } from "mongoose";

const vokSchema: Schema = new Schema(
  {
    koreanisch: {
      type: String,
      required: [true, "Bitte geben Sie ein koreanisches Wort ein"],
      trim: true,
      lowercase: true,
    },
    deutsch: {
      type: String,
      required: [true, "Bitte geben Sie ein deutsches Wort ein"],
      trim: true,
      lowercase: true,
    },
    userId: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Vok || mongoose.model<IVok>("Vok", vokSchema);
