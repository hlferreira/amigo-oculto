import App from './components/app.svelte'

export const app = new App({
    target: document.getElementById('app') as HTMLElement
});

function bootstrap() {
}

bootstrap();