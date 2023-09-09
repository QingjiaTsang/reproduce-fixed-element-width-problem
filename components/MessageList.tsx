import { Status } from '@/common/enums/status.enum';
import { Box } from '@mui/system';
import { MusicList } from '@/common/interfaces/music.interface';
import Loading from '@/components/Loading';
import { Typography } from '@mui/material';
import MusicCard from '@/components/MusicCard';
import { useMusicStore } from '@/stores/musicStore';

interface Props {
  musicList: MusicList;
  userName: string;
}

const MessageList: React.FC<Props> = ({ musicList, userName }) => {
  const { updateMusic, playMusic, pauseMusic } = useMusicStore(
    ({ updateMusic, playMusic, pauseMusic }) => ({
      updateMusic,
      playMusic,
      pauseMusic,
    })
  );

  console.log('MessageList', musicList);

  return (
    <Box>
      {musicList.map((musicInfo) => {
        return (
          <Box key={musicInfo.createAt?.toString()}>
            <Box className='mb-2'>
              <Box className='chat chat-end'>
                <Box className='chat-image avatar'>
                  <Box className='avatar placeholder'>
                    <Box className='bg-green-700 text-neutral-content rounded-full w-12'>
                      <Box>ME</Box>
                    </Box>
                  </Box>
                </Box>
                <Box className='chat-header'>
                  {userName}
                  <time className='ml-1 text-xs opacity-50'>12:46</time>
                </Box>

                <Box className='chat-bubble flex justify-center items-center hover:bg-blue-400'>
                  {musicInfo.prompt}
                </Box>
                <Box className='chat-footer opacity-50'>Seen at 12:46</Box>
              </Box>

              {musicInfo.status !== Status.ABORTED && (
                <Box className='chat chat-start'>
                  <Box className='chat-image avatar'>
                    <Box className='avatar placeholder'>
                      <Box className='bg-blue-700 text-neutral-content rounded-full w-12'>
                        <Box>GPT</Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className='chat-header'>
                    MusicGPT
                    <time className='ml-1 text-xs opacity-50'>12:45</time>
                  </Box>
                  {musicInfo.status === Status.LOADING ? (
                    <Box height={48} className='flex justify-center items-center'>
                      <Loading />
                    </Box>
                  ) : (
                    <Box
                      className='chat-bubble flex justify-center items-center bg-white'
                      style={{ width: '80%' }}
                    >
                      {musicInfo.status !== Status.ERROR ? (
                        <Box width={'100%'}>
                          <Box
                            className='w-2.5 h-2.5 md:w-3 md:h-3 bg-[#DD5858] rounded-full absolute top-0 left-0'
                            style={{ opacity: musicInfo.status === Status.INITIALIZED ? 1 : 0 }}
                          />
                          <MusicCard musicInfo={musicInfo} play={pauseMusic} pause={pauseMusic} />
                        </Box>
                      ) : (
                        <Typography variant='h6' color={'red'}>
                          ERROR
                        </Typography>
                      )}
                    </Box>
                  )}
                  <Box className='chat-footer opacity-50'>Delivered</Box>
                </Box>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default MessageList;
