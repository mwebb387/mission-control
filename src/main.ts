import type { Config } from './models/config';
import './styles/_styles.scss';
import App from './App.svelte';
import ApplicationService from './services/application-service';
import tagStore$ from './stores/tag-store';

const main = (config: Config) : App => {
  // Register notifications for Eel
  // registerNotificationMethod();

  // Initialize the application
	const app = new App({
		target: document.body,
		props: {
			sessions: config.sessions,
			programs: config.programs
		}
	});

	return app;
}

const initTags = (config: Config) : Config => {
  // Upgrade older session configurations
  config?.sessions?.forEach(s => s.tags = s.tags || []);
  const tags = config?.sessions
    ?.flatMap(session => session.tags || [])
    ?? [];
  tagStore$.updateTags(tags);

  return config;
}

ApplicationService
	.loadConfiguration()
  .then(initTags)
	.then(main);
