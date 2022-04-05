function ContactsApp(){

    this.contacts = new Contacts();
    this.gui      = new Gui();

    this.header = $("header");
    this.search_field = $("#search");
    this.search_button = $("#fa-search");
    this.search_element = $("#search-element");
    this.close_button = $("#close-search-field");

    this.reminders = document.getElementsByClassName("reminder");
    this.initials_buttons = document.getElementsByClassName("initials"); 
    this.delete_content_buttons = document.getElementsByClassName("fa-minus");
    this.content_elements = document.getElementsByClassName("content-element");
    this.content_containers = document.getElementsByClassName("content");
    this.close_reminders = document.getElementsByClassName("close-reminder");
    this.delete_buttons = document.getElementsByClassName("fa-trash");

    this.add_button = $("#add-button");
    this.name = $("#name");
    this.number = $("#number");
    this.address = $("#address");
    this.icon_user = $(".fa-user");
    this.icon_phone = $(".fa-phone");
    this.icon_home = $(".fa-home");

    

    this.create_elements = (array)=>{
        let gui = this.gui;

        $(array).each(function(){
            gui.create_contact_element(this);
            let contact = this;
            $(contact.content).each(function(){
                let content = gui.create_content_element(this, contact);
                $(contact.el).find(".content").append(content);
            })
        })

        this.open_reminder();
        this.close_reminder();
        this.delete_contact();
    }

    this.open_reminder = ()=> {
        let app = this;
        $(this.initials_buttons).each(function(){
            $(this).click(app._open_reminder);
        })
        this.delete_content();
    }
    this.close_reminder = ()=>{
        let app = this;
        $(this.close_reminders).each(function(){
            // this.app = app;
            $(this).on("click", app._close_reminder);
        })
    }
    this.delete_contact = ()=>{
        let app = this;
        // let contacts = this.contacts;
        // let gui = this.gui;
        $(this.delete_buttons).each(function(){
            $(this).click(function(event){
                let id = event.target.id;
                $(app.contacts.items).each(function(){
                    if(this.id == id){
                        app.contacts.delete_item(this);
                        app.gui.remove_contact_element(this);
                    }
                })
            })
        })
    }

    this.delete_content = ()=>{
        let contacts = this.contacts;
        let content_elements = this.content_elements;

        $(this.delete_content_buttons).each(function(){
            $(this).click(function(event){
                let id = event.target.dataset.id;
                let content_element;
                $(content_elements).each(function(){
                    if(this.id == id){
                        content_element = this;
                        this.remove();
                    }
                });
                $(contacts.items).each(function(){
                    if(this.id == content_element.dataset.id){
                        let content = this.content;
                        $(content).each(function(){
                            if(this.id == id){
                                content.splice(content.indexOf(this), 1);
                                contacts.saveToLocalStorage();
                            }
                        })
                    }
                });
            })
        })
    }


    this._open_reminder = (event)=>{

        $(this.reminders).each(function(){
            if(event.target.dataset.id == this.dataset.id){
                $(this).slideDown("slow");
                $(this).find("textarea").focus();
            }
        });

        $(this.content_containers).each(function(){
            if(event.target.dataset.id == this.dataset.id){
                this.scrollTop = this.scrollHeight - this.clientHeight;
            }
        })

    }


    this._close_reminder = (event)=>{
        let app = this;
        let reminder;
        $(this.reminders).each(function(){
            if(event.target.dataset.id == this.dataset.id){
                reminder = this;
                $(this).slideUp("slow");
            }
        });

        $(this.contacts.items).each(function(){
            if(this.id == reminder.dataset.id){
                let date = $(reminder).find("div.new-date");
                let text = $(reminder).find("textarea");
                if(text.val() != ''){
                    let content = new ContentItem(date.html(), text.val());
                    this.content.push(content);
                    app.contacts.saveToLocalStorage();
                    reminder.children[1].append(app.gui.create_content_element(content, this));                
                    text.val("");    
                }
            }
        })
    }

    this._click_search_button = ()=>{
        this.search_element.removeClass("hide");
        this.search_field.val("");
    }

    this._search = ()=>{
        let search_result = [];
        let app = this;

        $(this.contacts.items).each(function(){
            // this.app = app;
            if(this.name.toLowerCase().includes(app.search_field.val().toLowerCase())){
                search_result.push(this);
            }
        });
        $(this.contacts.items).each(function(){
            // this.app = app;
            app.gui.remove_contact_elements(this);
        })

        this.create_elements(search_result);

    }

    this._close_search_field = ()=>{
        this.search_element.addClass("hide");
        let app = this;

        $(this.contacts.items).each(function(){
            app.gui.remove_contact_elements(this);
        });

        this.create_elements(this.contacts.items);
    }


    this._add_contact = ()=> {
        if(this.name.val() != '' && this.number.val() != '' && this.address.val() != ''){
            let contact = new ContactItem(this.name.val(), this.number.val(), this.address.val());
            this.contacts.add_item(contact);

            let gui = this.gui;
            $(this.contacts.items).each(function(){
                gui.remove_contact_elements(this);
            })
    
            this.create_elements(this.contacts.items);

            this.name.val("");
            this.number.val("");
            this.address.val("");
            this.name.focus();
            this.icon_user.removeClass("warning");
            this.icon_phone.removeClass("warning");
            this.icon_home.removeClass("warning");
        } else {
            if(this.name.val() == '') this.icon_user.addClass("warning");
            if(this.number.val() == '') this.icon_phone.addClass("warning");
            if(this.address.val() == '') this.icon_home.addClass("warning");
            this.name.focus();
        }
    }


    this.run = ()=>{
    
        this.create_elements(this.contacts.items);

        this.header.mouseover(()=>{this.search_field[0].focus()});
        this.search_button.click(this._click_search_button);
        this.search_field.on("input",this._search);
        this.close_button.click(this._close_search_field);


        this.add_button.on("click", this._add_contact);
        $(document).keyup((event)=>{
            if(event.key == "Enter" && this.name[0] == document.activeElement){
                this.number.focus();
            } else if(event.key == "Enter" && this.number[0] == document.activeElement){
                this.address.focus();
            }else if(event.key == "Enter" && this.address[0] == document.activeElement){
                this.add_button.click();
            } 
        })
        
    }


}