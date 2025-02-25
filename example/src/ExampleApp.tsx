import { YoutubePlayerProvider } from '@youtube-player/react';

import PlayerPage from './pages/PlayerPage';

function ExampleApp(): JSX.Element {
    return (
        <YoutubePlayerProvider>
            <PlayerPage />
        </YoutubePlayerProvider>
    );
}

export default ExampleApp;
