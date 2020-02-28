import { ConfigHelper } from './config.js';

export class Runner {
    constructor() {
        this.configHelper = new ConfigHelper();        
    }

    init() {
        this.configHelper.init();
        this.goButton = document.getElementById('fuzz-config-button-go');
        this.goButton.addEventListener('click', this.onGo.bind(this));
        this.stopButton = document.getElementById('fuzz-config-button-stop');
        this.stopButton.addEventListener('click', this.onStop.bind(this));
    }
    
    onGo() {
        this.goButton.setAttribute('disabled', 'disabled');
        this.stopButton.removeAttribute('disabled');
        this.config = this.configHelper.config;
        this.buildUI();
        this.startTime = (new Date()).getTime();
        this.count = 0;
        this.shouldStop = false;
        this.step();
    }

    onStop() {
        this.stopButton.setAttribute('disabled', 'disabled');
        this.shouldStop = true;
    }

    stop() {
        this.stopButton.setAttribute('disabled', 'disabled');
        this.goButton.removeAttribute('disabled');        
    }

    buildUI() {
        const mainElm = document.getElementById('fuzz-main');
        mainElm.innerHTML = '';
        this.cnv = [];
        this.ctx = [];
        this.config.tests.forEach((t, i) => {
            const panelElm = document.createElement('div');
            panelElm.classList.add('fuzz-test-panel');
            panelElm.innerText = t.name;
            mainElm.appendChild(panelElm);
            
            const canvasElm = document.createElement('canvas');
            canvasElm.setAttribute('id', `fuzz-test-canvas-${i}`);
            canvasElm.setAttribute('width', '10px');
            canvasElm.setAttribute('height', '10px');
            canvasElm.classList.add('fuzz-test-canvas');
            panelElm.appendChild(canvasElm);
            this.cnv.push(canvasElm);
            this.ctx.push(canvasElm.getContext('2d'));
        });
    }

    step() {
        this.config.tests.forEach((t, i) => {
            const ctx = this.ctx[i];
            const state = t.states[this.count % t.states.length]; 
            state.points.forEach((row, r) => {
                for(let c = 0; c < row.length; c++) {
                    ctx.fillStyle = row[c] === '1' ? '#fff' : '#000';
                    ctx.fillRect(c, r, 1, 1);
                }
            });
            if (state.angle) {
                this.cnv[i].style['transform'] =`rotateZ(${state.angle}deg)`;
            } else {
                this.cnv[i].style['transform'] = 'rotateZ(0deg)';
            }
        });
        this.count = (this.count+1) % 1000;
        if (!this.shouldStop && ((new Date()).getTime() - this.startTime) / 1000 <= this.config.durationSec) {
            setTimeout(this.step.bind(this), this.config.timeoutMs);
        } else {
            this.stop();
        }     
    }

}
