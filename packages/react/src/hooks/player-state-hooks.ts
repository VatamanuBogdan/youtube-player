import { PlayerSize, PlayingStatus } from '../utils/helpers';
import usePlayerMutableState from './internal/usePlayerMutableState';
import usePlayerState from './internal/usePlayerState';

export function usePlayerPlay(): [PlayingStatus, (v: PlayingStatus) => void] {
    return usePlayerMutableState('playing', 'usePlayerPlay');
}

export function usePlayerVolume(): [number, (v: number) => void] {
    return usePlayerMutableState('volume', 'usePlayerVolume');
}

export function usePlayerMute(): [boolean, (v: boolean) => void] {
    return usePlayerMutableState('mute', 'usePlayerMute');
}

export function usePlayerSize(): [PlayerSize, (v: PlayerSize) => void] {
    return usePlayerMutableState('size', 'usePlayerSize');
}

export function usePlayerDuration(): number {
    return usePlayerState('duration', 'usePlayerSize');
}
