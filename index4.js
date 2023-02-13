document.getElementById("userForm").addEventListener("submit", addUser);
// initial array of users, reading from localStorage
const users = JSON.parse(localStorage.getItem("users")) || [];
//const users = JSON.parse(localStorage.getItem("users")) || [];
function addUser(e) {
  e.preventDefault();
  // get name, phone_no
  let name = document.getElementById("name").value;
  let phone_no = document.getElementById("phone").value;
  if (name.length > 0 && phone_no.length == 10) {
    const user = {
      name,
      phone_no,
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      //id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    };
    users.push(user);
    axios
      .post(
        "https://crudcrud.com/api/acde7f51dbf248f4876995e1a5c1f0ee/appointmentData",
        user
      )
      .then((response) => {
        console.log(response);
      });
    //users.push(user);
    //local storage
    //localStorage.setItem("users", JSON.stringify(users));
  } else {
    alert("Please check the details and try again");
  }
  document.getElementById("userForm").reset();
  showUsers();
}
const showUsers = () => {
  const userTable = document.getElementById("userTable");
  userTable.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
  axios
    .get(
      "https://crudcrud.com/api/acde7f51dbf248f4876995e1a5c1f0ee/appointmentData"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        userTable.innerHTML += `
            <tr>
                <td>${response.data[i].name}</td>
                <td>${response.data[i].phone_no}</td>
                <td><a class="editButton"onclick="editUser(${response.data[i].id})">Edit<br><a class="deleteButton" onclick="deleteUser(${response.data[i].id})">
                    Delete</td>
            </tr>
        `;
      }
    });
  /*for (let i = 0; i < users.length; i++) {
    userTable.innerHTML += `
            <tr>
                <td>${users[i].name}</td>
                <td>${users[i].phone_no}</td>
                <td><a class="editButton"onclick="editUser(${users[i].id})">Edit<br><a class="deleteButton" onclick="deleteUser(${users[i].id})">
                    Delete</td>
            </tr>
        `;
  }
  }*/
};
const editUser = (id) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      document.getElementById("name").value = users[i].name;
      document.getElementById("phone").value = users[i].phone_no;
  for (let i = 0; i < response.data.length; i++) {
    if (response.data[i].id == id) {
      document.getElementById("name").value = response.data[i].name;
      document.getElementById("phone").value = response.data[i].phone_no;
    }}}
  }
};
const deleteUser = (id) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
  for (let i = 0; i < response.data.length; i++) {
    if (response.data[i].id == id) {
      users.splice(i, 1);
    }}
    }
  }
  // localStorage
  localStorage.setItem("expenses", JSON.stringify(users));
  //localStorage.setItem("expenses", JSON.stringify(users));
  showUsers();
};
showUsers();
