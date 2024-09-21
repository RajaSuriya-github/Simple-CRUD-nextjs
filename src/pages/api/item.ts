import { NextApiRequest, NextApiResponse } from 'next';

let items = [
  { id: 1, name: 'Item 1', description: 'Description 1' },
  { id: 2, name: 'Item 2', description: 'Description 2' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(items);
      break;
    case 'POST':
      const newItem = { id: Date.now(), ...req.body };
      items.push(newItem);
      res.status(201).json(newItem);
      break;
    case 'PUT':
      const { id, name, description } = req.body;
      items = items.map((item) =>
        item.id === id ? { ...item, name, description } : item
      );
      res.status(200).json({ id, name, description });
      break;
    case 'DELETE':
      const { id: deleteId } = req.body;
      items = items.filter((item) => item.id !== deleteId);
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
