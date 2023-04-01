// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ARTWORK_LIST_PATH } from '../../constants/configuration.constant';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    fetch(ARTWORK_LIST_PATH)
        .then((response) => response?.json())
        .then((response) => {
            res.status(200).json(response.data);
        })
        .catch((error) => console.log(error));
}
