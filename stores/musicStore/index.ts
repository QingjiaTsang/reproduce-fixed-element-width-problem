import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

import { MusicInfo, MusicStore } from '@/common/interfaces/music.interface';
import { Status } from '@/common/enums/status.enum';

export const useMusicStore = create<MusicStore>()(
  devtools(
    immer((set, get) => ({
      // musicList: [],
      // todo: dummy data to be deleted afterwards
      musicList: [
        {
          prompt:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti tempore nostrum distinctio est libero labore sequi, eum ducimus repellat in alias esse pariatur delectus voluptatibus saepe laboriosam dolor tenetur dolores!',
          createAt: 0,
          url: '',
          duration: 10,
          status: Status.LOADING,
          aborter: null,
        },
        {
          prompt:
            'Lorem ipsum dolor sit, amet consectetur adipisicing bero labore sequi, eum ducimus repellat in alias esse pariatur delectus voluptatibus saepe laboriosam dolor tenetur dolores!',
          createAt: 1,
          url: '',
          duration: 10,
          status: Status.INITIALIZED,
          aborter: null,
        },
        {
          prompt:
            'Lorem ipsum dolor sit, amet consectetur adipisit in alias esse pariaturs saepe laboriosam dolor tenetur dolores!',
          createAt: 2,
          url: '',
          duration: 10,
          status: Status.PAUSED,
          aborter: null,
        },
        {
          prompt:
            'Lorem ipsum dolor sit, amet consectetur adipisit in pariaturs saepe laboriosam dololores!',
          createAt: 3,
          url: '',
          duration: 10,
          status: Status.PLAYING,
          aborter: null,
        },
        {
          prompt:
            'Lorem ipctetur adipisit in alias esse pariaturs saepe laboriosam dolor tenetur dolores!',
          createAt: 4,
          url: '',
          duration: 10,
          status: Status.ABORTED,
          aborter: null,
        },
        {
          prompt: 'Lorem ipsum dolor sit, amet consectetur adipissam dolor tenetur dolores!',
          createAt: 5,
          url: '',
          duration: 10,
          status: Status.ERROR,
          aborter: null,
        },
      ],

      createMusic: (music: MusicInfo) => {
        set((state) => {
          state.musicList.push(music);
        });
      },

      abortMusicGeneration: (createAt: number) => {
        const { musicList } = get();
        set((state) => {
          state.musicList[musicList.length - 1].status = Status.ABORTED;
        });
      },

      updateMusic: (createAt: number, payload: Partial<MusicInfo>) => {
        const { musicList } = get();
        set((state) => {
          const targetIdx = musicList.findIndex((music) => music.createAt === createAt);
          state.musicList[targetIdx] = { ...state.musicList[targetIdx], ...payload };
        });
      },

      playMusic: (createAt: number) => {
        const { musicList } = get();
        set((state) => {
          const targetIdx = musicList.findIndex((music) => music.createAt === createAt);
          if (targetIdx === -1) return
          state.musicList[targetIdx].status = Status.PLAYING;
          state.musicList.forEach((music: MusicInfo) => {
            if (music.createAt !== createAt && music.status === Status.PLAYING) {
              music.status = Status.PAUSED;
            }
          });
          console.log('play', state.musicList[targetIdx].status)
        });
      },

      pauseMusic: (createAt: number) => {
        const { musicList } = get();
        set((state) => {
          const targetIdx = musicList.findIndex((music) => music.createAt === createAt);
          if (targetIdx === -1) return
          state.musicList[targetIdx].status = Status.PAUSED;
          console.log('pause', state.musicList[targetIdx].status)
        });
      },
    }))
  )
);
