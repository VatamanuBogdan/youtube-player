import { YoutubePlayerController } from '../index';
import useContextController from './internal/useGlobalController';

export default function usePlayerController(): YoutubePlayerController {
    return useContextController('usePlayerController');
}
