import Page from '../templates/page';

class DescriptionPage extends Page {
    static TextObject = {
        MainTitle: 'Description of the shoes',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const title = this.createTitle(DescriptionPage.TextObject.MainTitle);
        this.container.appendChild(title);
        return this.container;
    }
}

export default DescriptionPage;
