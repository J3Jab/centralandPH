import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
import va from '@vercel/analytics';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    va.track('Big_Ad');
    const smallAdsDirectory = path.join(process.cwd(), "/public/ads/big-ads");
  
    // Load static data from file system
    const smallAds = await fs.readdir(smallAdsDirectory);

    const randomSmallAdIdx = Math.floor(Math.random() * smallAds.length)
    const randomSmallAd = smallAds[randomSmallAdIdx];
    
    res.status(200).json(randomSmallAd);
  }
  