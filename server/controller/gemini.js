const { model } = require("../model/gemini");
const db = require("../db");


const generateTodos = async (ctx) => {
  try {
    const {goalId} = ctx.params;
    // capture variables from request
    const {
      learningGoal,
      experienceLevel,
      existingKnowledge,
      startDate,
      timeline,
      frequency,
      frequencyUnit,
      preferredFormats,
      todoUnitTime,
      preferredLearningDays
    } = ctx.request.body

    // fetch from AI
    const prompt = `
    Create a structured learning plan based on the following user input:

    Learning Goal: ${learningGoal}
    Experience Level: ${experienceLevel}, on a scale from 1 = complete beginner to 10 = expert
    Existing Knowledge: ${existingKnowledge}
    Start date: ${startDate}
    Timeline: ${timeline}
    Frequency: ${frequency} per ${frequencyUnit}
    Preferred Learning Formats: ${preferredFormats} (e.g., video, reading, audio)
    Todo Unit Time Length: ${todoUnitTime} hours
    Preferred Learning Weekdays: ${preferredLearningDays}

    The plan should be output as a JavaScript array of objects, where each object represents a task.

    Task object structue:
    For each task:
    A descriptive title.
    A variety of learning resources (video, article, tutorial, etc.) aligned with the user's preferred formats.
    A due date in a date type that is compliant with date formats accepted by databases.
    Each task object should consists of a titleTodo, dueDateTodo, resource and comments property with the corresponding details of the task. The comment property can contain any additional information.
    The resource property should contain only the url.
    The comment property should contain a one sentence description of the format of the material and its general content.
    The output should not include comments within the task objects (e.g., "// Monday").



    Additional Requirements:
    Tasks should be distributed evenly across the specified timeline and frequency, considering the preferred learning days. The duration of each task should align with the specified todo_unit_time_length. Prioritize tasks based on the user's experience level and existing knowledge.
    Use multiple types of learning resources (e.g. video, reading, audio) across the plan. The type of resource should vary across different task in the plan as much as possible and align them the resource types specified in preffered_learning_formats. Prioritize high-quality and up-to-date resources, such as official documentation, tutorials, code examples, and video courses.
    The number of resources per task should be one.
    Prioritize high-quality and up-to-date resources.
    If possible, suggest open-source code repositories or interactive learning platforms.
    Ensure the generated learning plan is adaptable to different learning styles and paces.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // parse response code
    const parsedPlan = extractResponseCode(text);
    // store for returned todo posts to send back to client
    const updatedPlan = []
    // for each todo create todo
    for (todo of parsedPlan) {
      const resTodo = await postTodo(todo, goalId)
      updatedPlan.push(resTodo)
    }
    ctx.status = 200;
    ctx.body = updatedPlan;
    //
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      error,
      msg: "Request failed",
    };
    console.log(`Error in Gemini/generateTodos: ${error}`);
  }
};


async function postTodo (todo, goalId) {
  try {
    const {titleTodo, dueDateTodo, resource, comments} = todo
    const postedTodo = await db.Todo.create({
      titleTodo,
      dueDateTodo,
      resource,
      comments,
      GoalId: goalId,
    })
    return postedTodo
  } catch (error) {
    console.log(`Error in Gemini/postineTodo: ${error}`);
  }
}

// extracting array of todos from model string response
function extractResponseCode (resString) {
  const codeBlockStart = '```javascript'
  const codeBlockEnd = '```'
  const stringCode = resString.substring(
    codeBlockStart.length,
    resString.length - codeBlockEnd.length
  );
  const parsed = JSON.parse(stringCode)
  return parsed
}

module.exports = {
  generateTodos
}
