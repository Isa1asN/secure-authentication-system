import todaysWord from "../models/todaysWord.js";
import WordOfTD from "../models/wordOfTD.js";

export const createTodaysWord = async (req, res) => {
    try {
        const {
            word,
            category,
            meaning, 
            example,
            id
        } = req.body;

        await todaysWord.deleteMany();
        const newWord = new todaysWord({
            word,
            category,
            meaning,
            example
        })

        await WordOfTD.findOneAndDelete({_id : id});
        
        const savedWord = await newWord.save();
        console.log("todays word selected")
        res.status(201).json(savedWord);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const getTodaysWord = async (req, res) => {
    try {
      const word = await todaysWord.find({});
  
      res.json({ word });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };