import { Event, EventListener, YoutubePlayerController, events } from '@youtube-player/api';

import ControllerEmitter from './controller-emitter';

export default class ContextListener {
    private listeners: Map<Event, Function[]>;
    private mediators: [Event, Function][];

    protected controller: YoutubePlayerController | null;

    public constructor(emitter: ControllerEmitter) {
        this.listeners = new Map(events.map((e) => [e, []]));
        this.controller = null;

        this.mediators = this.createMediators();

        emitter.on((controller) => {
            if (Object.is(this.controller, controller)) {
                return;
            }
            if (this.controller) {
                this.removeMediators(this.controller);
            }
            if (controller) {
                this.addMediators(controller);
            }

            this.controller = controller;
        });
    }

    public addListener<E extends Event>(event: E, listener: EventListener<E>): EventListener<E> {
        const eventListeners = this.listeners.get(event);
        if (!eventListeners) {
            return listener;
        }

        if (!eventListeners.includes(listener)) {
            eventListeners.push(listener);
        }

        return listener;
    }

    public removeListener<E extends Event>(event: E, listener: EventListener<E>): EventListener<E> {
        const eventListeners = this.listeners.get(event);
        if (!eventListeners) {
            return listener;
        }

        const index = eventListeners.indexOf(listener);
        if (index < 0) {
            return listener;
        }
        eventListeners.splice(index, 1);

        return listener;
    }

    private addMediators(controller: YoutubePlayerController) {
        this.mediators.forEach(([e, m]) => {
            controller.addListener(e, m as EventListener<typeof e>);
        });
    }

    private removeMediators(controller: YoutubePlayerController) {
        this.mediators.forEach(([e, m]) => {
            controller.removeListener(e, m as EventListener<typeof e>);
        });
    }

    private createMediators(): [Event, Function][] {
        return events.map((e) => [e, this.createMediator(e)]);
    }

    private createMediator<E extends Event>(event: E): EventListener<E> {
        return (value) => {
            this.listeners.get(event)?.forEach((listener) => listener(value));
        };
    }
}
