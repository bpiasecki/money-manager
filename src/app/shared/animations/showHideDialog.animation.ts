export const ShowHideDialogAnimation = {
    incomingOptions: {
        keyframes: [
            { opacity: '0', transform: 'scale(0.7)' },
            { opacity: '1', transform: 'scale(1)' }
        ],
        keyframeAnimationOptions: { easing: 'ease-in-out', duration: 300 }
    },
    outgoingOptions: {
        keyframes: [
            { opacity: '1', transform: 'scale(1)' },
            { opacity: '0', transform: 'scale(1.3)' }
        ],
        keyframeAnimationOptions: { easing: 'ease-in-out', duration: 300 }
    }
}