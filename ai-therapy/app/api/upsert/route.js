
import { upsertUserVector } from '../../../scripts/genEmbeddings.mjs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, message } = req.body;

        // Generate vector embedding (placeholder)
        
        try {
            upsertUserVector(userId, message);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}