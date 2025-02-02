import { useEffect, useState } from 'react';
import { YoutubePlayerController } from 'youtube-player-ts-api';

import useControllerEmitter from './internal/useControllerEmitter';

export default function useApiPlayerController(): YoutubePlayerController | null {
    const emitter = useControllerEmitter('useApiPlayerController');
    const [controller, setController] = useState<YoutubePlayerController | null>(null);

    useEffect(() => {
        emitter.on(setController);
        return () => {
            emitter.remove(setController);
        };
    }, [emitter]);

    return controller;
}
