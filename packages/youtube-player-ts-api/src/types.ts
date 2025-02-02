type PlayerId = string;

enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    VIDEO_CUED = 5,
}

function toStringState(state: PlayerState): string {
    switch (state) {
        case PlayerState.UNSTARTED:
            return 'UNSTARTED';
        case PlayerState.ENDED:
            return 'ENDED';
        case PlayerState.PLAYING:
            return 'PLAYING';
        case PlayerState.PAUSED:
            return 'PAUSED';
        case PlayerState.BUFFERING:
            return 'BUFFERING';
        case PlayerState.VIDEO_CUED:
            return 'VIDEO_CUED';
    }
}

type PlaybackQuality = 'small' | 'medium' | 'large' | 'hd720' | 'hd1080' | 'highres';

type SphericalProperties = {
    /* Between 0 and 360 */
    yaw: number;

    /* Between -90 and 90 */
    pitch: number;

    /* Between -180 and 180 */
    roll: number;

    /* Between 30 and 120 */
    fov?: number;
};

enum PlayerError {
    INVALID_PARAMETERS = 2,
    HTML5_PLAYER = 5,
    VIDEO_NOT_FOUND = 100,
    BLOCKED_BY_OWNER = 101,
    DISGUISED_BLOCKED_BY_OWNER = 105,
}

function toStringError(error: PlayerError): string {
    switch (error) {
        case PlayerError.INVALID_PARAMETERS:
            return 'INVALID_PARAMETERS';
        case PlayerError.HTML5_PLAYER:
            return 'HTML5_PLAYER';
        case PlayerError.VIDEO_NOT_FOUND:
            return 'VIDEO_NOT_FOUND';
        case PlayerError.BLOCKED_BY_OWNER:
            return 'BLOCKED_BY_OWNER';
        case PlayerError.DISGUISED_BLOCKED_BY_OWNER:
            return 'DISGUISED_BLOCKED_BY_OWNER';
    }
}

interface PlayerProprieties {
    width: number;
    height: number;
    autoplay: boolean;
    barColor: 'red' | 'white';
    displayControls: boolean;
    disableKeyboardInteraction: boolean;
    disableFullscreen: boolean;
    showVideoAnnotations: boolean;
    showRelatedVideos: boolean;
}

export type { PlayerId, PlaybackQuality, SphericalProperties, PlayerProprieties };

export { PlayerState, PlayerError, toStringState, toStringError };
