import { YoutubePlayerController } from '@youtube-player/api';

import useControllerEmitter from './internal/useControllerEmitter';

type ArgumentHandler<T> = (controller: YoutubePlayerController, ...args: T[]) => void;
type ResultHandler<T> = (...args: T[]) => void;

export default function useApiPlayerHandler<T>(handler: ArgumentHandler<T>): ResultHandler<T> {
    const emitter = useControllerEmitter('useApiPlayerHandler');

    return (...input) => {
        const controller = emitter.getController();
        if (controller) {
            handler(controller, ...input);
        }
    };
}
