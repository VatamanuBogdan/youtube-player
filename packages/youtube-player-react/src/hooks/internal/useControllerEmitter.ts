import { useContext } from 'react';

import { YoutubePlayerContext } from '../../components/YoutubePlayerProvider';
import ControllerEmitter from '../../utils/controller-emitter';

export default function useControllerEmitter(hookCaller?: string): ControllerEmitter {
    const context = useContext(YoutubePlayerContext);

    if (context === undefined) {
        throw Error(
            `${hookCaller ?? 'Library hook/component'} must be used within YoutubePlayerProvider`
        );
    }

    return context.emitter;
}
