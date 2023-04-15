import { initStore } from './store';

const configureStore = () => {
    const actions = {
        ADD: (state, amount, timeStamp) => ({
            timeStamp: state.timeStamp,
            seconds:(parseInt((Date.now() - state.timeStamp)/1000))-state.pausedSeconds,
            renderedSeconds: state.seconds % 60,
            minutes: parseInt(state.seconds/60),
            hours: parseInt(state.minutes/60),
            renderedMinutes: state.minutes % 60,
            isPlay: state.isPlay,
            isPaused: state.isPaused,
            pausedSeconds: state.isPaused ? state.pausedSeconds+amount : state.pausedSeconds,
            ticketNumber: state.ticketNumber,
            timers: state.timers,
        }
            ),
        PLAY: (state, previousTimeStamp) => ({
            timeStamp: previousTimeStamp ? previousTimeStamp : Date.now()-1200,
            seconds: 0,
            renderedSeconds: 0,
            minutes: 0,
            hours: 0,
            renderedMinutes: 0,
            isPlay: true,
            isPaused: false,
            pausedSeconds: 0,
            ticketNumber: state.ticketNumber,
            timers: state.timers,
        }),
        RESET: (state) => ({
            timeStamp: Date.now()-1200,
            seconds: 0,
            renderedSeconds: 0,
            minutes: 0,
            hours: 0,
            renderedMinutes: 0,
            isPlay: true,
            isPaused: false,
            pausedSeconds: 0,
            ticketNumber: state.ticketNumber,
            timers: state.timers,
        }),

        FAKE: (state, ago) => ({
            timeStamp: Date.now()-ago,
            seconds: 0,
            renderedSeconds: 0,
            minutes: 0,
            hours: 0,
            renderedMinutes: 0,
            isPlay: true,
            isPaused: false,
            pausedSeconds: 0,
            ticketNumber: state.ticketNumber,
            timers: state.timers,
        }),

        PAUSE: (state) => ({
            timeStamp: state.timeStamp,
            seconds: state.seconds,
            renderedSeconds: state.renderedSeconds,
            minutes: state.minutes,
            hours: state.hours,
            renderedMinutes: state.renderedMinutes,
            isPlay: false,
            isPaused: true,
            pausedSeconds: state.pausedSeconds,
            ticketNumber: state.ticketNumber,
            timers: state.timers
        }),        
        UNPAUSE: (state) => ({
            timeStamp: state.timeStamp,
            seconds: state.seconds,
            renderedSeconds: state.renderedSeconds,
            minutes: state.minutes,
            hours: state.hours,
            renderedMinutes: state.renderedMinutes,
            isPlay: true,
            isPaused: false,
            pausedSeconds: state.pausedSeconds,
            ticketNumber: state.ticketNumber,
            timers: state.timers
        }),  
        SAVETICKETNUMBER: (state, value) => ({
            timeStamp: state.timeStamp,
            seconds: state.seconds,
            renderedSeconds: state.renderedSeconds,
            minutes: state.minutes,
            hours: state.hours,
            renderedMinutes: state.renderedMinutes,
            isPlay: state.isPlay,
            isPaused: state.isPaused,
            ticketNumber: value,
            timers: state.timers
        }),
        ADDTIMER: (state, value) => ({
            timeStamp: state.timeStamp,
            seconds: state.seconds,
            renderedSeconds: state.renderedSeconds,
            minutes: state.minutes,
            hours: state.hours,
            renderedMinutes: state.renderedMinutes,
            isPlay: state.isPlay,
            isPaused: state.isPaused,
            ticketNumber: state.ticketNumber,
            timers: value[0].ticket + " " + value[0].seconds + " seconds",
        }),
        ADDTIMESTAMP: (state, value) => ({
            timeStamp: value,
            seconds: state.seconds,
            renderedSeconds: state.renderedSeconds,
            minutes: state.minutes,
            hours: state.hours,
            renderedMinutes: state.renderedMinutes,
            isPlay: state.isPlay,
            isPaused: state.isPaused,
            ticketNumber: state.ticketNumber,
            timers: state.timers
        })


    };
    

    initStore(actions, { timers: [], pausedSeconds: 0, renderedSeconds: 0, renderedMinutes: 0, seconds: 0, minutes: 0, hours: 0, isPlay: true });
};

export default configureStore;