class Promocode {
    private id: number;
    name: string;
    private value: number;
    private used: boolean;
    constructor(id: number, name: string, value: number) {
        this.id = id + 1;
        this.name = name;
        this.value = value;
        this.used = false;
    }

    getID(): number {
        return this.id;
    }

    setValue(value: number) {
        this.value = value;
    }

    getValue(): number {
        return this.value;
    }

    setUsed() {
        this.used = true;
    }

    setNotUsed() {
        this.used = false;
    }

    getUsed(): boolean {
        return this.used;
    }
}

export default Promocode;