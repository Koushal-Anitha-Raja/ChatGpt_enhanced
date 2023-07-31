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
  const { message } = req.body;
  console.log(message);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `{message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  console.log();
  res.json({
    message: response.data.choices[0].text,
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
