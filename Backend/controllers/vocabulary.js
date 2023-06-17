import Vocabulary from "../models/vocabulary.js";

export const createVocabulary = async (req, res) => {
    try {
        const {
            word,
            category,
            meaning, 
            description
        } = req.body;

        const userId = req.user.id;
        
        const newVocabulary = new Vocabulary({
            word,
            category,
            meaning,
            description,
            createdById : userId
        })

        const savedVocabulary = await newVocabulary.save();
        console.log("Vocabulary created")
        res.status(201).json(savedVocabulary);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const getVocabulary = async (req, res) => {
    try {
        const userId = req.user.id;
        const vocabs = await Vocabulary.find({ createdById: userId });

        res.json({ vocabs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}; 

export const updateVocabulary = async (req, res) => {
    try {
        const userId = req.user.id;
        const vocabId = req.params.id;

        const { word, category, meaning, description } = req.body;

        const updatedVocabulary = await Vocabulary.findOneAndUpdate(
            { _id: vocabId, createdById: userId },
            { word, category, meaning, description },
            { new: true }
        );

        if (!updatedVocabulary) {
            return res.status(404).json({ error: 'Vocabulary not found or unauthorized access' });
        }
        console.log("vocabulary updated")
        res.json(updatedVocabulary);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteVocabulary = async (req, res) => {
    try {
        const userId = req.user.id;
        const vocabId = req.params.id;

        const deletedVocabulary = await Vocabulary.findOneAndDelete({ _id: vocabId, createdById: userId });

        if (!deletedVocabulary) {
            return res.status(404).json({ error: 'Vocabulary not found or unauthorized access' });
        }
        console.log("Vocabulary deleted")
        res.json({ message: 'Vocabulary deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
