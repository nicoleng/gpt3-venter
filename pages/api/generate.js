import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
This is a translator that translates my angry responses into a kinder professional message.
Me: You haven't paid rent in 3 months. Pay now or I will kick you out!
You are 3 months overdue on rent. Please send over the overdue rent or we will have to consider evicting you.

Me: I hate how you never respond to my messages. You are a bad friend.
I'm disappointed that I haven't gotten a response to my messages. Our friendship means a lot to me and I'd really like to talk.

Me: `;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;