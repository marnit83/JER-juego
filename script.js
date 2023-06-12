// var usuario;
// var ip='http://localhost:8080'
// //Load items from server
// function loadItems(callback) {
//     $.ajax({
//         url: ip+'/items'
//     }).done(function (items) {
//         console.log('Items loaded: ' + JSON.stringify(items));
//         callback(items);
//     })
// }

// //Create item in server
// function createItem(item, callback) {
//     $.ajax({
//         method: "POST",
//         url: ip+'/items',
//         data: JSON.stringify(item),
//         processData: false,
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }).done(function (item) {
//         console.log("Item created: " + JSON.stringify(item));
//         callback(item);
//     })
// }

// function createUserItem(item, callback) {
//     item.description = "Usuario"
//     $.ajax({
//         method: "POST",
//         url: ip+'/items/user',
//         data: JSON.stringify(item),
//         processData: false,
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }).done(function (item) {
//         console.log("Item created: " + JSON.stringify(item));
//         callback(item);
//     })
// }

// // //Update item in server
// // function updateItem(item) {
// //     $.ajax({
// //         method: 'PUT',
// //         url: 'http://localhost:8080/items/' + item.id,
// //         data: JSON.stringify(item),
// //         processData: false,
// //         headers: {
// //             "Content-Type": "application/json"
// //         }
// //     }).done(function (item) {
// //         console.log("Updated item: " + JSON.stringify(item))
// //     })
// // }

// // //Delete item from server
// // function deleteItem(itemId) {
// //     $.ajax({
// //         method: 'DELETE',
// //         url: 'http://localhost:8080/items/' + itemId
// //     }).done(function (item) {
// //         console.log("Deleted item " + itemId)
// //     })
// // }

// //Show item in page
// function showItem(item) {

//     // var checked = '';
//     // var style = '';

//     // if (item.checked) {
//     //     checked = 'checked';
//     //     style = 'style="text-decoration:line-through"';
//     // }
    
//     $('#info').append(
//         '<div id="item-"><span >' + item.description +
//         '</span></div>')
// }

// function addUser(){
//     $.ajax({
//         url: ip+'/items/users'
//     }).done(function (users) {
//         console.log('User loaded: ' + JSON.stringify(users));
//         usuario=users;
//         createUserItem(users, function (itemWithId) {
//             //When item with id is returned from server
//             showItem(itemWithId);
//         });
//         console.log(usuario)
//     })
// }

// function closingCode(usuario){
//     $.ajax({
//         method: 'DELETE',
//         url: ip+'/items/users',
//         data: JSON.stringify(usuario),
//         processData: false,
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }).done(function (item) {
//         console.log("Deleted User " + JSON.stringify(usuario))
//     })
// }

// $(document).ready(function () {

//     addUser();
    
//     loadItems(function (items) {
//         //When items are loaded from server
//         $('#info').empty()
//         for (var i = 0; i < items.length; i++) {
//             showItem(items[i]);
//         }
//     });

//     var input = $('#value-input')
//     var info = $('#info')

//     // //Handle delete buttons
//     // info.click(function (event) {
//     //     var elem = $(event.target);
//     //     if (elem.is('button')) {
//     //         var itemDiv = elem.parent();
//     //         var itemId = itemDiv.attr('id').split('-')[1];
//     //         itemDiv.remove()
//     //         deleteItem(itemId);
//     //     }
//     // })

//     //Handle items checkboxs
//     info.change(function (event) {

//         //Get page elements for item
//         var checkbox = $(event.target);
//         var itemDiv = checkbox.parent();
//         var textSpan = itemDiv.find('span');

//         //Read item info from elements
//         var itemDescription = textSpan.text();
//         var itemChecked = checkbox.prop('checked');
//         var itemId = itemDiv.attr('id').split('-')[1];

//         //Create updated item
//         var updatedItem = {
//             id: itemId,
//             description: itemDescription,
//             checked: itemChecked
//         }

//         //Update item in server
//         updateItem(updatedItem);

//         //Update page when checked
//         var style = itemChecked ? 'line-through' : 'none';
//         textSpan.css('text-decoration', style);

//     })

//     //Handle add button
//     $("#add-button").click(function () {

//         var value = input.val();
//         input.val('');

//         var item = {
//             description: value,
//             checked: false
//         }

//         createItem(item, function (itemWithId) {
//             //When item with id is returned from server
//             showItem(itemWithId);
//         });
//     })

//     $("#disc-button").click(function () {

//         var value = input.val();
//         input.val('');

//         var item = {
//             description: value,
//             checked: false
//         }

//         closingCode(usuario);
//         $("#value-input").remove();
//         $("#disc-button").remove();
//         $("#add-button").remove();
//     })

    
//         setInterval(()=>{loadItems(function (items) {
//             //When items are loaded from server
//             $('#info').empty()
//             for (var i = 0; i < items.length; i++) {
//                 showItem(items[i]);
//             }})},10000);
        
// })

// var player = undefined;
// var color =  "black";

// function changeDisplay() {

//     // Rellenamos lon la interfaz de chat
//     let msgAction = $("#messageAction");
//     msgAction.empty();
//     msgAction.append('<input name"usermsg" type="text" id="usermsg" size="63"/>');
//     msgAction.append('<input name"submitmsg" type="button" id="submitmsg" value="Send"/>');
    
//     $('#submitmsg').click( function () {
//         let plainText = $("#usermsg").val();
//         var now = new Date();
//         now = "> " + now.toLocaleString();
//         var pickedColor = color;

//         var msg = {
//             date: now,
//             text: plainText,
//             user: player,
//             color: pickedColor,
//         }

//         if(plainText != ''){
//             TT_WebSocket.prototype.sendMessage(msg, "chat");
//             TT_WebSocket.prototype.proChatMessage(msg);
//         }

//         //Borramos el field text
//         $("#usermsg").val('');
//     });
// }

// $("#setName").click( function () {
//     //Cogemos el color del mensaje
//     color = $('select option').filter(':selected').val();

//     let nick = $("#nick");
//     let aux = nick.val();
//     player = aux;
//     nick.val("");

//     TT_WebSocket.prototype.sendMessage(aux, "id");

//     $("#userdata").empty();
//     $("#userdata").append("<h2>" + player + "</h2>");

//     changeDisplay();

//     //sendPlayer(aux, pingServer);
// });