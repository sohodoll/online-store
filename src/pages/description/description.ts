import { IPrototypeItem } from '../templates/items';
import Page from '../templates/page';

class DescriptionPage extends Page {
    /*static TextObject = {
        MainTitle: 'Description of the shoes',
    };*/
    private item: IPrototypeItem;

    constructor(id: string, item: IPrototypeItem) {
        super(id);
        this.item = item;
    }

    render() {
        /*const title = this.createHTML(DescriptionPage.TextObject.MainTitle);
        this.container.appendChild(title);*/
        this.createHTML(`<h1>${this.item.name}<h1/>`);
        return this.container;
    }
}

export default DescriptionPage;
