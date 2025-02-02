import { useContext } from 'react';

import { YoutubePlayerContext } from '../../components/YoutubePlayerProvider';
import ContextListener from '../../utils/context-listener';

export default function useContextListener(hookCaller?: string): ContextListener {
    const context = useContext(YoutubePlayerContext);

    if (context === undefined) {
        throw Error(
            `${hookCaller ?? 'Library hook/component'} must be used within YoutubePlayerProvider`
        );
    }

    return context.contextListener;
}
