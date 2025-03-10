import { useEffect, useState } from 'react';

import useContextController from './useGlobalController';
import { State, StateValueOf } from '../../utils/context-controller';

export default function usePlayerState<S extends State>(
    state: S,
    hookCaller?: string
): StateValueOf<S> {
    const contextController = useContextController(hookCaller);
    const [value, setValue] = useState(contextController.geValue(state));

    useEffect(() => {
        const listener = contextController.addListener(state, (v) => {
            setValue(v);
        });

        return () => {
            contextController.removeListener(state, listener);
        };
    }, [state, contextController]);

    return value;
}
