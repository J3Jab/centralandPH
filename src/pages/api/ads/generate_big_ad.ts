import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const smallAdsDirectory = path.join(process.cwd(), "/public/ads/big-ads");
  
    // Load static data from file system
    const smallAds = await fs.readdir(smallAdsDirectory);

    const randomSmallAdIdx = Math.floor(Math.random() * smallAds.length)
    const randomSmallAd = smallAds[randomSmallAdIdx];
    
    res.status(200).json(randomSmallAd);
  }
  