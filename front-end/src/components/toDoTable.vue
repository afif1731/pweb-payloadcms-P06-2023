<template>
    <body>
        <div class="createBtn">
            <button id="createButton" @click="modalTgl"><p>Create</p></button>
        </div>
        <Modal @close-modal="modalTgl" :modalKah="modalKah">
            <createTask @close-modal="modalTgl" />
         </Modal>
        <div class="todo">
        <table class="doTable">
            <thead>
                <tr>
                    <th>No</th>
                    <th>To-Do List</th>
                    <th>Category</th>
                    <th>Checklist</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-for="(task, index) in doit.tdlist.filter((task) => task.status_td == 0 && task.nama_user.id == doit.userData.id)">
                <tr>
                    <th>{{ index+1 }}</th>
                    <th>{{ task.nama_td }}</th>
                    <th>{{ task.kategori.nama_kat }}</th>
                    <th class="checklist-box"><svg v-if="task.status_td == 0" @click="doit.setFinished(task.id)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">
                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                                </svg></th>
                    <th>
                        <div class="actionBtn" @click="doit.setChange(task.id)">
                            <router-link :to="{name: 'edit', params: {id : task.id}}">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 512 512"
                                    class="cursor-pointer">
                                    <path
                                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                                </svg>
                            </router-link>
                            <svg 
                                @click="doit.delTD(task.id)"
                                xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 448 512"
                                class="cursor-pointer">
                                <path
                                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
        </div>
        <div>

        </div>
        <div class="todone">
        <table class="doneTable">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Done List</th>
                    <th>Category</th>
                    <th>Checklist</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-for="(taskdone, index) in doit.tdlist.filter((taskdone) => taskdone.status_td == 1 && taskdone.nama_user.id == doit.userData.id)">
                <tr>
                    <th>{{ index+1 }}</th>
                    <th>{{ taskdone.nama_td }}</th>
                    <th>{{ taskdone.kategori.nama_kat }}</th>
                    <th class="checklist-box"><svg v-if="taskdone.status_td==1" @click="doit.setUnFinished(taskdone.id)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                                                </svg></th>
                    <th>
                        <div class="actionBtn">
                            <svg 
                                @click="doit.delTD(taskdone.id)"
                                xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 448 512"
                                class="cursor-pointer">
                                <path
                                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
        </div>
    </body>
    <footer>
    <div class="footer-content">
      <div class="footer-social">
        <h1>Quick Links</h1>
        <ul class="footer-social-image">
          <li>
            <a href="https://www.gmail.com">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
</svg>
            </a>
          </li>

          <li>
            <a href="https://www.instagram.com">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
</svg> </a>
          </li>

          <li>
            <a href="https://www.linkedin.com">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
</svg> </a>
          </li>

          <li>
            <a href="https://www.youtube.com">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
</svg>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      & copy; 2023 Website kita. All Rights Reserved.
    </div>
</footer>
</template>

<style scoped>
/* Reset default margin and padding for the entire page */
*{
    margin: 0;
    padding: 0;
    background-color: white;
    font-family: 'Righteous', cursive;
}

h1, h2, h3, p, ul, li {
    margin: 0;
    padding: 0;
}

body {
    margin: 0 5%;
    padding: 0;
}


/* Style for Create button */
.createBtn {
    display: block;
}

#createButton {
    float: right;
    border: none;
    margin: 20px 0;
}

#createButton p {
    color: #fff;
    background-color: #485664;
    border: none;
    border-radius: 5px;
    padding: 3px 10px;
    font-weight: bold;
    font-size: 35px;
}

.todo {
    min-height: 500px;
}
.todone {
    margin: 3em 0 5em;
}

table {
    width: 100%;
    margin: 20px auto 0;
    border: 1px solid black;
    border-collapse: collapse;
}

thead {
    border: 1px solid black;
    align-items: center;
}

thead th {
    position: static;
    background-color: #dbdbdb;
    font-size: 20px;
    font-weight: 600;
}

th {
    color: rgb(20, 19, 19);
    text-align: center;
    padding: 10px;  
}

tbody th {
    background-color: whitesmoke;
    font-size: 18px;
    font-weight: lighter;
}

.doneTable tbody th{
    color: rgba(0, 0, 0, 30%);
    text-decoration: line-through;
    text-decoration-thickness: 2px;
}

.checklist-box{
    text-align: center;
}
.checklist-box input{
    width: 25px;
    height: 25px;
}
.actionBtn {
    background-color: rgba(0, 0, 0, 0);
}
.actionBtn a{
    background-color: rgba(0, 0, 0, 0);
}
.actionBtn svg {
    background-color: rgba(0, 0, 0, 0);
    padding: 0 10%;
}
footer {
   display: block;
    background-color: #333;
    color: #000000;
    padding: 20px;
    text-align: center;
}
.footer-content {
    max-width: 800px;
    margin: 0 auto;
}
.footer-social {
    text-align: center;
    padding: 20px; /* Add padding for spacing */
    background-color: #333;
}
.footer-social h1 {
    font-size: 20px;
    margin-bottom: 20px;
    background-color: #333;
    color: white;
}
.footer-social ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center; /* Center list items */
    background-color: #333;
}
.footer-social li {
    background-color: #333;
    margin: 0 10px; /* Add space between list items */
}
.footer-social a {
    text-decoration: none;
    color: #ffffff;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    background-color: #333;
}
.footer-social svg {
    margin-bottom: 5px;
    color: white;
    background-color: #333;
}
.footer-bottom {
    margin-top: 20px;
    padding-top: 10px;
    text-decoration: none;
    color: rgb(255, 255, 255);
    background-color: #333;
}

</style>

<script>
import { doit } from '../assets/ploadDo'
import Modal from '../components/modal.vue'
import createTask from '../components/createTask.vue'

export default {
    components: {
        Modal,
        createTask,
    },
    data() {
        return {
            modalKah: false,
            doit
        }
    },
    methods: {
        modalTgl() {
            this.modalKah = !this.modalKah;
        },
        async setkuki() {
            await doit.createKuki()
        }
    },
    beforeMount() {
        this.setkuki()
    }
}
</script>