import Page from '../templates/page';
import { createCartItemFromMain, IPrototypeItem } from '../templates/items';
//import ItemCart from '../components/itemCart/itemCart';
import shoes from '../../db/shoes';

//let itemsAddCartButton: NodeList;
//let arrCart: ItemCart[];

class MainPage extends Page {
    /*static TextObject = {
        MainTitle: 'Choose your perfect shoes for 2023!',
    };*/

    constructor(id: string) {
        super(id);
    }

    private createListItem(array: IPrototypeItem[]): void {
        array.forEach((el) => {
            this.container.appendChild(createCartItemFromMain(el));
        });
    }

    render() {
        /*const title = this.createHTML(MainPage.TextObject.MainTitle);
        this.container.appendChild(title);*/
        //this.createHTML(MainPage.TextObject.MainTitle);
        this.createListItem(shoes);
        return this.container;
    }
}

export default MainPage;
