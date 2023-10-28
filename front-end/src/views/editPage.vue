<template>
    <div class="go-back">
        <svg @click="$router.go(-1)" xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
        </svg>
    </div>
    <div class="header">
        <div class="header-title flex-column justify-content-center align-items-center ">
            <h3>Edit task</h3>
        </div>
    </div>
    <div class="edit-box justify-content-center border border-black border-5">
        <div class="edit-task gap-4 ">
            <label class=" d-flex mb-3 fs-3 fw-bold ">Change Task</label>
            <input v-model="editTask" class=" d-inline-block mb-3">
        </div> 
        <div class="edit-kat flex-column gap-4">
            <label class=" d-flex mb-3 fs-3 fw-bold ">Change Category</label>
            <input v-model="editKat" class="d-inline-block mb-3">
        </div>
        <div>
            <button @click="changeTask(this.dNum)">Change!</button>
        </div>
    </div>
</template>

<style scoped>
    .go-back {
        padding: 20px;
    }
    .header-title {
        padding: 20px 30px 50px 20px;
        display: flex;
    }
    .header-title h3 {
        font-size: 48px;
        font-weight: 500;
    }
    .edit-box {
        margin: 0 20%;
    }
    .edit-task {
        margin: 3%;
    }
    .edit-kat {
        margin: 3%;
    }
</style>

<script>
import { tdListAction } from '../assets/doTable';

export default {
    data() {
        return {
            tdListAction,
            dNum: parseInt(this.$route.params.doNum),
            editTask: "",
            editKat: "",
            sdhkah: 0
        }
    },
    methods: {
        getTask() {
            const task = this.tdListAction.tdListRill.find((task) => task.doNum === this.dNum);
            if (task) {
                this.editTask = task.tdo;
                this.editKat = task.kategori;
            }
        },
        changeTask(thisNum) {
            const chngTask = {
                doNum: parseInt(thisNum),
                tdo: this.editTask,
                kategori: this.editKat,
                sdh: this.sdhkah
            };
            tdListAction.changeToDo(chngTask);
            this.$router.push('/')

        }
    },
    mounted() {
        this.getTask();
    }
}
</script>