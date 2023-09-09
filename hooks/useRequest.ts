import useSWRMutation from 'swr/mutation';
import api from '../services';
import mockApi from '../mock';

export const useRequest = () => {
  return {
    CreateMusicCaller: (config?: Record<string, any>) =>
      useSWRMutation(
        'createMusic',
        async (url, { arg }: { arg: { prompt: string; signal: AbortSignal } }) => {
          // const { prompt, signal } = arg;
          // const result = await api.createMusic({ prompt, signal });
          const result = await mockApi.createMusic();

          return result;
        },
        // { revalidateOnMount: false, revalidateOnFocus: false, shouldRetryOnError: false, ...config }
        { ...config }
      ),
  };
};
