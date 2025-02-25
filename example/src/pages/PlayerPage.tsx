import { EventValue, toStringError, toStringState } from '@youtube-player/api';
import {
    YoutubePlayer,
    useApiPlayerHandler,
    useApiPlayerListener,
    usePlayerController,
    usePlayerMute,
    usePlayerPlay,
    usePlayerSize,
    usePlayerVolume,
} from '@youtube-player/react';
import { useEffect, useState } from 'react';
import { FaBackward, FaForward } from 'react-icons/fa';
import {
    IoPause,
    IoPlay,
    IoStop,
    IoVolumeHigh,
    IoVolumeLow,
    IoVolumeMedium,
    IoVolumeMute,
    IoVolumeOff,
} from 'react-icons/io5';

import Button from '../components/Button';
import InputRange from '../components/InputRange';
import { VideoList } from '../components/VideoList';
import { YoutubeVideo, youtubeVideos } from '../utils/player-videos-list';

interface VolumeIconProps {
    size?: number;
    volumeLevel: number;
    isMuted: boolean;
}

function VolumeIcon({ size, volumeLevel, isMuted }: VolumeIconProps): JSX.Element {
    if (isMuted) {
        return <IoVolumeMute size={size} />;
    } else {
        if (volumeLevel > 75) {
            return <IoVolumeHigh size={size} />;
        } else if (volumeLevel > 25) {
            return <IoVolumeMedium size={size} />;
        } else if (volumeLevel > 0) {
            return <IoVolumeLow size={size} />;
        } else {
            return <IoVolumeOff size={size} />;
        }
    }
}

function logger(message: string) {
    // eslint-disable-next-line no-console
    console.log(`[PlayerComponent]: ${message}`);
}

export default function PlayerPage(): JSX.Element {
    const [playing, setPlaying] = usePlayerPlay();
    const [volume, setVolume] = usePlayerVolume();
    const [{ width, height }, setPlayerSize] = usePlayerSize();
    const [isMute, setMute] = usePlayerMute();

    const controller = usePlayerController();

    const [selectedVideoId, setSelectedVideoId] = useState<string>(youtubeVideos[0].id);

    useEffect(() => {
        const video = youtubeVideos[0];
        if (video) {
            controller.loadVideoById(video.id);
        }
        controller.size = { width: 1280, height: 600 };
    }, [controller]);

    function handleStateChange(value: EventValue<'onStateChange'>) {
        logger(`State change to ${toStringState(value.data)}`);
    }

    function handleError(value: EventValue<'onError'>) {
        logger(`Error ${toStringError(value.data)}`);
    }

    useApiPlayerListener('onStateChange', handleStateChange, []);
    useApiPlayerListener('onError', handleError, []);

    const handleBackward = useApiPlayerHandler((controller) => {
        const index = youtubeVideos.findIndex((v) => v.id === selectedVideoId);
        if (index && index > 0) {
            const id = youtubeVideos[index - 1].id;
            controller.loadVideoById(id);
            setSelectedVideoId(id);
        }
    });

    const handleForward = useApiPlayerHandler((controller) => {
        const index = youtubeVideos.findIndex((v) => v.id === selectedVideoId);
        if (index !== -1 && index + 1 < youtubeVideos.length) {
            const id = youtubeVideos[index + 1].id;
            controller.loadVideoById(id);
            setSelectedVideoId(id);
        }
    });

    const handleSelectVideo = useApiPlayerHandler((controller, video: YoutubeVideo) => {
        setSelectedVideoId(video.id);
        controller.loadVideoById(video.id);
    });

    return (
        <div className="flex items-stretch bg-slate-200 w-screen min-h-screen">
            <div>
                <div className="w-[1280px] h-[600px] border-1 bg-slate-900 border-slate-800 rounded-lg mt-5 mx-5">
                    <div className="rounded-lg overflow-hidden">
                        <YoutubePlayer
                            width={1280}
                            height={600}
                            autoplay={false}
                            barColor={'red'}
                            displayControls={true}
                            disableKeyboardInteraction={true}
                            disableFullscreen={false}
                            showVideoAnnotations={false}
                            showRelatedVideos={false}
                        />
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex justify-center items-center space-x-2">
                        <Button onTap={handleBackward} fullRounded>
                            <FaBackward size={24} />
                        </Button>

                        <Button
                            onTap={() => setPlaying(playing === 'Playing' ? 'Paused' : 'Playing')}
                            fullRounded
                        >
                            {playing === 'Playing' ? <IoPause size={24} /> : <IoPlay size={24} />}
                        </Button>

                        <Button onTap={handleForward} fullRounded>
                            <FaForward size={24} />
                        </Button>

                        <Button onTap={() => setPlaying('Stopped')} fullRounded>
                            <IoStop size={24} />
                        </Button>

                        <Button onTap={() => setMute(!isMute)} fullRounded>
                            <VolumeIcon size={24} volumeLevel={volume} isMuted={isMute} />
                        </Button>

                        <InputRange
                            size={128}
                            minValue={0}
                            maxValue={100}
                            stepValue={1}
                            value={volume}
                            setValue={setVolume}
                        />
                    </div>

                    <div className="grid grid-cols-2 justify-items-center max-w-32">
                        <InputRange
                            vertical
                            size={128}
                            minValue={0}
                            maxValue={1280}
                            stepValue={10}
                            value={width}
                            setValue={(width) => setPlayerSize({ width, height })}
                        />

                        <InputRange
                            vertical
                            size={128}
                            minValue={0}
                            maxValue={600}
                            stepValue={10}
                            value={height}
                            setValue={(height) => setPlayerSize({ width, height })}
                        />

                        <p className="text-lg font-bold text-slate-800">Width</p>

                        <p className="text-lg font-bold text-slate-800">Height</p>
                    </div>
                </div>
            </div>

            <div className="flex-grow">
                <VideoList
                    videos={youtubeVideos}
                    selectVideo={handleSelectVideo}
                    selectedVideoId={selectedVideoId}
                />
            </div>
        </div>
    );
}
