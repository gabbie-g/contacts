function ContactsApp(){

    this.header = document.querySelector("header");
    this.search_field = document.querySelector(".search");
    this.search_button = document.querySelector(".fa-search");
    this.search_element = document.getElementById("search-element");
    this.close_button = document.querySelector(".close-search-field");

    this.reminders = document.getElementsByClassName("reminder");
    this.initials_buttons = document.getElementsByClassName("initials"); 
    this.delete_content_buttons = document.getElementsByClassName("fa-minus");
    this.content_elements = document.getElementsByClassName("content-element");
    this.content_containers = document.getElementsByClassName("content");
    this.close_reminders = document.getElementsByClassName("close-reminder");
    this.delete_buttons = document.getElementsByClassName("fa-trash");

    this.add_button = document.querySelector("#add-button");
    this.name = document.querySelector("#name");
    this.number = document.querySelector("#number");
    this.address = document.querySelector("#address");
    this.icon_user = document.querySelector(".fa-user");
    this.icon_phone = document.querySelector(".fa-phone");
    this.icon_home = document.querySelector(".fa-home");


    

    this.create_elements = (array)=>{
        for (let i = 0; i < array.length; i++) {
            this.gui.create_contact_element(array[i]);
            for (let j = 0; j < array[i].content.length; j++) {
                let content = this.gui.create_content_element(array[i].content[j], array[i]);
                array[i].el.children[1].children[1].append(content);
            }        
        }
        this.open_reminder();
        this.close_reminder();
        this.delete_contact();
    }

    this.open_reminder = ()=> {
        for (let i = 0; i < this.initials_buttons.length; i++) {
            this.initials_buttons[i].addEventListener("click", this._open_reminder);
        }
        this.delete_content();
    }
    this.close_reminder = ()=>{
        for (let i = 0; i < this.close_reminders.length; i++) {
            this.close_reminders[i].addEventListener("click", this._close_reminder);            
        }
    }
    this.delete_contact = ()=>{
        for (let i = 0; i < this.delete_buttons.length; i++) {
            this.delete_buttons[i].addEventListener("click", (event)=>{
                let id = event.target.id;
                for (let j = 0; j < this.contacts.items.length; j++) {
                    let contact = this.contacts.items[j];
                    if(contact.id == id){
                        this.contacts.delete_item(contact);
                        this.gui.remove_contact_element(contact);
                    }                    
                }
            })
        }
    }

    this.delete_content = ()=>{
        for (let i = 0; i < this.delete_content_buttons.length; i++) {
            this.delete_content_buttons[i].addEventListener("click", (event)=>{
                var id = event.target.dataset.id;
                console.log(id);
                for (let j = 0; j < this.content_elements.length; j++) {
                    if(this.content_elements[j].id == id){
                        var content_element = this.content_elements[j];
                        console.log(content_element);
                    }            
                }
                for (let j = 0; j < this.contacts.items.length; j++) {
                    if(content_element.dataset.id == this.contacts.items[j].id){
                        let contact = this.contacts.items[j];
                        console.log(contact);
                        for (let k = 0; k < contact.content.length; k++) {
                            if(contact.content[k].id == content_element.id){
                                contact.content.splice(k,1);
                                this.contacts.saveToLocalStorage();
                            }                            
                        }
                    }
                };
                content_element.remove();

            });            
        }

    }

    this._open_reminder = (event)=>{
        for (let i = 0; i < this.reminders.length; i++) {
            if(event.target.dataset.id == this.reminders[i].dataset.id){
                var reminder = this.reminders[i];
                reminder.classList.remove("hide");
            }
        }
        
        reminder.children[2].children[1].children[0].focus();

        for (let i = 0; i < this.content_containers.length; i++) {
            if(event.target.dataset.id == this.content_containers[i].dataset.id){
                this.content_containers[i].scrollTop = this.content_containers[i].scrollHeight - this.content_containers[i].clientHeight;
            }            
        }
    }


    this._close_reminder = (event)=>{
        for (let i = 0; i < this.reminders.length; i++) {
            if(event.target.dataset.id == this.reminders[i].dataset.id){
                var reminder = this.reminders[i];
                reminder.classList.add("hide");
            }            
        }

        for (let i = 0; i < this.contacts.items.length; i++) {
            if(this.contacts.items[i].id == reminder.dataset.id){
                let contact = this.contacts.items[i];
                let date = reminder.children[2].children[0].innerHTML;
                let text = reminder.children[2].children[1].children[0];
                if(text.value){
                    let content = new ContentItem(date, text.value);
                    this.contacts.items[i].content.push(content);
                    this.contacts.saveToLocalStorage();
                    reminder.children[1].append(this.gui.create_content_element(content, contact));                
                    text.value = "";    
                }

            }            
        }
    }

    this._click_search_button = ()=>{
        this.search_element.classList.remove("hide");
    }

    this._search = ()=>{
        let search_result = [];
        for (let i = 0; i < this.contacts.items.length; i++) {
            if(this.contacts.items[i].name.toLowerCase().includes(this.search_field.value.toLowerCase())){
                search_result.push(this.contacts.items[i]);
            }
        }
        for (let i = 0; i < this.contacts.items.length; i++) {
            this.gui.remove_contact_elements(this.contacts.items[i]);                
        };
        this.create_elements(search_result);

    }

    this._close_search_field = ()=>{
        this.search_element.classList.add("hide");
        this.search_field.value = "";
        for (let i = 0; i < this.contacts.items.length; i++) {
            this.gui.remove_contact_elements(this.contacts.items[i]);                
        };
        this.create_elements(this.contacts.items);
    }


    this._add_contact = ()=> {
        if(this.name.value && this.number.value && this.address.value){
            let contact = new ContactItem(this.name.value, this.number.value, this.address.value);
            this.contacts.add_item(contact);

            for (let i = 0; i < this.contacts.items.length; i++) {
                this.gui.remove_contact_elements(this.contacts.items[i]);                
            };
            this.create_elements(this.contacts.items);

            this.name.value = '';
            this.number.value = '';
            this.address.value = '';
            this.name.focus();
            this.icon_user.classList.remove("warning");
            this.icon_phone.classList.remove("warning");
            this.icon_home.classList.remove("warning");
        } else {
            if(this.name.value == '') this.icon_user.classList.add("warning");
            if(this.number.value == '') this.icon_phone.classList.add("warning");
            if(this.address.value == '') this.icon_home.classList.add("warning");
            this.name.focus();
        }
    }


    this.run = ()=>{

        this.contacts = new Contacts();
        this.gui      = new Gui();
    
        this.create_elements(this.contacts.items);

        this.header.onmouseover = ()=>{
            this.search_field.focus();
        }
        this.search_button.addEventListener("click", this._click_search_button);
        this.search_field.addEventListener("input", this._search);
        this.close_button.addEventListener("click", this._close_search_field);


        this.add_button.addEventListener("click", this._add_contact);
        document.addEventListener("keyup", (event)=>{
            if(event.key == "Enter" && this.name == document.activeElement){
                this.number.focus();
            } else if(event.key == "Enter" && this.number == document.activeElement){
                this.address.focus();
            }else if(event.key == "Enter" && this.address == document.activeElement){
                this.add_button.click();
            } 
        })
        
    }


}