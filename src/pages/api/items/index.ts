import dbConnect from '../../../lib/mongodb';
import Item from '../../../models/Item';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const items = await Item.find({});
        res.status(200).json({ success: true, data: items });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
      }
      break;
    case 'POST':
      try {
        const item = await Item.create(req.body);
        res.status(201).json({ success: true, data: item });
      } catch (error: unknown) {  // Use unknown instead of any
        if (error instanceof Error) {
          res.status(400).json({ success: false, message: error.message });
        } else {
          res.status(400).json({ success: false, message: 'Unknown Error' });
        }
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
