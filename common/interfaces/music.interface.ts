import { Status } from '@/common/enums/status.enum';

export interface MusicInfo {
  // for display of user's prompt input
  prompt: string;

  // for display of generated content
  createAt: number | null;
  url: string | null;
  duration: number | null;
  status: Status;

  // connected to the generation and regeneration operation
  aborter: {
    createAt: number;
    abortController: AbortController;
  } | null;
}

export interface MusicList extends Array<MusicInfo> {}

export interface MusicStore {
  musicList: MusicList;

  createMusic: (music: MusicInfo) => void;
  abortMusicGeneration: (createAt: number) => void;
  updateMusic: (createAt: number, payload: Partial<MusicInfo>) => void;
  playMusic: (createAt: number) => void;
  pauseMusic: (createAt: number) => void;
}
