import { SphericalProperties } from './types';

type VideoInterval = {
    startSeconds?: number;
    endSeconds?: number;
};

type QueueingVideoById = { videoId: string } & VideoInterval;

type QueueingVideoByUrl = { mediaContentUrl: string } & VideoInterval;

type QueueingPlaylist = {
    listType?: string;
    list: string;
    index?: number;
    startSeconds?: number;
};

interface LoadingController {
    loadVideoById(videoId: string, startSeconds?: number): void;
    loadVideoById(object: QueueingVideoById): void;

    cueVideoById(videoId: string, startSeconds?: number): void;
    cueVideoById(object: QueueingVideoById): void;

    cueVideoByUrl(mediaContentUrl: string, startSeconds?: number): void;
    cueVideoByUrl(object: QueueingVideoByUrl): void;

    loadVideoByUrl(mediaContentUrl: string, startSeconds?: number): void;
    loadVideoByUrl(object: QueueingVideoByUrl): void;

    cuePlaylist(playlist: string | string[], index?: number, startSeconds?: number): number;
    cuePlaylist(object: QueueingPlaylist): void;

    loadPlaylist(playlist: string | string[], index?: number, startSeconds?: number): number;
    loadPlaylist(object: QueueingPlaylist): void;
}

interface VideoController {
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
}

interface Video360Controller {
    getSphericalProperties(): SphericalProperties | undefined;
    setSphericalProperties(
        properties: SphericalProperties & { enableOrientationSensor?: boolean }
    ): void;
}

interface PlaylistController {
    nextVideo(): void;
    previousVideo(): void;
    playVideoAt(index: number): void;
}

interface VolumeController {
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setVolume(volume: number): void;
    getVolume(): number;
}

interface SettingsController {
    setSize(width: number, height: number): object;

    getPlaybackRate(): number;
    setPlaybackRate(suggestedRate: number): void;
    getAvailablePlaybackRates(): number[];

    setLoop(loopPlaylists: boolean): void;
    setShuffle(shufflePlaylist: boolean): void;
}

export {
    LoadingController,
    VideoController,
    Video360Controller,
    PlaylistController,
    VolumeController,
    SettingsController,
};
