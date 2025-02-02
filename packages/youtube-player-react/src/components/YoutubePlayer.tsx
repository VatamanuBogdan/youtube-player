import { useEffect, useMemo, useRef } from 'react';
import {
    PlayerProprieties,
    YoutubeApiLoader,
    YoutubePlayerController,
} from 'youtube-player-ts-api';

import useControllerEmitter from '../hooks/internal/useControllerEmitter';
import { generatePlayerId } from '../utils/helpers';

export default function YoutubePlayer(props: PlayerProprieties): JSX.Element {
    const emitter = useControllerEmitter('YoutubePlayer');
    const controllerRef = useRef<YoutubePlayerController | undefined>(undefined);
    const controllerGuardRef = useRef<boolean>(false);

    const playerId = useMemo(() => generatePlayerId(), []);

    useEffect(() => {
        if (controllerGuardRef.current) {
            return;
        }

        controllerGuardRef.current = true;
        async function createYoutubePlayerController() {
            try {
                if (!YoutubeApiLoader.isLoaded()) {
                    await YoutubeApiLoader.load();
                }

                const controller = await YoutubeApiLoader.createPlayer(playerId, props);
                controllerRef.current = controller;
                emitter.emit(controller);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(
                    `Failed [${playerId}] to init controller for player ${playerId} because ${error}`
                );
            }
        }

        createYoutubePlayerController();
    }, [emitter, playerId]);

    return <div id={playerId} />;
}
