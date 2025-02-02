import { PlayerId, PlayerState } from 'youtube-player-ts-api';

type PlayingStatus = 'Playing' | 'Paused' | 'Stopped';
type PlayerSize = { width: number; height: number };

function generatePlayerId(): PlayerId {
    return `Youtube-Player-${crypto.randomUUID()}`;
}

function isPlayingState(state: PlayerState | undefined | null): boolean {
    return state === PlayerState.PLAYING || state === PlayerState.BUFFERING;
}

class ListenedState<T> {
    public _value: T;
    private listeners: Set<(value: T) => void>;

    constructor(value: T) {
        this._value = value;
        this.listeners = new Set();
    }

    public get value(): T {
        return this._value;
    }

    public set value(value: T) {
        if (value === this._value) {
            return;
        }

        this.listeners.forEach((l) => l(value));
        this._value = value;
    }

    public addListener(listener: (value: T) => void): (value: T) => void {
        this.listeners.add(listener);
        return listener;
    }

    public removeListener(listener: (value: T) => void): void {
        this.listeners.delete(listener);
    }
}

export type { PlayingStatus, PlayerSize };
export { generatePlayerId, isPlayingState, ListenedState };
