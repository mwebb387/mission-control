// import EelService from './eel-service';
// import NeutralinoService from './neutralino-service';
import TauriService from './tauri-service';
import AppDevService from './app-dev-service';

const dynamicWindow = (window as any);
const service = dynamicWindow.__TAURI_INVOKE__ ? TauriService : AppDevService;

export default { ...service }
