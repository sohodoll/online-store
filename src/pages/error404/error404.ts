import Page from '../templates/page';

class ErrorPage extends Page {
    constructor(id: string) {
        super(id);
    }

    render(): HTMLElement {
        const html = `<div class="error404-wrapper wrapper">
                        <img class="error404__img" src="../../../assets/gif/error404.gif" alt="404"/>
                      </div>
        `;

        this.createHTML(html);
        return this.container;
    }
}

export default ErrorPage;
