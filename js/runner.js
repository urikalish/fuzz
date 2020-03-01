import { ConfigHelper } from './config.js';

export class Runner {
    constructor() {
        this.configHelper = new ConfigHelper();        
    }

    init() {
        this.configHelper.init();
        this.goButton = document.getElementById('fuzz-action-button-go');
        this.goButton.addEventListener('click', this.onGo.bind(this));
        this.stopButton = document.getElementById('fuzz-action-button-stop');
        this.stopButton.addEventListener('click', this.onStop.bind(this));
        this.TRANS_BASE_X = 45;
        this.TRANS_BASE_Y = 55; 
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
        const testsElm = document.getElementById('fuzz-tests');
        testsElm.innerHTML = '';
        this.cnv = [];
        this.ctx = [];
        this.config.tests.forEach((t, i) => {
            const panelElm = document.createElement('div');
            panelElm.classList.add('fuzz-test-panel');
            panelElm.innerText = t.name;
            testsElm.appendChild(panelElm);
            
            const canvasElm = document.createElement('canvas');
            canvasElm.setAttribute('id', `fuzz-test-canvas-${i}`);
            canvasElm.setAttribute('width', `${t.states[0].points[0].length}px`);
            canvasElm.setAttribute('height', `${t.states[0].points.length}px`);
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
            this.cnv[i].style['left'] = `${this.TRANS_BASE_X + state.transX || 0}px`;
            this.cnv[i].style['top'] = `${this.TRANS_BASE_Y + state.transY || 0}px`;
            this.cnv[i].style['transform'] =`rotateZ(${state.angle || 0}deg)`
        });
        this.count = (this.count+1) % 1000;
        if (!this.shouldStop && ((new Date()).getTime() - this.startTime) / 1000 <= this.config.durationSec) {
            if (this.config.timeoutMs >= 0) {
                setTimeout(this.step.bind(this), this.config.timeoutMs);
            } else {
                window.requestAnimationFrame(this.step.bind(this));
            }
        } else {
            this.stop();
        }     
    }

}
