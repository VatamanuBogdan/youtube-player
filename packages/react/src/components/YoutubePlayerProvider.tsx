import { PropsWithChildren, createContext, useState } from 'react';

import ContextPlayerController from '../utils/context-controller';
import ContextListener from '../utils/context-listener';
import ControllerEmitter from '../utils/controller-emitter';

export const YoutubePlayerContext = createContext<
    | {
          emitter: ControllerEmitter;
          contextListener: ContextListener;
          contextController: ContextPlayerController;
      }
    | undefined
>(undefined);

export default function YoutubePlayerProvider({ children }: PropsWithChildren): JSX.Element {
    const [context] = useState(() => {
        const emitter = new ControllerEmitter();
        const contextListener = new ContextListener(emitter);
        const contextController = new ContextPlayerController(emitter);

        return { emitter, contextListener, contextController };
    });

    return (
        <YoutubePlayerContext.Provider value={context}>{children}</YoutubePlayerContext.Provider>
    );
}
