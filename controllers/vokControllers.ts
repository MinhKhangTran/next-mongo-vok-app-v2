import { IVok } from "@/interfaces/Vok";
import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import Vok from "@/models/Vok";
import APIFeatures from "@/utils/apiFeatures";
import ErrorHandler from "@/utils/errorHandler";
import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { resPerPage } from "../config";

/**
 * create new Vok
 * POST /api/voks
 * PRIVATE
 */

export const createVok = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const session = getSession(req, res);
    const userId = session?.user.sub;
    // console.log(userId);

    if (!userId) {
      return next(new ErrorHandler("Nicht angemeldet", 403));
    }
    const newVok = await Vok.create(req.body);
    res.status(200).json(newVok);
  }
);
/**
 * get all Voks
 * GET /api/voks
 * PRIVATE
 */

export const getVoks = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const session = getSession(req, res);
    const userId = session?.user.sub;
    // console.log(userId);
    // console.log(req.query);

    if (!userId) {
      return next(new ErrorHandler("Nicht angemeldet", 403));
    }
    // const voks = await Vok.find({ userId }).sort({ createdAt: -1 });
    const apiFeatures = new APIFeatures(
      Vok.find({ userId }).sort({ createdAt: -1 }),
      req.query
    ).search();
    let voks = await apiFeatures.query;

    //paginate
    //get total count from db
    const vokCount = await voks.length;
    apiFeatures.paginate(resPerPage);
    //limit entries basend on which site the user is on
    voks = await apiFeatures.query;
    // console.log({ voks, vokCount, resPerPage });

    res.status(200).json({ voks, vokCount, resPerPage });
  }
);
/**
 * get favorite Voks
 * GET /api/voks/favorite
 * PRIVATE
 */

export const getFavorite = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const session = getSession(req, res);
    const userId = session?.user.sub;
    // console.log(userId);
    // console.log(req.query);

    if (!userId) {
      return next(new ErrorHandler("Nicht angemeldet", 403));
    }
    // const voks = await Vok.find({ userId }).sort({ createdAt: -1 });
    // let voks = await Vok.find({ userId, favorite: true }).sort({
    //   createdAt: -1,
    // });

    const apiFeatures = new APIFeatures(
      Vok.find({ userId, favorite: true }).sort({
        createdAt: -1,
      }),
      req.query
    );
    let voks = await apiFeatures.query;
    //paginate
    //get total count from db
    const vokCount = await voks.length;
    apiFeatures.paginate(resPerPage);
    //limit entries basend on which site the user is on
    voks = await apiFeatures.query;
    console.log({ voks, vokCount, resPerPage });

    res.status(200).json({ voks, vokCount, resPerPage });
  }
);

/**
 * get Vok by ID
 * GET /api/voks/[id]
 * PRIVATE
 */

export const getVokById = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const session = getSession(req, res);
    const userId = session?.user.sub;
    // console.log(userId);

    if (!userId) {
      return next(new ErrorHandler("Nicht angemeldet", 403));
    }
    const vok = await Vok.findById(req.query.id);
    // .select("-userId");
    res.status(200).json(vok);
  }
);
/**
 * Update Vok
 * PUT /api/voks/[id]
 * PRIVATE OWNER/ADMIN
 */

export const updateVok = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const session = getSession(req, res);
    const userId = session?.user.sub;
    // console.log(userId);

    if (!userId) {
      return next(new ErrorHandler("Nicht angemeldet", 403));
    }
    const vok = (await Vok.findById(req.query.id)) as IVok;

    if (!vok || vok.userId !== userId) {
      return next(new ErrorHandler("Diese Vokabel gibt es nicht", 404));
    }

    if (req.body.koreanisch === "" || req.body.deutsch === "") {
      return next(new ErrorHandler("Bitte alle Felder ausfüllen", 400));
    }

    const updatedVok = await Vok.findByIdAndUpdate(
      req.query.id,
      { koreanisch: req.body.koreanisch, deutsch: req.body.deutsch, userId },
      { new: true }
    );
    res.status(200).json(updatedVok);
  }
);
/**
 * Delete Vok
 * DELETE /api/voks/[id]
 * PRIVATE OWNER/ADMIN
 */

export const deleteVok = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const vok = await Vok.findById(req.query.id);
    if (!vok) {
      return next(new ErrorHandler("Diese Vokabel gibt es nicht", 404));
    }
    await Vok.findByIdAndDelete(req.query.id);
    res.status(200).json({ msg: "Vok gelöscht" });
  }
);

/**
 * Update Favorite State at vok
 * UPDATE /api/voks/favorite/[id]
 * PRIVATE OWNER
 */
export const updateFavorite = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const session = getSession(req, res);
    const userId = session?.user.sub;
    // console.log(userId);

    if (!userId) {
      return next(new ErrorHandler("Nicht angemeldet", 403));
    }
    const vok = (await Vok.findById(req.query.id)) as IVok;

    if (!vok || vok.userId !== userId) {
      return next(new ErrorHandler("Diese Vokabel gibt es nicht", 404));
    }
    let status;

    if (vok) {
      if (vok.favorite === true) {
        status = false;
      } else {
        status = true;
      }
    }
    // console.log(req.query.id, status);

    const updatedVok = await Vok.findByIdAndUpdate(
      req.query.id,
      { favorite: status },
      { new: true }
    );
    // console.log(JSON.stringify(updateVok));

    res.status(200).json(updatedVok);
  }
);
