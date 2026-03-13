import axios from "axios";

interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

export const fetchJoke = async (): Promise<string> => {
  const jokesApiUrl =
    process.env.EXTERNAL_JOKES_API ||
    "https://official-joke-api.appspot.com/random_joke";

  const response = await axios.get<Joke>(jokesApiUrl);

  const joke = response.data;

  return `${joke.setup} - ${joke.punchline}`;
};