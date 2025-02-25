import { Event, EventListener } from '@youtube-player/api';
import { DependencyList, useEffect } from 'react';

import useContextListener from './internal/useContextListener';

export default function useApiPlayerListener<E extends Event>(
    event: E,
    listener: EventListener<E>,
    deps: DependencyList = []
): void {
    const hooksListener = useContextListener('useApiPlayerListener');

    useEffect(() => {
        hooksListener.addListener(event, listener);

        return () => {
            hooksListener.removeListener(event, listener);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hooksListener, event, listener, ...deps]);
}
