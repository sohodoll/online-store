abstract class Page {
    protected container: HTMLElement;
    protected mainHTML: HTMLElement;
    static TextObject = {};

    constructor(id: string) {
        this.container = document.createElement('div');
        this.container.classList.add('wrapper');
        this.container.id = id;
        this.mainHTML = <HTMLElement>document.querySelector('main');
    }

    protected createTitle(text: string) {
        const title = document.createElement('h1');
        title.innerText = text;
        return title;
    }

    render() {
        return this.container;
    }
}

export default Page;
