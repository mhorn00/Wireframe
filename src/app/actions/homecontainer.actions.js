const SWITCH_VIEW = 'SWITCH_VIEW';

export default {SWITCH_VIEW};

export function switchScreen(toScreen){
    return {
        type: SWITCH_VIEW,
        toScreen
    }
}