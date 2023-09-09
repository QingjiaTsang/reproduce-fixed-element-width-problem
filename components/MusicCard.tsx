import {Box} from "@mui/system";
import React, {useRef, useState, useEffect} from "react";
import useWavesurfer from "@/hooks/useWavesurfer";
import {WaveSurferOptions} from "wavesurfer.js";
import Image from "next/image";
import Download from "@/public/assets/images/ic_dow.svg";
import Play from "@/public/assets/images/ic_play.svg";
import Stop from "@/public/assets/images/ic_stop.svg";
import Del from "@/public/assets/images/ic_del.svg";
import pcPlay from "@/public/assets/images/ic_pc_play.svg";
import pcStop from "@/public/assets/images/ic_pc_stop.svg";
import {Status} from "@/common/enums/status.enum";

export default function MusicCard(props) {

    const { musicInfo, play, pause } = props;

    const containerRef = useRef<HTMLDivElement | string>('');
    const wavesurfer = useWavesurfer({ container: containerRef.current, url: musicInfo.url } as WaveSurferOptions);

    const [playingTime, setPlayingTime] = useState<string>('0');
    const [totalTime, setTotalTime] = useState<string>('0');

    console.log('MusicCard', musicInfo)

    const onPlayClick = () => {
        if (musicInfo.status === Status.PLAYING) {
            play(musicInfo.createAt);
        } else {
            pause(musicInfo.createAt);
        }
    };

    useEffect(() => {
        if (!wavesurfer) return
        if (musicInfo.status === Status.PLAYING) {
            wavesurfer.play();
        } else {
            wavesurfer.pause();
        }
    }, [wavesurfer, musicInfo.status]);

    useEffect(()=>{
        if (!wavesurfer) return
        wavesurfer.on('decode', (duration) => setTotalTime(duration.toFixed(0)))
        wavesurfer.on('timeupdate', (currentTime) => setPlayingTime(currentTime.toFixed(0)))
        wavesurfer.on('finish', () => {
            setPlayingTime('0')
            pause(musicInfo.createAt);
        })
    }, [wavesurfer])

    return <Box width={'100%'} height={84} className='md:h-[40px] md:flex-row flex items-center flex-col'>
        <Box width={'100%'} height={42} className={'md:grow'}>
            <Box id='waveform' ref={(ref) => { if (ref && ref instanceof HTMLDivElement) containerRef.current = ref; }}/>
        </Box>
        <Box component="span" className={'md:block md:mx-[16px] hidden text-black'}>{totalTime}s</Box>
        {
            musicInfo.status !== Status.PLAYING ? <Image
                className={'md:block hidden'}
                src={pcStop}
                alt='stop'
                height={42}
                width={42}
                onClick={onPlayClick}
            /> : <Image
                className={'md:block hidden'}
                src={pcPlay}
                alt='play'
                height={42}
                width={42}
                onClick={onPlayClick}
            />
        }
        <Box width={'100%'} className='md:hidden flex justify-between items-center mt-[16px]'>
            <Box component="span" width={'30px'} className={'text-black text-left'}>{playingTime}s</Box>
            <Box width={'50%'} className='flex justify-between'>
                <Image
                    src={Download}
                    alt='download'
                    height={24}
                    width={24}
                />
                {
                    musicInfo.status !== Status.PLAYING ? <Image
                        src={Stop}
                        alt='stop'
                        height={24}
                        width={24}
                        onClick={onPlayClick}
                    /> : <Image
                        src={Play}
                        alt='play'
                        height={24}
                        width={24}
                        onClick={onPlayClick}
                    />
                }
                <Image
                    src={Del}
                    alt='download'
                    height={24}
                    width={24}
                />
            </Box>
            <Box component="span" width={'30px'} className={'text-black text-right'}>{totalTime}s</Box>
        </Box>
    </Box>
}
