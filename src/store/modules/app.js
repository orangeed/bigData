const app = {
    state: {
        nationwide: false,
        cardShow: false
    },
    mutations: {
        SET_NATIONWIDE: (state, nationwide) => {
            state.nationwide = nationwide
        },
        SET_CARDSHOW: (state, cardShow) => {
            state.cardShow = cardShow
        }
    },
    actions: {

    }
}

export default app