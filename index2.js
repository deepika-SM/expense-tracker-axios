document.getElementById("userForm").addEventListener("submit", addUser);
// initial array of users, reading from localStorage
const users = JSON.parse(localStorage.getItem("users")) || [];

function addUser(e) {
  e.preventDefault();
  //get name, phone_no
  let name = document.getElementById("name").value;
  let phone_no = document.getElementById("phone").value;

  if (name.length > 0 && phone_no.length == 10) {
    const user = {
      name,
      phone_no,
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    };

    users.push(user);
    axios.post("https://crudcrud.com/api/d07a0d6b5fcc4b1a8f8677dd00a52a6e/appoinmentData", user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  
    // local storage
    // localStorage.setItem("users", JSON.stringify(users));
  } else {
    alert("Please check the details and try again");
  }
  
  document.getElementById("userForm").reset();
  showUsers();
}

document.addEventListener("DOMContentLoaded", () => {
  axios.get("https://crudcrud.com/api/d07a0d6b5fcc4b1a8f8677dd00a52a6e/appoinmentData")
    .then((response) => {
      console.log(response)
      for(var i=0; i< response.data.length; i++){
        showNewUsersOnscreen(response.data[i])
       }
     // users.push(...appointments);
      //localStorage.setItem("users", JSON.stringify(users));
     // showUsers();

    })
    .catch((error) => {
      console.log(error)
    });
});

const showUsers = () => {
  const userTable = document.getElementById("userTable");
  userTable.innerHTML = "";
  
  for (let i = 0; i < users.length; i++) {
    userTable.innerHTML += `
            <tr>
                <td>${users[i].name}</td>
                <td>${users[i].phone_no}</td>
                <td><a class="editButton" onclick="editUser(${users[i].id})">Edit</a><br><a class="deleteButton" onclick="deleteUser(${users[i].id})">Delete</a></td>
            </tr>
        `;
  }
};

const editUser = (id) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      document.getElementById("name").value = users[i].name;
      document.getElementById("phone").value = users[i].phone_no;
    }
  }
};

const deleteUser = (id) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users.splice(i, 1);
    }}}

    


