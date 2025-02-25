export {};

declare global {
    interface Window {
        onYouTubeIframeAPIReady?: () => void;
    }

    interface YTPlayerCtorProps {
        height: number;
        width: number;
        events: {
            onReady: (v: object) => void;
            onStateChange: (v: object) => void;
            onPlaybackQualityChange: (v: object) => void;
            onPlaybackRateChange: (v: object) => void;
            onError: (v: object) => void;
            onApiChange: (v: object) => void;
        };
        playerVars: {
            autoplay: number;
            color: 'red' | 'white';
            controls: number;
            disablekb: number;
            fs: number;
            iv_load_policy: number;
            rel: number;
        };
    }

    const YT: {
        Player: {
            new (id: string, props: YTPlayerCtorProps): Player;
        };
    };
}
