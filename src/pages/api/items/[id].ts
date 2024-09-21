import dbConnect from '../../../lib/mongodb';
import Item from '../../../models/Item';
import { NextApiRequest, NextApiResponse } from 'next';

interface CustomNextApiRequest extends NextApiRequest {
  query: {
    id: string;
  };
  body: {
    name?: string;
    description?: string;
  };
}

export default async function handler(req: CustomNextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  switch (req.method) {
    case 'PUT':
      try {
        const item = await Item.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!item) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: item });
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(400).json({ success: false, message: error.message });
        } else {
          res.status(400).json({ success: false, message: 'Unknown Error' });
        }
      }
      break;
    case 'DELETE':
      try {
        const deletedItem = await Item.deleteOne({ _id: id });
        if (!deletedItem) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error: unknown) {
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
