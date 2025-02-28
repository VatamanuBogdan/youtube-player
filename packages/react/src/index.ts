import YoutubePlayer from './components/YoutubePlayer';
import YoutubePlayerProvider from './components/YoutubePlayerProvider';
import {
    usePlayerDuration,
    usePlayerMute,
    usePlayerPlay,
    usePlayerSize,
    usePlayerVolume,
} from './hooks/player-state-hooks';
import useApiPlayerController from './hooks/useApiPlayerController';
import useApiPlayerHandler from './hooks/useApiPlayerHandler';
import useApiPlayerListener from './hooks/useApiPlayerListener';
import usePlayerController from './hooks/usePlayerController';
import ContextController from './utils/context-controller';

type YoutubePlayerController = ContextController;

export { YoutubePlayer, YoutubePlayerProvider, YoutubePlayerController };

export {
    usePlayerMute,
    usePlayerPlay,
    usePlayerSize,
    usePlayerVolume,
    usePlayerDuration,
    usePlayerController,
    useApiPlayerController,
    useApiPlayerHandler,
    useApiPlayerListener,
};
