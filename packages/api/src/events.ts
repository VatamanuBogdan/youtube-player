import { YoutubePlayerController } from '.';
import { PlaybackQuality, PlayerError, PlayerState } from './types';

const events = [
    'onReady',
    'onStateChange',
    'onPlaybackQualityChange',
    'onPlaybackRateChange',
    'onError',
    'onApiChange',
] as const;

type Event = (typeof events)[number];

interface EventDataType {
    onReady: void;
    onStateChange: PlayerState;
    onPlaybackQualityChange: PlaybackQuality;
    onPlaybackRateChange: number;
    onError: PlayerError;
    onApiChange: void;
}

interface UnknownEventValue<D = unknown> {
    target: YoutubePlayerController;
    data: D;
}

interface EventValue<E extends Event> extends UnknownEventValue {
    data: EventDataType[E];
}

type EventListener<E extends Event> = (value: EventValue<E>) => void;
type UnkownEventListener = (value: UnknownEventValue) => void;

interface ListenersManager {
    addEventListener(event: Event, listener: string): void;
    removeEventListener(event: Event, listener: string): void;

    addListener<E extends Event>(event: E, listener: EventListener<E>): void;
    removeListener<E extends Event>(event: E, listener: EventListener<E>): void;
}

interface InternalListenerManager extends ListenersManager {
    __customListenersRegistry: Map<Event, UnkownEventListener[]>;
    __notifyListeners: (event: Event, value: UnknownEventValue) => void;
}

function initListenerManager(manager: ListenersManager): void {
    const listenersRegistry = new Map<Event, UnkownEventListener[]>([
        ['onReady', []],
        ['onStateChange', []],
        ['onPlaybackQualityChange', []],
        ['onPlaybackRateChange', []],
        ['onError', []],
        ['onApiChange', []],
    ]);

    const internalManager = manager as InternalListenerManager;

    internalManager.__customListenersRegistry = listenersRegistry;

    internalManager.__notifyListeners = (event, value) => {
        listenersRegistry.get(event)?.forEach((listener) => {
            listener(value);
        });
    };

    internalManager.addListener = concreteAddListener;
    internalManager.removeListener = concreteRemoveListener;
}

function deinitListenerManager(manager: ListenersManager): void {
    const internalManager = manager as InternalListenerManager;

    // @ts-ignore
    internalManager.__customListenersRegistry = null;
    // @ts-ignore
    internalManager.__notifyListeners = null;
}

function concreteAddListener<E extends Event>(
    this: InternalListenerManager,
    event: E,
    listener: EventListener<E>
) {
    const listeners = this.__customListenersRegistry.get(event)!;
    if (listeners.includes(listener as UnkownEventListener)) {
        return;
    }
    listeners.push(listener as UnkownEventListener);
}

function concreteRemoveListener<E extends Event>(
    this: InternalListenerManager,
    event: E,
    listener: EventListener<E>
) {
    const listeners = this.__customListenersRegistry.get(event)!;
    const index = listeners.indexOf(listener as UnkownEventListener);
    if (index < 0) {
        return;
    }
    listeners.splice(index, 1);
}

export type {
    Event,
    UnknownEventValue,
    EventValue,
    ListenersManager,
    InternalListenerManager,
    EventListener,
};
export { events, initListenerManager, deinitListenerManager };
