import CourseProgress from "../models/progress.js";


// logic for getting course progress
export const getCourseProgress = async (req, res) => {
    
    const userId = req.user.id;
    // console.log(userId)
  
    try {
      // console.log("from progress", userId);
      const course = await CourseProgress.findOne({ userId });
  
      // console.log(course);
        return res.json({
          progress: [
            course.alphabet,
            course.sound,
            course.word,
            course.sentence,
            course.paragraph,
          ],
        });

    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  };

// Controller logic for setting course progress
export const setProgress = async (req, res) => {
    const userId = req.user.id;
    const fieldName = Object.keys(req.body)[0];
    let value = req.body[fieldName];
    if (value > 100) {
        value = 100;
    }
  
    try {
      const course = await CourseProgress.findOne({ userId });
  
      if (course) {
        course[fieldName] = value; 
  
        await course.save();
  
        return res.status(201).json({
          progress: [
            course.alphabet,
            course.sound,
            course.word,
            course.sentence,
            course.paragraph,
          ],
        });
      } else {
        const newCourseProgress = new CourseProgress({
          userId,
          [fieldName]: value,
        });
  
        await newCourseProgress.save();
  
        return res.status(201).json({
          progress: [
            newCourseProgress.alphabet,
            newCourseProgress.sound,
            newCourseProgress.word,
            newCourseProgress.sentence,
            newCourseProgress.paragraph,
          ],
        });
      }
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  };

  export const setAllProgresses = async (req, res) => {
    const userId = req.user.id;

    const { alphabet, sound, word, sentence, paragraph } = req.body;

    try {

        const updatedProgress = await CourseProgress.findOneAndUpdate(
            { userId: userId },
            { alphabet, sound, word, sentence, paragraph },
            { new: true }
        );

        return res.status(201).json({
          progress: [
            updatedProgress.alphabet,
            updatedProgress.sound,
            updatedProgress.word,
            updatedProgress.sentence,
            updatedProgress.paragraph,
          ],
        });
      
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  };



  