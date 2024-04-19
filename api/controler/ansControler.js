const AnsResponse = require("../models/ResponseModel.js");

const saveResponse = async (req, res) => {
  const { studentId, ans } = req.body;
  try {
    const studentAnsList = await AnsResponse.findOne(studentId)
      .populate("studentId")
      .populate("questionId");
    const newAns = studentAnsList.response.push(ans);
    await newAns.save();
    res.status(200).send({
      success: ture,
      message: "Ans respose added successfully",
      student: studentAnsList,
    });
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const createResponse = async (req, res) => {
  const { studentId, ans } = req.body;
  try {
    const newStudentResponse = new AnsResponse({
      studentId,
      response: [ans],
    });
    await newStudentResponse.save();
    res
      .status(200)
      .send({ success: ture, message: "Ans respose added successfully" });
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//getResult 
const getResult = async (req, res) => {
  const { id } = req.params;
  const studentResponse = await AnsResponse.findOne({ studentId: id })
    .populate("studentID")
    .populate("questionId");
  console.log(studentResponse);
  let responseArray = studentResponse.response;
  let count = 0;
  for (let i = 0; i < responseArray.length; i++) {
    if (responseArray.ans == responseArray.questionId.correctAns) {
      count++;
    }
  }
  res
    .status(200)
    .send({
      success: true,
      message: "Your result have been calculated successfully",
      result: count,
    });
};
module.exports = { saveResponse, createResponse, getResult };
