// const { model } = require("../model/gemini");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

///

const generateTodos = async (ctx) => {
  try {
    // fetch from AI
    const res = await run1();
    return res
    // for each todo create todo

    //
  } catch (error) {
    console.log(`Error in Gemini/generateTodos: ${error}`);
  }
};

async function run1() {
  const prompt = "Send me a 1-line random message";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

async function run () {
  console.log('started')
  const prompt = "Write a story about an AI and magic";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

// run();

module.exports = {
  generateTodos
}
