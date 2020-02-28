import { ConfigHelper } from './config.js';

export class Runner {
    constructor() {
        this.configHelper = new ConfigHelper();
        this.goButton = document.getElementById('fuzz-config-button-go');
        this.goButton.addEventListener('click', this.onGo.bind(this));
    }

    init() {
        this.configHelper.init();
    }
    
    onGo() {
        this.buildUI();
    }

    buildUI() {
        const mainElm = document.getElementById('fuzz-main');
        mainElm.innerHTML = '';
        const config = this.configHelper.config;
        config.tests.forEach(t => {
            const panelElm = document.createElement('div');
            panelElm.classList.add('fuzz-test-panel');
            panelElm.innerText = t.name;
            mainElm.appendChild(panelElm);
        });
    }

}
