/**
 * Created by RKA on 5/11/2017.
 */

var contacts = [
    {
        "id": 1,
        "name": "Mark Smith",
        "phone": 380952122015
    },
    {
        "id": 2,
        "name": "John Smith",
        "phone": 380952122015
    },
    {
        "id": 3,
        "name": "Adam Smith",
        "phone": 380951652015
    },
    {
        "id": 7,
        "name": "Bred Smith",
        "phone": 380952869015
    }
];

var update_customer_id;

function loadContacts() {
    localStorage.getItem("contacts") === null ? updateContacts() : contacts = JSON.parse(localStorage.getItem("contacts"));
}

function updateContacts() {
    alert("updateContacts");
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function deleteContact(item_to_delete) {

    for (var i in contacts) {
        if(contacts[i].id.toString() === item_to_delete.toString()) {
            // alert(contacts[i].id);
            contacts.remove(i, i++);
            break;
        }

    }
    updateContacts();
}

function addCustomer(customer_name, customer_phone) {
    contacts[contacts.length] = {
        "id": contacts[contacts.length-1].id + 1,
        "name": customer_name,
        "phone": customer_phone
    };
    updateContacts();
}

function editCustomer(customer_id, customer_name, customer_phone) {
    for(var i in contacts){
        if(contacts[i].id.toString() === customer_id){
            contacts[i].name = customer_name;
            contacts[i].phone = customer_phone;
            break;
        }
    }
    updateContacts();
}

function tableHtml(){
    var table = "";
    table += "<table id='mytable' border='1'><tbody><tr><td>ID</td><td>Name</td><td>Phone</td><td>Action</td></tr>";

    for(var i = 0; contacts.length > i; i++){
        table += ("<tr id = " + contacts[i].id + "> " +
            "<td class='id'>" + contacts[i].id +"</td> " +
            "<td class='name'>" + contacts[i].name + "</td> " +
            "<td class='phone'>" + contacts[i].phone + "</td>" +
            "<td><a class = 'edit'>Edit </a><a class = 'delete' style=' '>Remove</a></td>" +
            "</tr>");
    }

    table += "</tbody></table>";
    return table;
}

function createFragment(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

function appendTo(elementId, htmlStr){
    document.getElementById(elementId).appendChild(createFragment(htmlStr));
}

function replaceElementByID(elementId, htmlStr){
    document.getElementById(elementId).innerHTML = htmlStr;
}

function addTable() {
    appendTo("table_place", tableHtml())
}

function reloadTable() {
    replaceElementByID("table_place", tableHtml())
}

function removeAncestor(item) {
    var tr = $(item).parent().parent();
    var item_to_delete = $(tr).attr('id');
    tr.remove();
    deleteContact(item_to_delete);
}

function formSubmit() {
    var customer_name = $('#customer_name').val().toString();
    var customer_phone =  document.getElementById('customer_phone').value;
    $("#submit").attr("value").toString() === "Update" ?
        editCustomer(update_customer_id, customer_name, customer_phone)
        : addCustomer(customer_name,customer_phone);
}

function activateUpdating(item) {
    update_customer_id = $(item).parent().parent().attr('id');
    $('tr#'+update_customer_id).find('a.delete').attr('style', "pointer-events: none; display: inline-block; color: #ffffff;"); // disable removing
    $("#submit").attr("value", "Update");
    $("#customer_name").val($('tr#'+update_customer_id).find('td.name').html());
    $("#customer_phone").val($('tr#'+update_customer_id).find('td.phone').html());
}

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};