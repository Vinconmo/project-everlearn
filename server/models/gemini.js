"use strict";

require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const {GEMINI_API_KEY} = require("../config");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports = {
  model,
};
