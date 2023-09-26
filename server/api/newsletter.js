import NewsLetter from '../model/NewsLetter.js';

export const createNewsLetter = async (req, res) => {
    const newMail = new NewsLetter(req.body);
    try {
        const savedMail = await newMail.save();
        return res.status(200).json(savedMail);
    } catch (error) {
        res.status(500).json(error);
    }
}