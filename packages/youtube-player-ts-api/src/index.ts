import {
    LoadingController,
    PlaylistController,
    SettingsController,
    Video360Controller,
    VideoController,
    VolumeController,
} from './controllers';
import { Event, EventListener, EventValue, ListenersManager, events } from './events';
import YoutubeApiLoader from './loaders/api-loader';
import {
    PlaybackQuality,
    PlayerError,
    PlayerId,
    PlayerProprieties,
    PlayerState,
    SphericalProperties,
    toStringError,
    toStringState,
} from './types';

interface LifecycleAware {
    getIframe(): HTMLIFrameElement;
    destroy(): void;
}

interface VideoInformation {
    getDuration(): number;
    getVideoUrl(): string;
    getVideoEmbedCode(): string;

    getPlaylist(): number[];
    getPlaylistIndex(): number;
}

interface VideoStatus {
    getVideoLoadedFraction(): number;
    getPlayerState(): PlayerState;
    getCurrentTime(): number;
}

type YoutubePlayerController = LoadingController &
    VideoController &
    Video360Controller &
    PlaylistController &
    VolumeController &
    SettingsController &
    ListenersManager &
    VideoInformation &
    VideoStatus &
    LifecycleAware;

export { YoutubeApiLoader, YoutubePlayerController, events, Event, EventValue, EventListener };

export {
    LoadingController,
    VideoController,
    Video360Controller,
    PlaylistController,
    VolumeController,
    SettingsController,
    ListenersManager,
    VideoInformation,
    VideoStatus,
    LifecycleAware,
};

export {
    PlayerId,
    PlayerState,
    PlaybackQuality,
    SphericalProperties,
    PlayerError,
    PlayerProprieties,
    toStringState,
    toStringError,
};
