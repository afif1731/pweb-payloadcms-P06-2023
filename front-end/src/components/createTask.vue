<template>
    <div class="nwForm">
    <div class="header">
        <div class="header-title flex-column justify-content-center align-items-center ">
            <h3>Add task</h3>
        </div>
    </div>
    <div class="new-box justify-content-center border border-black border-5">
        <div class="new-task gap-4 ">
            <label class=" d-flex mb-3 fs-3 fw-bold ">New Task</label>
            <input v-model="newTask" class=" d-inline-block mb-3">
        </div>
        <div class="new-kat flex-column gap-4">
            <label class=" d-flex mb-3 fs-3 fw-bold ">New Category</label>
            <input v-model="newKat" class="d-inline-block mb-3">
        </div>
        <div class="btn-dip">
            <button @click="pushNewtask()" class="addBtn">Add!</button>
        </div>
    </div>
    </div>
</template>

<style scoped>
.nwForm {
    border: 1 solid black;
    border-radius: 10px;
    margin: 0;
    padding: 0;
    padding-right: 50px;
    width: 100%;
    height: fit-content;
}

.header-title {
    padding: 20px 30px 50px 20px;
    display: flex;
}

.header-title h3 {
    font-size: 48px;
    font-weight: 500;
}

.new-box {
    margin: 0 20%;
}

.new-task {
    margin: 3%;
}

.new-kat {
    margin: 3%;
}
.btn-dip {
    padding: 20px;
}
.addBtn {
    padding: 10px 20px;
}
</style>

<script>
import { doit } from '../assets/ploadDo';

export default {
    data() {
        return {
            newTask: "",
            newKat: "",
        }
    },
    methods: {
        async pushNewtask() {
            let newkateg = this.newKat.toLowerCase()
            if(this.newTask == '' || this.newKat == '') return 0
            const newtdData = {
                task: this.newTask,
                kateg: newkateg
            }

            await doit.createTODO(newtdData)

            this.newTask = ''
            this.newKat = ''

        }
    }
}
</script>