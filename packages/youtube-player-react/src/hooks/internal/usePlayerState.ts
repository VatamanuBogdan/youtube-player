import { useEffect, useState } from 'react';

import useContextController from './useGlobalController';
import { State, StateValueOf } from '../../utils/context-controller';

type StateMutator<S extends State> = (value: StateValueOf<S>) => void;

export default function usePlayerState<S extends State>(
    state: S,
    hookCaller?: string
): [StateValueOf<S>, StateMutator<S>] {
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

    return [value, (value) => contextController.setValue(state, value)];
}
