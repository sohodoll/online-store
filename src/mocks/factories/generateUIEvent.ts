export const generateUIEvent = (eventProps?: Partial<UIEvent>): UIEvent => ({
    which: 49,
    preventDefault: jest.fn(),
    detail: 0,
    view: null,
    initUIEvent: function (
        typeArg: string,
        bubblesArg?: boolean | undefined,
        cancelableArg?: boolean | undefined,
        viewArg?: Window | null | undefined,
        detailArg?: number | undefined
    ): void {
        throw new Error('Function not implemented.');
    },
    bubbles: false,
    cancelBubble: false,
    cancelable: false,
    composed: false,
    currentTarget: null,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: false,
    returnValue: false,
    srcElement: null,
    target: null,
    timeStamp: 0,
    type: '',
    composedPath: function (): EventTarget[] {
        throw new Error('Function not implemented.');
    },
    initEvent: function (type: string, bubbles?: boolean | undefined, cancelable?: boolean | undefined): void {
        throw new Error('Function not implemented.');
    },
    stopImmediatePropagation: function (): void {
        throw new Error('Function not implemented.');
    },
    stopPropagation: function (): void {
        throw new Error('Function not implemented.');
    },
    AT_TARGET: 0,
    BUBBLING_PHASE: 0,
    CAPTURING_PHASE: 0,
    NONE: 0,
    ...eventProps,
});
