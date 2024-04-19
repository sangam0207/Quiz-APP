const { Question } = require("../models/QuestionModels.js");

const createQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, correctAns, options } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide the admin ID" });
    }
    if (req.isAdmin == false) {
      return res.send({
        success: false,
        message: "Only admin can create the question",
      });
    }
    const newQuestion = new Question({
      adminId: id,
      question,
      correctAns,
      options,
    });

    await newQuestion.save();
    return res
      .status(201)
      .json({ success: true, message: "Question created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getQuestion = async (req, res) => {
  try {
    const questions = await Question.find();
    if (!questions) {
      return res.send({ success: false, message: "Questions not found" });
    }
    res.status(200).send({ success: true, message: "Successful", questions });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = { createQuestion, getQuestion };
