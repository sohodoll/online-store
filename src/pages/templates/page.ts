abstract class Page {
    protected container: HTMLElement;
    protected mainHTML: HTMLElement;
    static TextObject = {};

    constructor(id: string) {
        this.container = document.createElement('div');
        if (id === '') id = 'main';
        this.container.className = `${id}-wrapper wrapper`;
        this.container.id = id;
        this.mainHTML = <HTMLElement>document.querySelector('#main');
    }

    protected createHTML(text: string): void {
        /*const title = document.createElement('h1');
        title.innerText = text;
        return title;*/
        this.container.innerHTML = text;
    }

    render() {
        return this.container;
    }
}

export default Page;
