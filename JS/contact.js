//My Algonquin username is used as the key to store whatever contact information in LocalStorage//
const KEY = 'JUAR0008';

//NEXT, MY ARRAY. I STARTED WITH THE DEFAULT ONE LOCATED IN STARTER.JS, BUT THIS NEW ONE WILL BE MY EDITING PLACE. WHATEVER 'CONTACTS' HAS WILL REPLACE THE DEFAULT ONE//

let contacts = [];

const init = function () {
    //THIS FUNCTION CHECKS IF ANY KEY IS NOT BEING USED OR EXISTS IN LOCALSTORAGE BEFORE ANYTHING ELSE HAPPENS//
    if (!localStorage.getItem(KEY)) {
        //NOTHING EXISTS ON LOCALSTORAGE YET? THEN DO THIS://
        contacts = contactStarter;
        //LINE 12: THIS IS MAKING WHATEVER IS IN contacts TO BE VALID FOR contactStarter. I AM EQUALIZING CONTENTS AND REPLACING DEFAULT VALUES FOR contactStarter.//

        //    let str = JSON.stringify(contactStarter);
        //    localStorage.setItem(KEY, str);
        //LINES 15 AND 16 ARE WHAT I NEED TO PUT SOMETHING INTO LOCAL STORAGE. ANOTHER WAY TO WRITE IT IS TO ELIMINATE THE str VARIABLE AND DO THIS://
        localStorage.setItem(KEY, JSON.stringify(contactStarter)); //IF THERE IS SOMETHING ON LOCAL STORAGE, THEN YOU ARE GOING TO GET THOSE ITEMS AND TURN THE STRING VALUES BACK INTO OJBECTS, THEN YOU ARE REPLACING WHATEVER VALUES AND PUT THEM ON contacts//
    } else {
        contacts = JSON.parse(localStorage.getItem(KEY));
    }

    //NEXT, WE WILL CALL updatelist. THIS IS A FUNCTION THAT WILL DELETE ALL INSIDE THE UNORDERED LIST ON THE HTML AND REPLACE IT WITH NEW CONTACT INFORMATION.//

    updatelist();
    document.querySelector('.fab').addEventListener('click', showForm);
    //   THE FOLLOWING CLICK EVENT WILL WORK ONLY FOR ONE OF THE NAMES. WE NEED IT TO WORK FOR ALL THE NAMES AVAILABLE. document.querySelector('.contact').addEventListener('click', showForm);
    //LINE 28: 'FAB' IS THE FLOATING ACTION BAR, WHICH IS AN ANDROID TERM FOR THE ROUND BUTTON AT THE BOTTOM. NEXT, THE TWO LISTENERS FOR THE BUTTONS THAT WE CREATED ON THE HTML.//
    document.querySelector('#button-save').addEventListener('click', addContact);
    document.querySelector('#button-cancel').addEventListener('click', hideForm);
};

//WE WILL WORK addContact and hideForm IN FURTHER LINES BELOW//
//NEXT, WE WILL WORK WITH THE UNORDERED LIST AND THE CLASS 'contact'//

const updatelist = function () {
    let ul = document.querySelector('ul.contacts');
    ul.innerHTML = "";
    //LINE 38: THIS CLEARS WHAT'S INSIDE THE LIST//
    let df = new DocumentFragment();
    // LINE 40 CREATES A DOCUMENT FRAGMENT THAT WILL INCLUDE ALL THE LIST ITEMS INSIDE, ONCE WE HAVE THEM ALL//
    contacts.forEach((contact) => {

        df.appendChild(createItem(contact)); //createItem is worked further down//
    });
    ul.appendChild(df);
};
//LINES 42-45: WE ARE GOING THROUGH A LOOP THAT WILL PRESENT THE DATA OUTPUT AT ONCE, INSTEAD OF HAVING THE WEB TO RELOAD OR REWRITE EACH TIME THE JS READS THE LOOP. THIS IS TO MAXIMIZE COMPUTER OR MOBILE RESOURCES. THIS IS A SEPARATE CLASS PRACTICE PROGRAM//

const createItem = function (contact) {
    /****************** THIS FUNCTION WILL CREATE THE FOLLOWING HTML COMPONENTS:
     <li class="contact">
                <span class="delete" data-key ="the.princess@resistance.org"></span>
                <h3>Leia Organa</h3>
                <p class="email">the.princess@resistance.org</p>
                <p class="phone">613-842-0101</p>
            </li>
            
            *****************/
    let li = document.createElement('li');
    li.className = 'contact';
    let span = document.createElement('span');
    span.className = 'delete';
    span.setAttribute('data-key', contact.email); //Q. POSTED ON YT CHANNEL//
    span.addEventListener('click', removeContact); //removeContact FUNCTION, FURTHER DWN
    li.appendChild(span);

    let h3 = document.createElement('h3');
    h3.textContent = contact.fullname;
    h3.addEventListener('click', editCurrentName);
    li.appendChild(h3);

    let pe = document.createElement('p');
    pe.className = 'email';
    pe.textContent = contact.email;
    //    pe.addEventListener('click',editCurrentName);
    li.appendChild(pe);

    let pp = document.createElement('p');
    pp.className = 'phone';
    pp.textContent = contact.mobilephone;
    li.appendChild(pp);

    let cc = document.createElement('p');
    cc.className = 'city';
    cc.textContent = contact.city;
    li.appendChild(cc);

    return li;
};

const removeContact = function (ev) {
    //RETRIEVE THE data-key//
    //FIND THE MATCHING EMAIL ADDRESS IN GLOBAL CONTACTS//
    //REMOVE THAT OBJECT FROM THE CONTACTS ARRAY//
    //UPDATE THE localstorage WITH THE NEW CONTACTS ARRAY//
    ev.preventDefault();
    let email = ev.target.getAttribute('data-key');
    console.log(email);
    contacts = contacts.filter((contact) => {
        // THIS WILL CHECK AND REMOVE ANY ITEM THAT HAS A MATCHING EMAIL ADDRESS. INSIDE THE FILTER METHOD THERE IS A FUNCTION, contact, AND IF IT RETURNS 'TRUE' THE ITEM WILL BE KEPT; OTHERWISE IT WILL GET RIDDEN. AND THE NEW VERSION OF THE ARRAY WILL BE PUT BACK INTO contacts. IT COULD BE A NEW VARIABLE OR NEW ONES.//
        console.log(contact.email, email);
        return !(contact.email == email);

    });
    console.log(contacts);
    localStorage.setItem(KEY, JSON.stringify(contacts));
    //THIS SHOWS THE CHANGES AND WILL CREATE STRING FROM THE JSON DATA//
    updatelist();
};

const editCurrentName = function (ev) {
    ev.preventDefault();
    document.querySelector('main').style.opacity = '0';
    document.querySelector('.fab').style.opacity = '0';
    document.querySelector('.contactform').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
    let li = ev.currentTarget;
    let id = li.getAttribute('data-key');

    let fullname = ev.currentTarget.textContent;
//        let email = ev.currentTarget.textContent;
    //    let mobilephone = ev.currentTarget.textContent;
    //    
    console.log(fullname);
//        console.log(email);
    //    console.log(mobilephone);

    let selectedPerson = null;
//        let selectedEmail = null;
    //    let selectedMobile = null;

    contacts.forEach(person => {
        if (fullname == person.fullname){   // || (email == person.email) || (mobilephone == person.mobilephone)) 
            selectedPerson = person;
//                        selectedPerson = email;
            //            selectedMobile = mobilephone;
        }
    });
    if (fullname != null) {  //|| (email != null) || (mobilephone != null)
        let input = document.getElementById('input-fullname');
//        let inputwo = document.getElementById('input-emailaddress');
//        let inputhree = document.getElementById('input-mobilenumber');


        input.value = selectedPerson.fullname;
        //         inputhree.value = selectedMobile.mobilephone;
//                 inputwo.value = selectedPerson.email;


        input.setAttribute('text', selectedPerson.fullname);
//        inputwo.setAttribute('text', selectedPerson.email);
//        inputhree.setAttribute('text', selectedMobile.mobilephone);


        updatelist();
    } else {
        //such bad. no person
    }
};


//THE FOLLOWING IS HOW WE ADD NEW CONTACTS THROUGHT THE FILL-IN FORM//
const showForm = function (ev) {
    ev.preventDefault();
    document.querySelector('main').style.opacity = '0';
    document.querySelector('.fab').style.opacity = '0';
    document.querySelector('.contactform').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
};
//LINES 107, 108: THESE INSTRUCTIONS WILL HIDE THE PREVIOUS SCREEN FROM VIEW//
const hideForm = function (ev) {

    ev.preventDefault();
    document.querySelector('main').style.opacity = '1';
    document.querySelector('.fab').style.opacity = '1';
    //LINES 117, 118: THESE INSTRUCTIONS WILL SHOW THE PREVIOUS SCREEN FROM VIEW//
    document.querySelector('.contactform').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.contactform form').reset();

};

const addContact = function (ev) {
    //READ DATA FROM THE FORM, SAVE IT IN THE OBJECT, ADD OBJECT TO THE CONTACTS ARRAY
    //REPLACE THE localStorage WITH NEW CONTACTS ARRAY//

    ev.preventDefault;
    let obj = {}; //THIS WILL A NEW VARIABLE CONTAINING ALL THE NEW STUFF, EMAIL, NAME, AND PHONE NUMBER.
    let fullname = document.getElementById('input-fullname').value.trim();
    let email = document.getElementById('input-emailaddress').value.trim();
    let mobilephone = document.getElementById('input-mobilenumber').value.trim();
    let city = document.getElementById('input-currentcity').value.trim();

    //CHECK IF ANY TEXT BOX IS EMPTY://
    if (fullname && email && mobilephone && city) {
        obj = {
            fullname: fullname,
            email: email,
            mobilephone: mobilephone,
            city: city
        };
        //SHORT VERSION IS WITHOUT THE FIRST WORD//
        contacts.push(obj);
        localStorage.setItem(KEY, JSON.stringify(contacts));
        //NEXT, CLEAR THE FORM//
        document.querySelector('.contactform form').reset();
        hideForm(new MouseEvent('click')); //Q. POSTED ON YT CHANNEL.
        //CHANGES REFLECTED, BELOW/
        updatelist();
    } else {
        //ALERT MESSAGE//
        alert('Form has not been completed');
    }
};


//LINE 131: WE ARE GETTING THE VALUE OF EACH INPUT ELEMENT AND THEN TRIMMING BLANK SPACES//
//BELOW, ONCE THE SITE HAS LOADED, IT WILL CALL THE INIT FUNCTION WAY ABOVE.//

document.addEventListener('DOMContentLoaded', init);
