const { Configuration, OpenAIApi } = require("openai");

const express = require("express");
const configuration = new Configuration({
  organization: "org-EJnDeV7R7PvRafp2tARo0PuO",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

//create the simple express api that calls the function above

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3080;
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  console.log(currentModel, "currentmodel");
  console.log(message);
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });

  res.json({
    message: response.data.choices[0].text,
  });
});

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  console.log(response.data.data);

  res.json({
    models: response.data.data,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
