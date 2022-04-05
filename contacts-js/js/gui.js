function Gui(){

    this.app_body = document.querySelector("#body");


    this.create_contact_element = function(contact){

        contact.el = document.createElement("div");
        contact.el.setAttribute("id", contact.id);
        contact.el.classList.add("element-body");
        contact.el.classList.add("d-flex");
        contact.el.classList.add("flex-column");

        contact.el.innerHTML = `
        <div class="d-flex my-3">
            <div class="d-flex">
                <div class="initials initial d-flex" style="background-color: ${contact.color}" data-id=${contact.id}>
                    <span class="initials"  data-id=${contact.id}>${contact.name.split(" ").map(word=>word.charAt(0).toUpperCase()).join("")}</span>
                </div>
            </div>
            <div class="flex-grow-1 d-flex flex-column mx-2">
                <div class="element">${contact.name.split(" ").map(word=>word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</div>
                <div class="element">${contact.address.split(" ").map(word=>word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</div>
                <div class="element">${contact.number}</div>
            </div>
            <div class="d-flex">
                <i class="fa fa-trash" aria-hidden="true" id="${contact.id}"></i>
            </div>
        </div>
        <div class="reminder hide"  data-id=${contact.id}>
            <div class="d-flex justify-content-between col-12 pb-2">
                <span>REMINDER</span>
                <i class="fa fa-times close-reminder d-flex" aria-hidden="true"  data-id=${contact.id}></i>
            </div>

            <div class="d-flex flex-column content" data-id=${contact.id}>
            
            </div>
            
            <div class="d-flex py-2">
                <div class="col-4 col-sm-3 px-0">${(new Date()).toLocaleString("ro-Ro",{ year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
                <div class="col-8 col-sm-9 px-0">
                    <textarea class="form-control"></textarea>
                </div>
            </div>
        </div>
        `;
        this.app_body.appendChild(contact.el);

        // return contact.el;
    }

    this.remove_contact_elements = function(){
        for (let i = 0; i < this.app_body.children.length; i++) {
            this.app_body.children[i].remove();
        }
    }

    this.remove_contact_element = function(contact){
        for (let i = 0; i < this.app_body.children.length; i++) {
            if(this.app_body.children[i].id == contact.id)
            this.app_body.children[i].remove();
        }
    }

    this.create_content_element = (content,contact)=>{
        let el = document.createElement("div");
        el.classList.add("d-flex");
        el.classList.add("content-element");
        el.setAttribute("data-id", contact.id);
        el.setAttribute("id", content.id);
        el.innerHTML = `
            <div class="col-4 col-sm-3 mx-0 date">${content.date}</div>
            <div class="col-7 col-sm-8 mx-0 text">${content.text}</div>
            <div class="col-1 mx-0 text-end" ><i class="fa fa-minus" aria-hidden="true" data-id=${content.id}></i></div>
        `;

        return el;
    }
}