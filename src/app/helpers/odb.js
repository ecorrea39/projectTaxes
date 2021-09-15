/**
 * Escritura, lectura, borrado y validación de
 * objetos y arreglos en window.localStorages
 */
const odb = {};

odb.exist = (key) => {
    try {
        const k = window.localStorage.getItem(key);
        if (k === undefined || k === null || k.length === 0) {
            return false;
        }
        return true;
    } catch {
        return false;
    }
};

odb.set = (key, val) => {
    let value;
    try {
        value = JSON.stringify(val);
    } catch {
        value = val;
    }
    window.localStorage.setItem(key, value);
};

odb.get = (key) => {
    if (!odb.exist(key)) return false;
    const val = window.localStorage.getItem(key);
    let value;
    try {
        value = JSON.parse(val);
    } catch {
        value = val;
    }
    return value;
};

odb.remove = (key) => {
    if (Array.isArray(key)) {
        for (const i in key) {
            window.localStorage.removeItem(key[i]);
        }
    } else if (typeof key === 'string') {
        window.localStorage.removeItem(key);
    } else {
        console.error('LS: Tipo inválido');
    }
};

odb.clear = () => {
    window.localStorage.clear();
};

export default odb;