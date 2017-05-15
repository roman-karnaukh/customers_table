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
var is_edit_mode = false;
function isEditMode() { return is_edit_mode; }
function setEditModeTrue() { is_edit_mode = true; }
function setEditModeFalse() { is_edit_mode = true; }

function loadContacts() {
    localStorage.getItem("contacts") === null ? updateLocalContacts() : contacts = JSON.parse(localStorage.getItem("contacts"));
}

function updateLocalContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function deleteContact(id_to_delete) {
    for (var i in contacts) {
        if(contacts[i].id == id_to_delete) {
            i == 0 ? contacts.shift() : contacts.splice(i, i++);
            break;
        }
    }
    updateLocalContacts();
}

function addCustomer(customer_name, customer_phone) {
    contacts.push({
        "id": contacts[contacts.length-1].id + 1,
        "name": customer_name,
        "phone": customer_phone
    });
    updateLocalContacts();
}

function editCustomer(customer_id, customer_name, customer_phone) {
    setEditModeFalse();
    for(var i in contacts){
        if(contacts[i].id.toString() === customer_id){
            contacts[i].name = customer_name;
            contacts[i].phone = customer_phone;
            break;
        }
    }
    updateLocalContacts();
}

function tableHtml(){
    var table = "";
    table += "<table id='mytable' class='table table-striped table-bordered'><tr><thead><td>ID</td><td>Name</td><td>Phone</td><td>Action</td></tr></thead><tbody>";

    for(var i = 0; contacts.length > i; i++){
        table += ("<tr id = " + contacts[i].id + "> " +
            "<td class='id'>" + contacts[i].id +"</td> " +
            "<td class='name'>" + contacts[i].name + "</td> " +
            "<td class='phone'>" + contacts[i].phone + "</td>" +
            "<td><button style='margin-right: 10px' class='button_edit btn btn-info btn-sm'>Edit </button><button class = 'delete btn btn-danger btn-sm' >Remove</button></td>" +
            "</tr>");
    }

    table += "</tbody></table>";
    return table;
}

function removeAncestor(item) {
    var tr = $(item).parent().parent();
    var id_to_delete = $(tr).attr('id');
    tr.remove();
    deleteContact(id_to_delete);
}

function formSubmit() {
    var customer_name = $('#customer_name').val().toString();
    var customer_phone =  $('#customer_phone').val().toString();
    isEditMode() ?
        editCustomer(update_customer_id, customer_name, customer_phone)
        : addCustomer(customer_name,customer_phone);
}

function activateUpdating(item) {
    update_customer_id = $(item).parent().parent().attr('id');
    $('tr#'+update_customer_id).find('button.delete').attr('disabled', 'disabled'); // disable removing
    $("#submit").attr("value", "Update");
    $("#customer_name").val($('tr#'+update_customer_id).find('td.name').html());
    $("#customer_phone").val($('tr#'+update_customer_id).find('td.phone').html());
    setEditModeTrue();
}