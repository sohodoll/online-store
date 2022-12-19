import Page from '../templates/page';

class MainPage extends Page {
    static TextObject = {
        MainTitle: 'Choose your perfect shoes for 2023!',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const title = this.createTitle(MainPage.TextObject.MainTitle);
        this.container.appendChild(title);
        return this.container;
    }
}

export default MainPage;
