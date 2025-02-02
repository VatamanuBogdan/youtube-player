import { useMemo } from 'react';

import { YoutubeVideo, youtubeVideos } from '../utils/player-videos-list';

function VideoListRow(video: {
    index: number;
    name: string;
    artist: string;
    duration: string;
    isSelected: boolean;
}) {
    const backgroundStyle = video.isSelected ? 'bg-teal-900' : 'hover:bg-teal-900';

    return (
        <div
            className={`flex justify-between items-center w-full px-7 py-3 text-lg ${backgroundStyle} rounded-full cursor-pointer`}
        >
            <span>
                <span className="px-2 font-medium text-slate-400">{video.index}.</span>
                <span className="text-slate-300">{video.artist}</span>
                <span> - </span>
                <span className="font-medium text-slate-400">{video.name}</span>
            </span>
            <span className="text-base text-slate-300">{video.duration}</span>
        </div>
    );
}

interface VideoListProps {
    videos: YoutubeVideo[];
    selectedVideoId: string;
    selectVideo: (video: YoutubeVideo) => void;
}

export function VideoList({ videos, selectedVideoId, selectVideo }: VideoListProps): JSX.Element {
    const selectedVideoIndex = useMemo(() => {
        return videos.findIndex((v) => v.id === selectedVideoId);
    }, [videos, selectedVideoId]);

    const videoItems = videos.map((v, index) => (
        <li key={v.id}>
            <div
                onClick={() => {
                    selectVideo(v);
                }}
            >
                <VideoListRow
                    index={index + 1}
                    name={v.name}
                    artist={v.artist}
                    duration={v.duration}
                    isSelected={index === selectedVideoIndex}
                />
            </div>
        </li>
    ));

    return (
        <div className="text-slate-300 bg-slate-800 rounded-lg overflow-hidden py-3 m-2 px-4 select-none">
            <div className="flex justify-between items-center px-5 pt-2 pb-4">
                <h1 className="text-2xl text-slate-300 font-bold">Youtube Videos</h1>
                <h2 className="text-lg text-slate-400 font-medium">
                    Track {selectedVideoIndex + 1}/{youtubeVideos.length}
                </h2>
            </div>

            <ul className="divide-y-1 divide-slate-700">{videoItems}</ul>
        </div>
    );
}
