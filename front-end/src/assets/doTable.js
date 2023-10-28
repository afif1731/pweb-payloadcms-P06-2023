import { reactive } from 'vue'

export const tdListAction = reactive ({
 tdList: [
        {doNum: 0, tdo: "Nyari kucing", kategori: "rumah", sdh: 0},
        {doNum: 1, tdo: "Praktikum Sisop", kategori: "kuliah", sdh: 0},
        {doNum: 2, tdo: "Lulus Cumlaude", kategori: "ngimpi", sdh: 0},
 ],
 tdListDone: [
    {doNum: 3, tdo: "tidur", kategori: "rumah", sdh: 1},
    {doNum: 4, tdo: "declare hari kamis", kategori: "kuliah", sdh: 1},
 ],
 tdListRill: [],
 tdListDoneRill: [],
 
 setLclStrg() {
    localStorage.clear();
    for(let task in this.tdList) {
        if(this.tdList[task].sdh == 0) this.tdListRill.push(this.tdList[task])
        let task_strg = JSON.stringify(this.tdList[task]);
        localStorage.setItem(`task${this.tdList[task].doNum}`, task_strg);
    }
    for(let task in this.tdListDone) {
        if(this.tdListDone[task].sdh == 1) this.tdListDoneRill.push(this.tdListDone[task])
        let task_strg = JSON.stringify(this.tdListDone[task]);
        localStorage.setItem(`task${this.tdListDone[task].doNum}`, task_strg);
    }
 },

 addTd(newTask) {
   const foundId = this.tdListRill.findIndex((task)=>task.doNum === newTask.doNum);
   if (foundId === -1) this.tdListRill.push(newTask);
 },

 addTdDone(newTask) {
   const foundId = this.tdListDoneRill.findIndex((task)=>task.doNum === newTask.doNum);
   if (foundId === -1) this.tdListDoneRill.push(newTask);
 },

 addTdForm(task) {
    this.tdListRill.push(task);
    let task_strg = JSON.stringify(task);
    localStorage.setItem(`task${task.doNum}`, task_strg);
 },

 addTdDoneForm(task) {
    this.tdListDoneRill.push(task);
    let task_strg = JSON.stringify(task);
    localStorage.setItem(`task${task.doNum}`, task_strg);
 },

 deleteTd(taskId) {
    const foundId = this.tdListRill.findIndex((task)=>task.doNum === taskId);
    if (foundId !== -1) {
        this.tdListRill.splice(foundId, 1);
        localStorage.removeItem(`task${taskId}`);
    }
 },

 deleteTdDone(taskId) {
    const foundId = this.tdListDoneRill.findIndex((task)=>task.doNum === taskId);
    if (foundId !== -1) {
        this.tdListDoneRill.splice(foundId, 1);
        localStorage.removeItem(`task${taskId}`);
    }
 },

 moveToDone(taskId) {
    const taskDoneId = this.tdListRill.findIndex((task)=>task.doNum === taskId);
    let taskDone = this.tdListRill[taskDoneId];
    if (taskDone.sdh == 0) {
        taskDone.sdh = 1
        this.deleteTd(taskId);
        this.addTdDoneForm(taskDone);
    }
 },

 moveToDo(taskId) {
    const taskDoneId = this.tdListDoneRill.findIndex((task)=>task.doNum === taskId);
    let taskDo = this.tdListDoneRill[taskDoneId];
    if (taskDo.sdh == 1) {
        taskDo.sdh = 0
        this.deleteTdDone(taskId);
        this.addTdForm(taskDo);
    }
 },
 changeToDo(chngTask) {
   let newTaskNum = chngTask.doNum;
   const taskId = this.tdListRill.findIndex((task) => task.doNum === newTaskNum);
      if (taskId !== -1) {
         let upTask = JSON.stringify(chngTask);
         this.tdListRill.splice(taskId, 1, upTask);
         localStorage.setItem(`task${chngTask.doNum}`, upTask);
      }
 }


})