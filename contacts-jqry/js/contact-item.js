function ContactItem(name, number, address){
    this.name    = name;
    this.number  = number;
    this.address = address;
    this.content = [];
    this.color   = `rgb(${Math.floor(Math.random()*128) + 128}, ${Math.floor(Math.random()*128) + 128}, ${Math.floor(Math.random()*256)})`;
    this.id      = Math.random().toString(36).substring(7);
    this.el      = "";
}

function ContentItem(date, text){
    this.date = date;
    this.text = text;
    this.id   = Math.random().toString(36).substring(7);
}

function Contacts(){

    this.items = [];

    this.add_item = function(contact){
        this.items.push(contact);
        this.items = this.items.sort((a, b)=>a.name.toLowerCase()>b.name.toLowerCase() ? 1 : -1);
        this.saveToLocalStorage();
    }

    this.delete_item = function(item){
        this.items.splice(this.items.indexOf(item), 1);
        this.saveToLocalStorage();
    }


    this.saveToLocalStorage = function(){
        localStorage.setItem("contacts-jq", JSON.stringify(this.items));
    }

    this.loadFromLocalStorage = ()=>{

        if(localStorage.getItem("contacts-jq") === null) {
            return [];
        }

        let json = JSON.parse(localStorage.getItem("contacts-jq"));
        return json;
    }

        this.items = this.loadFromLocalStorage();

}