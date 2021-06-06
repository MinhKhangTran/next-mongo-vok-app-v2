import Vok from "@/models/Vok";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * create new Vok
 * POST /api/voks
 * PRIVATE
 */

export const createVok = async (req: NextApiRequest, res: NextApiResponse) => {
  const newVok = await Vok.create(req.body);
  res.status(200).json(newVok);
};
/**
 * get all Voks
 * GET /api/voks
 * PUBLIC
 */

export const getVoks = async (req: NextApiRequest, res: NextApiResponse) => {
  const voks = await Vok.find({}).sort({ createdAt: -1 });
  res.status(200).json(voks);
};

/**
 * get Vok by ID
 * GET /api/voks/[id]
 * PRIVATE
 */

export const getVokById = async (req: NextApiRequest, res: NextApiResponse) => {
  const vok = await Vok.findById(req.query.id);
  res.status(200).json(vok);
};
/**
 * Update Vok
 * PUT /api/voks/[id]
 * PRIVATE OWNER/ADMIN
 */

export const updateVok = async (req: NextApiRequest, res: NextApiResponse) => {
  const vok = await Vok.findById(req.query.id);
  if (!vok) {
    res.status(400);
    throw new Error("Vokabel nicht vorhanden");
  }
  const updatedVok = await Vok.findByIdAndUpdate(
    req.query.id,
    { koreanisch: req.body.koreanisch, deutsch: req.body.deutsch },
    { new: true }
  );
  res.status(200).json(updatedVok);
};
/**
 * Delete Vok
 * DELETE /api/voks/[id]
 * PRIVATE OWNER/ADMIN
 */

export const deleteVok = async (req: NextApiRequest, res: NextApiResponse) => {
  const vok = await Vok.findById(req.query.id);
  if (!vok) {
    res.status(400);
    throw new Error("Vokabel nicht vorhanden");
  }
  await Vok.findByIdAndDelete(req.query.id);
  res.status(200).json({ msg: "Vok gelöscht" });
};
