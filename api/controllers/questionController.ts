import { Request, Response } from "express";
import { Question } from "../models/questionmodel";
import User from "../models/usermodel";

interface AuthenticatedRequest extends Request {
  userData?: { id: string };
}

// create a new question
const createQuestion = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userData?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized!" });
  }

  try {
    const newQuestion = await new Question({
      ...req.body,
      reacts: [],
      comments: [],
    });

    newQuestion.save();

    res.status(200).json({
      message: newQuestion,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error creating question!",
    });
  }
};

// get a new question
const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.questionid);

    res.status(200).json({
      message: question,
    });
  } catch (error) {
    res.status(500).json({
      error: "Question not found!",
    });
  }
};

// get all questions
const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const searchParams = req.query.search as string; // Extract search query from req.query
    const query = searchParams
      ? { title: { $regex: searchParams, $options: "i" } } // Case-insensitive search
      : {};

    const questions = await Question.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      message: questions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      error: "Question not found!",
    });
  }
};

// create all questions
const getQuestionsOfUser = async (req: Request, res: Response) => {
  const { userid } = req.params;
  try {
    const questions = await Question.find({ userid }).sort({ createdAt: -1 });

    res.status(200).json({
      message: questions,
    });
  } catch (error) {
    res.status(500).json({
      error: "Question not found!",
    });
  }
};

// edit question
const editAQuestion = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userData?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized!" });
  }

  try {
    const question = await Question.findById(req.params.questionid);

    if (question?.userid && userId) {
      const updatedQuestion = {
        ...req.body,
        reacts: [],
        comments: [],
      };

      try {
        const question2 = await Question.findByIdAndUpdate(
          req.params.questionid,
          { $set: updatedQuestion },
          { new: true }
        );

        res.status(200).json({
          message: question2,
        });
      } catch (error) {
        res.status(500).json({ error: "Failed to update the question!" });
      }
    } else {
      res.status(500).json({ error: "You can only update your question!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the question!" });
  }
};

// delete question
const DeleteAQuestion = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userData?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized!" });
  }

  try {
    const question = await Question.findById(req.params.questionid);

    if (question?.userid && userId) {
      try {
        await Question.findByIdAndDelete(req.params.questionid);

        res.status(200).json({
          message: "Question deleted.",
        });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete the question!" });
      }
    } else {
      res.status(500).json({ error: "You can only deleted your question!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to deleted the question!" });
  }
};

// react questions
const reactQuestion = async (req: Request, res: Response) => {
  const { questionid } = req.params;
  const userId = (req as AuthenticatedRequest).userData?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized!" });
  }

  try {
    const questionToLike = await Question.findById(questionid);
    if (!questionToLike) {
      return res.status(404).json({ error: "Question not found!" });
    }

    const reactedUser = await User.findById(userId);
    if (!reactedUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    if (questionToLike.reacts.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You have already reacted to this question!" });
    }

    questionToLike.reacts.push(userId);
    reactedUser.reacts.push(questionToLike._id.toString());

    await questionToLike.save();
    await reactedUser.save();

    res.status(200).json({ message: "Reacted to the question." });
  } catch (error) {
    res.status(500).json({ error: "Failed to react to the question!" });
  }
};

// react questions
const unReactQuestion = async (req: Request, res: Response) => {
  const { questionid } = req.params;
  const userId = (req as AuthenticatedRequest).userData?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized!" });
  }

  try {
    const questionToUnLike = await Question.findById(questionid);
    if (!questionToUnLike) {
      return res.status(404).json({ error: "Question not found!" });
    }

    const reactedUser = await User.findById(userId);
    if (!reactedUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Remove the user ID from the react array of the question
    const index = questionToUnLike?.reacts.indexOf(userId);
    if (index !== -1) {
      questionToUnLike.reacts.splice(index, 1);
    }

    // Remove the post ID from the activities array of the user
    const index2 = reactedUser?.reacts.indexOf(questionToUnLike._id.toString());
    if (index2 !== -1) {
      reactedUser.reacts.splice(index2, 1);
    }

    await questionToUnLike.save();
    await reactedUser.save();

    res.status(200).json({ message: "Un Reacted the question." });
  } catch (error) {
    res.status(500).json({ error: "Failed to unreact to the question!" });
  }
};

const getReactedUsers = async (req: Request, res: Response) => {
  const { questionid } = req.params;

  try {
    const question = await Question.findById(questionid);
    if (!question) {
      return res.status(404).json({ error: "question not found!" });
    }

    const reactedUsersList = await User.find({ _id: { $in: question.reacts } });
    res.status(200).json({
      message: reactedUsersList,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reactedusers!" });
  }
};

// fetch the tags based on most used tags
// fetch the tags based on most used tags
const getQuestionsTags = async (req: Request, res: Response) => {
  try {
    // Fetch all questions and extract tags
    const result = await Question.find();
    const tagFrequency: Record<string, number> = {};

    // Count the frequency of each tag.
    result.forEach((question) => {
      question.tags.forEach((tag: string) => {
        tagFrequency[tag] = (tagFrequency[tag] || 0) + 1; // This line checks if the tag already exists . If it does, it increments the count by 1. If it doesn’t, it initializes the count to 1.
      });
    });
    // console.log(tagFrequency[tag]);

    // Convert tagFrequency object to an array and sort by frequency
    const tags = Object.keys(tagFrequency)
      .sort((a, b) => tagFrequency[b] - tagFrequency[a])
      .map((tag) => `${tag}(${tagFrequency[tag]})`);

    res.status(200).json({
      message: tags,
    });
  } catch (error) {
    res.status(500).json({
      error: "Question tags could not be retrieved!",
    });
  }
};

// get trending questions based on most reacts
const getTrendingQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find();

    const trendingQuestions = questions
      .sort((a, b) => b.reacts.length - a.reacts.length)
      .slice(0, 7);

    res.status(200).json({
      message: trendingQuestions,
    });
  } catch (error) {
    res.status(500).json({
      error: "Question not found!",
    });
  }
};

export {
  createQuestion,
  DeleteAQuestion,
  editAQuestion,
  getAllQuestions,
  getQuestionById,
  getQuestionsOfUser,
  getQuestionsTags,
  getReactedUsers,
  getTrendingQuestions,
  reactQuestion,
  unReactQuestion,
};
