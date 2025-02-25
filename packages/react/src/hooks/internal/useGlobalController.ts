import { useContext } from 'react';

import { YoutubePlayerContext } from '../../components/YoutubePlayerProvider';
import ContextPlayerController from '../../utils/context-controller';

export default function useContextController(hookCaller?: string): ContextPlayerController {
    const context = useContext(YoutubePlayerContext);

    if (context === undefined) {
        throw Error(
            `${hookCaller ?? 'Library hook/component'} must be used within YoutubePlayerProvider`
        );
    }

    return context.contextController;
}
