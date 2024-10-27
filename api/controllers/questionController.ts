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

// create all questions
const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });

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
export {
  createQuestion,
  DeleteAQuestion,
  editAQuestion,
  getAllQuestions,
  getQuestionById,
  reactQuestion,
  unReactQuestion,
};
