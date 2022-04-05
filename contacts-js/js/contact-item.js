function ContactItem(name, number, address){
    this.name    = name;
    this.number  = number;
    this.address = address;
    this.content = [];
    this.color   = `rgb(${Math.floor(Math.random()*128) + 128}, ${Math.floor(Math.random()*128) + 128}, ${Math.floor(Math.random()*256)})`;
    // this.id      = Math.floor(Math.random()*8990) + 1000; 
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
        this.items = this.items.sort((a, b)=>{if(a.name.toLowerCase()>b.name.toLowerCase())return 1; if(a.name.toLowerCase()<b.name.toLowerCase()) return -1; return 0});
        this.saveToLocalStorage();
    }

    this.delete_item = function(item){
        this.items.splice(this.items.indexOf(item), 1);
        this.saveToLocalStorage();
    }


    this.saveToLocalStorage = function(){
        localStorage.setItem("contacts", JSON.stringify(this.items));
    }

    this.loadFromLocalStorage = ()=>{

        if(localStorage.getItem("contacts") === null) {
            return [];
        }

        let json = JSON.parse(localStorage.getItem("contacts"));
        return json;
    }

        this.items = this.loadFromLocalStorage();

}