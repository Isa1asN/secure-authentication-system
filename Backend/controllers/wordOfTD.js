import WordOfTD from "../models/wordOfTD.js";

export const createWordOfTD = async (req, res) => {
    try {
        const {
            word,
            category,
            meaning, 
            example
        } = req.body;
        
        const newWord = new WordOfTD({
            word,
            category,
            meaning,
            example
        })

        const savedWord = await newWord.save();

        res.status(201).json(savedWord);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const getWords = async (req, res) => {
    try {
      const words = await WordOfTD.find({});
  
      res.json({ words });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



  export const updateWord = async (req, res) => {
    try {
      const { id } = req.params;
      const { word, category, meaning, example } = req.body;
  
      const updatedWordOfTD = await WordOfTD.findByIdAndUpdate(
        id,
        { word, category, meaning, example },
        { new: true }
      );
  
      if (!updatedWordOfTD) {
        return res.status(404).json({ error: 'WordOfTD not found' });
      }
      console.log("word updated")
      res.json(updatedWordOfTD);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const deleteWordOfTD = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedWordOfTD = await WordOfTD.findByIdAndDelete(id);
  
      if (!deletedWordOfTD) {
        return res.status(404).json({ error: 'WordOfTD not found' });
      }
      console.log("word deleted");
      res.json({ message: 'WordOfTD deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  