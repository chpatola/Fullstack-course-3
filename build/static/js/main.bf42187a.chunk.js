(window["webpackJsonpexercise_2.3"]=window["webpackJsonpexercise_2.3"]||[]).push([[0],{15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(14),l=t.n(r),u=(t(5),t(2)),c=function(e){return o.a.createElement("form",{onSubmit:e.addNameNumber},o.a.createElement("div",null,"name ",o.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add person")))},i=function(e){var n=e.person,t=e.erasePersonId;return o.a.createElement("li",null,n.name+", ",n.number+" ",o.a.createElement("button",{onClick:function(){return t(n.id)}},"Delete"))},s=function(e){var n=e.persons,t=e.erasePersonId;return n.map(function(e){return o.a.createElement(i,{key:e.name,person:e,id:e.id,erasePersonId:t})})},m=t(3),d=t.n(m),f=function(){return d.a.get("/api/persons").then(function(e){return e.data})},g=function(e){return d.a.post("/api/persons",e).then(function(e){return e.data})},h=function(e){return d.a.delete("".concat("/api/persons","/").concat(e)).then(function(e){return e.data})},b=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{className:"info"},n)},p=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],l=Object(a.useState)(""),i=Object(u.a)(l,2),m=i[0],d=i[1],p=Object(a.useState)(""),v=Object(u.a)(p,2),w=v[0],E=v[1],N=Object(a.useState)(null),j=Object(u.a)(N,2),k=j[0],O=j[1];Object(a.useEffect)(function(){console.log("effect"),f().then(function(e){console.log("promise fulfilled"),r(e)})},[]);return console.log(t),o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(b,{message:k}),o.a.createElement("h3",null,"Add a new person"),o.a.createElement(c,{addNameNumber:function(e){e.preventDefault(),console.log("Clicked button",e.target);var n=function(){return t.map(function(e){return e.name})};console.log("Dessa f\xf6rnamn har vi innan l\xe4ggs till",n());var a=toString(m).trim();if(n().includes(m)||n().includes(a))window.alert(m+" is already inserted");else{var o={name:m,number:w};g(o).then(function(e){r(t.concat(e)),d(""),E(""),O("Person named '".concat(o.name,"' was added")),setTimeout(function(){O(null)},5e3)})}},newName:m,handleNameChange:function(e){console.log("new name to add "+e.target.value),d(e.target.value)},newNumber:w,handleNumberChange:function(e){console.log("new number to add "+e.target.value),E(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(s,{persons:t,erasePersonId:function(e){console.log("taking in id:s here "+e+" id");var n=t.find(function(n){return n.id===e}),a=t.filter(function(n){return n.id!==e});console.log("Persons to temain; "+a),window.confirm("Are you sure you want to erase "+n.name+" ?")&&h(e).then(console.log("We jus erased ".concat(n.name," with id ").concat(n.id)),r(a))}}),"...")};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},5:function(e,n,t){}},[[15,1,2]]]);
//# sourceMappingURL=main.bf42187a.chunk.js.map