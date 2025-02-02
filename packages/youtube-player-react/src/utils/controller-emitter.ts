import { YoutubePlayerController } from 'youtube-player-ts-api';

export type ControllerListener = (c: YoutubePlayerController | null) => void;

export default class ControllerEmitter {
    private listeners: Set<ControllerListener>;
    private controller: YoutubePlayerController | null;

    public constructor() {
        this.listeners = new Set();
        this.controller = null;
    }

    public on(listener: ControllerListener): ControllerListener {
        if (this.controller) {
            listener(this.controller);
        }
        this.listeners.add(listener);
        return listener;
    }

    public remove(listener: ControllerListener): void {
        this.listeners.delete(listener);
    }

    public emit(controller: YoutubePlayerController | null): void {
        this.controller = controller;
        this.listeners.forEach((l) => l(controller));
    }

    public getController(): YoutubePlayerController | null {
        return this.controller;
    }
}
