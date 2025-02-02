import { YoutubePlayerController } from '..';
import {
    Event,
    InternalListenerManager,
    UnknownEventValue,
    deinitListenerManager,
    initListenerManager,
} from '../events';
import loadJsScript from './script-loader';
import { PlayerId, PlayerProprieties } from '../types';

const YOUTUBE_PLAYER_API_SCRIPT_URL = 'http://www.youtube.com/iframe_api';

function isLoaded(): boolean {
    const scripts = document.querySelectorAll('head script');

    return (
        // @ts-ignore
        Array.from(scripts).some((script) => script.src === YOUTUBE_PLAYER_API_SCRIPT_URL) &&
        YT.Player !== undefined
    );
}

async function load(): Promise<void> {
    if (isLoaded()) {
        return Promise.resolve();
    }

    const apiLoadingPromise = new Promise<void>((resolve) => {
        const previousListener = window.onYouTubeIframeAPIReady;

        window.onYouTubeIframeAPIReady = () => {
            previousListener?.();
            resolve();
        };
    });

    const scriptLoadingPromise = loadJsScript(YOUTUBE_PLAYER_API_SCRIPT_URL);

    return Promise.all([apiLoadingPromise, scriptLoadingPromise]).then();
}

async function createPlayer(
    id: PlayerId,
    props: PlayerProprieties
): Promise<YoutubePlayerController> {
    return new Promise<YoutubePlayerController>((resolve, reject) => {
        const controller = new YT.Player(id, {
            width: props.width,
            height: props.height,
            playerVars: createPlayerVars(props),
            events: createBaseEventListeners(resolve, reject),
        });

        initListenerManager(controller);
        const baseDestroyMethod = controller.destroy;
        controller.destroy = () => {
            deinitListenerManager(controller);
            baseDestroyMethod();
        };

        // TODO: Find a better way to check if controller is already laoded
        if (controller.loadVideoById) {
            resolve(controller);
        }
    });
}

function createPlayerVars(props: PlayerProprieties) {
    return {
        autoplay: props.autoplay ? 1 : 0,
        color: props.barColor,
        controls: props.displayControls ? 1 : 0,
        disablekb: props.disableKeyboardInteraction ? 1 : 0,
        fs: props.disableFullscreen ? 0 : 1,
        iv_load_policy: props.showVideoAnnotations ? 1 : 3,
        rel: props.showRelatedVideos ? 1 : 0,
    };
}

function createBaseEventListeners(
    resolve?: (controller: YoutubePlayerController) => void,
    reject?: (reason: unknown) => void
) {
    return {
        onReady: (value: object) => {
            try {
                // @ts-ignore
                const controller = value.target as YoutubePlayerController;
                resolve?.(controller);
                notifyListeners('onReady', value);
            } catch (error) {
                reject?.(error);
            }
        },
        onStateChange: (value: object) => {
            notifyListeners('onStateChange', value);
        },
        onPlaybackQualityChange: (value: object) => {
            notifyListeners('onPlaybackQualityChange', value);
        },
        onPlaybackRateChange: (value: object) => {
            notifyListeners('onPlaybackRateChange', value);
        },
        onError: (value: object) => {
            notifyListeners('onError', value);
        },
        onApiChange: (value: object) => {
            notifyListeners('onApiChange', value);
        },
    };
}

function notifyListeners(event: Event, value: unknown): void {
    // @ts-ignore
    const target = value.target as InternalListenerManager;
    target.__notifyListeners(event, value as UnknownEventValue);
}

export default { load, isLoaded, createPlayer };
