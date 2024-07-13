import type { Config } from './models/config';
import './styles/styles.css';
import './styles/_styles.scss';
import App from './App.svelte';
import ApplicationService from './services/application-service';
import tagStore$ from './stores/tag-store';
import util from './util';

const main = (config: Config): App => {
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

const initTags = (config: Config): Config => {
	// Upgrade older session configurations
	config?.sessions?.forEach(s => s.tags = s.tags || []);
	const tags = config?.sessions
		?.flatMap(session => session.tags || [])
		?? [];
	tagStore$.updateTags(tags);

	return config;
}

const migrateToUUIDs = (config: Config): Config => {
	if (config.version ?? 0 >= 20240215) {
		return config;
	}

	// First upgrade program and arg IDs
	let progIdMaps = new Map<string, string>();
	let argIdMaps = new Map<string, string>();
	config?.programs?.forEach(p => {
		const puuid = util.createUUID();
		progIdMaps.set(p.id, puuid);
		p.id = puuid;

		// Handle args
		p.arguments.forEach(arg => {
			const auuid = util.createUUID();
			argIdMaps.set(arg.id, auuid);
			arg.id = auuid;
		})
	});

	// Now map all the new IDs for the sessions
	config?.sessions?.forEach(s => {
		s.id = util.createUUID();

		s.programs.forEach(sp => {
			sp.exeId = util.createUUID();

			sp.id = progIdMaps.get(sp.id) ?? util.createUUID();

			sp.arguments.forEach(spa => {
				spa.id = argIdMaps.get(spa.id) ?? util.createUUID();
			})
		})
	})

	// Set new version
	config.version = 20240215;

	return config;
}

ApplicationService
	.loadConfiguration()
	.then(initTags)
	.then(migrateToUUIDs)
	.then(main);
