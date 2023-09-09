import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  },
};

export const createMusic = async ({ prompt, signal }: { prompt: string; signal: AbortSignal }) => {
  const reqBody = {
    text: prompt,
    num_steps_generate_latent: 75, // 可以不写默认值为50
    num_steps_latent_to_audio: 50, // 可以不写默认值为100
    embedding_scale: 5.0,
  };

  const response = await axios.post('/create-music', reqBody, { ...config, signal });
  return response.data;

  // todo: need to catch the "CanceledError" error while request aborted at the createMusic caller function
  // and set the status to be aborted
};
