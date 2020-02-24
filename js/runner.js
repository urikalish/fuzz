import { Config } from './config.js';

export class Runner {
    constructor() {
        this.config = new Config(this.onGo);
    }

    init() {
        this.config.init();
    }
    
    onGo() {
        alert('GO');
    }
}
