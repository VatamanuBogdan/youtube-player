import { EventListener, PlayerState, YoutubePlayerController } from 'youtube-player-ts-api';

import ControllerEmitter from './controller-emitter';
import { ListenedState, PlayerSize, PlayingStatus } from './helpers';

export type State = keyof StateTypes;

export type StateTypes = {
    playing: PlayingStatus;
    volume: number;
    mute: boolean;
    size: PlayerSize;
    playlistLoop: boolean;
    playlistShuffle: boolean;
};

export type StateValueOf<S extends State> = StateTypes[S];
export type StateListener<S extends State> = (value: StateValueOf<S>) => void;

export default class ContextPlayerController {
    private emitter: ControllerEmitter;
    private controller: YoutubePlayerController | null;

    private stateChangeListener: EventListener<'onStateChange'> | null;

    private states = {
        playing: new ListenedState<PlayingStatus>('Paused'),
        volume: new ListenedState(75),
        mute: new ListenedState(false),
        size: new ListenedState({ width: 600, height: 400 }),
        playlistLoop: new ListenedState(false),
        playlistShuffle: new ListenedState(false),
    };

    private pendingVideoId: string | null;

    public constructor(emitter: ControllerEmitter) {
        this.emitter = emitter;
        this.controller = null;
        this.stateChangeListener = null;
        this.pendingVideoId = null;

        this.setupControllerListeners();
    }

    public loadVideoById(id: string): void {
        if (this.controller) {
            this.controller.loadVideoById(id);
        } else {
            this.pendingVideoId = id;
        }
    }

    public geValue<S extends State>(state: S): StateValueOf<S> {
        return this.states[state].value as StateValueOf<S>;
    }

    public setValue<S extends State>(state: S, value: StateValueOf<S>): void {
        switch (state) {
            case 'playing':
                this.playing = value as StateValueOf<'playing'>;
                break;
            case 'volume':
                this.volume = value as StateValueOf<'volume'>;
                break;
            case 'mute':
                this.mute = value as StateValueOf<'mute'>;
                break;
            case 'size':
                this.size = value as StateValueOf<'size'>;
                break;
            case 'playlistLoop':
                this.playlistLoop = value as StateValueOf<'playlistLoop'>;
                break;
            case 'playlistShuffle':
                this.playlistShuffle = value as StateValueOf<'playlistShuffle'>;
                break;
        }
    }

    public get playing(): PlayingStatus {
        return this.states.playing.value;
    }

    public set playing(value: PlayingStatus) {
        if (!this.controller) {
            this.states.playing.value = value;
        } else {
            switch (value) {
                case 'Playing':
                    this.controller.playVideo();
                    break;
                case 'Paused':
                    this.controller.pauseVideo();
                    break;
                case 'Stopped':
                    this.controller.stopVideo();
                    break;
            }
        }
    }

    public get mute(): boolean {
        return this.states.mute.value;
    }

    public set mute(value: boolean) {
        if (this.controller) {
            if (value) {
                this.controller.mute();
            } else {
                this.controller.unMute();
            }
        }

        this.states.mute.value = value;
    }

    public get volume(): number {
        return this.states.volume.value;
    }

    public set volume(value: number) {
        if (this.controller) {
            this.controller.setVolume(value);
        }
        this.states.volume.value = value;
    }

    public get playlistLoop(): boolean {
        return this.states.playlistLoop.value;
    }

    public set playlistLoop(value: boolean) {
        if (this.controller) {
            this.controller.setLoop(value);
        }
        this.states.playlistLoop.value = value;
    }

    public get playlistShuffle(): boolean {
        return this.states.playlistLoop.value;
    }

    public set playlistShuffle(value: boolean) {
        if (this.controller) {
            this.controller.setShuffle(value);
        }
        this.states.playlistShuffle.value = value;
    }

    public get size(): PlayerSize {
        return this.states.size.value;
    }

    public set size(value: PlayerSize) {
        if (this.controller) {
            this.controller.setSize(value.width, value.height);
        }
        this.states.size.value = value;
    }

    public addListener<S extends State>(state: S, listener: StateListener<S>): StateListener<S> {
        // @ts-ignore
        this.states[state].addListener(listener);
        return listener;
    }

    public removeListener<S extends State>(state: S, listener: StateListener<S>): StateListener<S> {
        // @ts-ignore
        this.states[state].removeListener(listener);
        return listener;
    }

    private setupControllerListeners() {
        this.emitter.on((controller) => {
            if (controller) {
                this.setupStateListener(controller);
                this.setupControllerStates(controller);
                this.controller = controller;
                if (this.pendingVideoId) {
                    controller.loadVideoById(this.pendingVideoId);
                    this.pendingVideoId = null;
                }
            } else {
                this.clearStateListener();
                this.controller = null;
            }
        });
    }

    private setupStateListener(controller: YoutubePlayerController) {
        this.stateChangeListener = (value) => {
            const state = value.data;
            if (state === PlayerState.PLAYING || state === PlayerState.BUFFERING) {
                this.states.playing.value = 'Playing';
            } else {
                this.states.playing.value = 'Paused';
            }
        };

        return controller.addListener('onStateChange', this.stateChangeListener);
    }

    private clearStateListener() {
        if (this.controller && this.stateChangeListener) {
            this.controller.removeListener('onStateChange', this.stateChangeListener);
        }
    }

    private setupControllerStates(controller: YoutubePlayerController) {
        switch (this.states.playing.value) {
            case 'Playing':
                controller.playVideo();
                break;
            case 'Paused':
                controller.pauseVideo();
                break;
            case 'Stopped':
                controller.stopVideo();
                break;
        }

        controller.setVolume(this.states.volume.value);
        if (this.states.mute.value) {
            controller.mute();
        } else {
            controller.unMute();
        }

        const size = this.states.size.value;
        controller.setSize(size.width, size.height);

        controller.setLoop(this.states.playlistLoop.value);
        controller.setShuffle(this.states.playlistShuffle.value);
    }
}
