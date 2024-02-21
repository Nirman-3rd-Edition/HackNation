const lspCase = require("../models/case");
const user = require("../models/user");
const Comment = require("../models/comments");
const runscript=require("../controllers/runscript")
const { successResponse, errorResponse } = require("../utils");
let globalCaseId;
let caseIdGlobal;


const viewCase = async (req, res) => {
  try {
    let userId = req.user._id;
    const examData = await lspCase.find({
      costumerId: userId,
      status: "pending",
    });
    console.log(examData);
    res.render("viewCaseCostumer", { exams: examData });
  } catch (error) {
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};


const viewCompleteCase = async (req, res) => {
  try {
    let userId = req.user._id;
    let status = "accepted";
    const examData = await lspCase
      .find({
        costumerId: userId,
        status: status,
      })
      .populate("lspId");
    console.log(examData);
    res.render("viewAcceptedForCostumer", { exams: examData });
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};


const addExam = async (req, res) => {
  try {
    console.log("req.body", req.body);
    let userId = req.user._id;

    const payload = {
      costumerId: userId,
      description: req.body.description,
      type: req.body.specialization,
      location: req.body.location,
    };

    // register new user
    const newExam = new lspCase(payload);
    const insertExam = await newExam.save();
    console.log("insert", insertExam);
    console.log("Case Added Successful");
    res.redirect("/mycases");
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, "something went wrong", 500, { err: error });
  }
};

const addExamView = async (req, res) => {
  res.render("addCase");
};


// const viewLSP = async (req, res) => {
//   try {
//     let lspId = req.params.id;
//     globalCaseId = lspId;
//     const examData = await lspCase.findOne({ _id: lspId });
//     console.log(examData);

//     let city = examData.location;
//     const voluteerData = await user.find({
//       practiceLocation: city,
//       specialization: {
//         $in: [examData.type],
//       },
//     });
//     console.log("******************VOLUNTEER DATA**********************");
//     console.log("voluteerData-->", voluteerData);
//     console.log("******************VOLUNTEER DATA**********************");
//     res.render("viewLSPByCostumer", { volunteers: voluteerData });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const viewLSP = async (req, res) => {
  try {
    let caseId = req.params.id;  // Correcting variable name to caseId
    globalCaseId = caseId;  // Assuming you want to store it in globalCaseId

    // Fetch the case information
    const caseData = await lspCase.findOne({ _id: caseId });  // Correcting variable name to caseData
    console.log(caseData);

    let city = caseData.location;

    // Fetch the LSP's starsRating and overallSatisfaction from the comments database based on volunteerData
    const volunteers = await user.find({
      practiceLocation: city,
      specialization: { $in: [caseData.type] },
    });

    const volunteerIds = volunteers.map(volunteer => volunteer._id);

    // Fetch comments for all volunteers
    const comments = await Comment.find({ lspId: { $in: volunteerIds } });

    console.log("******************VOLUNTEER DATA**********************");
    console.log("voluteerData-->", volunteers);
    console.log("Comments for volunteers-->", comments);
    console.log("******************VOLUNTEER DATA**********************");

    res.render("viewLSPByCostumer", {
      volunteers: volunteers,
      comments: comments,  // Pass comments data to the view
    });
  } catch (error) {
    console.log(error.message);
  }
};



const addRequest = async (req, res) => {
  try {
    let lspId = req.params.id;

    let examData = await lspCase.findOne({ _id: globalCaseId });

    if (!examData.reqLSP.includes(lspId)) {
      examData.reqLSP.push(lspId);
      examData.save();
    }
    res.redirect("/mycases");
  } catch (error) {
    console.log(error.message);
  }
};


const viewRequest = async (req, res) => {
  try {
    let userId = req.user._id;
    let status = "pending";
    const examData = await lspCase
      .find({
        reqLSP: { $in: userId },
        status: status,
      })
      .populate("costumerId");
    console.log(examData);
    res.render("viewRequest", { exams: examData });
  } catch (error) {
    console.log(error.message);
  }
};


const acceptRequest = async (req, res) => {
  try {
    let userId = req.user._id;
    let caseId = req.params.id;
    let status = "accepted";
    const examData = await lspCase.findByIdAndUpdate(caseId, {
      lspId: userId,
      status: status,
    });
    console.log(examData);
    res.redirect("/upcoming");
  } catch (error) {
    console.log(error.message);
  }
};


const upcomingCases = async (req, res) => {
  try {
    let userId = req.user._id;
    console.log(userId);
    let status = "accepted";
    const examData = await lspCase
      .find({ lspId: userId, status: status })
      .populate("costumerId");
    console.log(examData);
    res.render("viewUpcoming", { exams: examData });
  } catch (error) {
    console.log(error.message);
  }
};

const viewOwnReview = async (req, res) => {
  try {
    let userId = req.user._id;

    const examData = await lspCase
      .find({ volunteerId: userId })
      .populate("constumerId");
    console.log(examData);
    res.render("viewOwnReview", { exams: examData });
  } catch (error) {
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

// const addReview = async (req, res) => {
//   try {
//     let caseId = caseIdGlobal;
//     let text = req.body.text;
//     const examData = await lspCase.findByIdAndUpdate(caseId, { text: text });
//     console.log("comment added SUBRAT");
//     console.log(examData);
//     console.log("comment added SUBRAT");
//     res.redirect("/accept");
//   } catch (error) {
//     console.log(error.message);
//     return errorResponse(req, res, "something went wrong", 500, { err: error });
//   }
// };

// new code to test new comment model
const addReview = async (req, res) => {
  try {
    let caseId = caseIdGlobal;
    let text = req.body.text;

    // Update the case model
    const examData = await lspCase.findByIdAndUpdate(caseId, { text: text });

    // Check if a comment record exists for this LSP
    let existingComment = await Comment.findOne({ lspId: examData.lspId });

    if (existingComment) {
      // Append the new review to the existing comment record
      existingComment.commentText.push(text);
      await existingComment.save();
    } else {
      // Create a new comment record
      const newComment = new Comment({
        lspId: examData.lspId,
        commentText: [text] // Save the review as an array
      });
      await newComment.save();
    }

    // ml integration
    await runscript.runModel(examData.lspId);

    console.log('Review and comment added successfully');
    res.redirect("/accept");
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, "something went wrong", 500, { err: error });
  }
};

//new code ends



const addReviewView = async (req, res) => {
  caseIdGlobal = req.params.id;
  res.render("addReview");
};

module.exports = {
  viewCase,
  viewCompleteCase,
  addExam,
  addExamView,
  viewLSP,
  addRequest,
  viewRequest,
  acceptRequest,
  upcomingCases,
  addReviewView,
  viewOwnReview,
  addReview,
};
