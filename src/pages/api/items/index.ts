import dbConnect from '../../../lib/mongodb';
import Item from '../../../models/Item';

export default async function handler(req:any, res:any) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      const items = await Item.find({});
      res.status(200).json({ success: true, data: items });
      break;
    case 'POST':
      try {
        const item = await Item.create(req.body);
        res.status(201).json({ success: true, data: item });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}