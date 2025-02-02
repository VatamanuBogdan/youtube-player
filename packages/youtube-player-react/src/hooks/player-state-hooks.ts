import { PlayerSize, PlayingStatus } from '../utils/helpers';
import usePlayerState from './internal/usePlayerState';

export function usePlayerPlay(): [PlayingStatus, (v: PlayingStatus) => void] {
    return usePlayerState('playing', 'usePlayerPlay');
}

export function usePlayerVolume(): [number, (v: number) => void] {
    return usePlayerState('volume', 'usePlayerVolume');
}

export function usePlayerMute(): [boolean, (v: boolean) => void] {
    return usePlayerState('mute', 'usePlayerMute');
}

export function usePlayerSize(): [PlayerSize, (v: PlayerSize) => void] {
    return usePlayerState('size', 'usePlayerSize');
}
