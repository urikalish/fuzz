export class Config {
    constructor(goCallback) {
        this.LOCAL_STORAGE_CONFIG_KEY = 'fuzzConfig';
        this.defaultConfigObj = {
            version: '1.0'
        };
        this.goCallback = goCallback;
    }

    init() {
        this.setDomElements();
        this.ensureLocalStorage();
        this.load();
        this.onConfigChange(); 
    }

    ensureLocalStorage() {
        if (!localStorage.getItem(this.LOCAL_STORAGE_CONFIG_KEY)) {
            this.save(JSON.stringify(this.defaultConfigObj));
        }
    }

    setDomElements() {
        this.configTextarea = document.getElementById('fuzz-config-text');
        this.defaultsButton = document.getElementById('fuzz-config-button-defaults');
        this.saveButton = document.getElementById('fuzz-config-button-save');
        this.goButton = document.getElementById('fuzz-config-button-go');
        this.configTextarea.addEventListener('keyup', this.onConfigChange.bind(this));        
        this.defaultsButton.addEventListener('click', this.onClickDefaults.bind(this));
        this.saveButton.addEventListener('click', this.onClickSave.bind(this));
        this.goButton.addEventListener('click', this.onClickGo.bind(this));
    }

    load() {
        this.initialConfigStr = JSON.stringify(JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_CONFIG_KEY)), null, 2);
        this.configTextarea.value = this.initialConfigStr;
        this.onConfigChange();    
    }

    save(str) {
        localStorage.setItem(this.LOCAL_STORAGE_CONFIG_KEY, str.trim());
    }

    checkConfig() {
        const configStr = this.configTextarea.value;
        try {
            JSON.parse(configStr);
            return true;
        } catch (e) {
            return false;
        }
    }
        
    onConfigChange() {
        const configOK = this.checkConfig();
        const canSave = configOK && (this.initialConfigStr !== this.configTextarea.value);
        const CONFIG_TEXT_ERROR_CLASS = 'fuzz-config-text--error';
        if (configOK) {
            this.configTextarea.classList.remove(CONFIG_TEXT_ERROR_CLASS);
        } else {
            this.configTextarea.classList.add(CONFIG_TEXT_ERROR_CLASS);
        }
        if (configOK && (JSON.stringify(JSON.parse(this.configTextarea.value), null, 2) === JSON.stringify(this.defaultConfigObj, null, 2))) {
            this.defaultsButton.setAttribute('disabled', 'disabled');
        } else {
            this.defaultsButton.removeAttribute('disabled');
        }
        if (canSave) {
            this.saveButton.removeAttribute('disabled');
        } else {
            this.saveButton.setAttribute('disabled', 'disabled');
        }
    }
    
    onClickDefaults() {
        this.configTextarea.value = JSON.stringify(this.defaultConfigObj, null, 2);
        this.onConfigChange();
    }
    
    onClickSave() {
        this.saveButton.setAttribute('disabled', 'disabled');
        this.save(this.configTextarea.value);
        this.load();
    }
    
    onClickGo() {
        this.goCallback();
    }
}
