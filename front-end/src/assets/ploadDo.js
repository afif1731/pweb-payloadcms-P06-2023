import { reactive } from 'vue'
import axios from 'axios'

export const doit = reactive ({
    //data penting
    kukiToken: '',
    currentChange: '',
    userData: [],
    tdlist: [],
    kTegori: [],

    //sinkronisasi payload dan vue
    async createKuki() {
        let docKuki = document.cookie

        if (docKuki.indexOf('payload-token=') == -1) {
            await axios.postForm('http://127.0.0.1:3000/api/users/login', {
                email: 'kambing@mail.com',
                password: '12345',
            }, {
                withCredentials: true
            }
            ).then((res) => {
                let fullData = res.data
                this.kukiToken = fullData.token
                document.cookie = fullData.user.nama_user + "=" + this.kukiToken + "; max-age=7200"
            })
        } else {
            let splitKuki = docKuki.split(';');
            let splitkukilagi = splitKuki[0].split('=')
            this.kukiToken = splitkukilagi[1]
        }
        this.getUser()
        this.getToDo()
        this.getKat()
    },
    async getUser() {
        await axios.get('http://127.0.0.1:3000/api/users/me', {
            withCredentials: true,
            headers: {
                Authorization: `JWT ${this.kukiToken}`,
            }
        }).then((res) => {
            const hasl = res.data
            this.userData = hasl.user
        })
    },
    async getToDo() {
        await axios.get('http://127.0.0.1:3000/api/todo', {
            withCredentials: true,
            headers: {
                Authorization: `JWT ${this.kukiToken}`,
            }
        }).then((res) => {
            this.tdlist = res.data.docs
        })
    },
    async getKat() {
        await axios.get('http://127.0.0.1:3000/api/kategori', {
            withCredentials: true,
            headers: {
                Authorization: `JWT ${this.kukiToken}`,
            }
        }).then((res) => {
            this.kTegori = res.data.docs
        })
    },

    //fungsi CRUD
    setChange(taskID) {
        this.currentChange = taskID
    },
    async createTODO(newtdData) {
        let cekTaskIndex = this.tdlist.findIndex((todo) => todo.nama_td === newtdData.task)
        let cekKatIndex = this.kTegori.findIndex((kat) => kat.nama_kat === newtdData.kateg)

        if(cekTaskIndex === -1) {
            if(cekKatIndex === -1) {
                await axios.post('http://127.0.0.1:3000/api/kategori', {
                    nama_kat: newtdData.kateg
                },
                {
                    headers: {
                        Authorization: `JWT ${this.kukiToken}`
                    }
                }).then( async () => {
                    await this.getKat()
                    cekKatIndex = this.kTegori.findIndex((kat) => kat.nama_kat === newtdData.kateg)
                })
            }
            await axios.post('http://127.0.0.1:3000/api/todo', {
                nama_user: this.userData.id,
                nama_td: newtdData.task,
                kategori: this.kTegori[cekKatIndex].id
            },
            {
                headers: {
                    Authorization: `JWT ${this.kukiToken}`
                }
            }).then(() => {
                this.getToDo()
            })
        }
    },
    async updateTD(todoData) {
        let cekKatIndex = this.kTegori.findIndex((kat) => kat.nama_kat === todoData.kat)

        if(cekKatIndex === -1) {
            await axios.post('http://127.0.0.1:3000/api/kategori', {
                nama_kat: todoData.kat
            },
            {
                headers: {
                    Authorization: `JWT ${this.kukiToken}`
                }
            }).then( async () => {
                await this.getKat()
                cekKatIndex = this.kTegori.findIndex((kat) => kat.nama_kat === newtdData.kateg)
            })
        }

        await axios.patch(`http://127.0.0.1:3000/api/todo/${this.currentChange}`, {
            nama_td: todoData.task,
            kategori: this.kTegori[cekKatIndex].id

        },
        {
            headers: {
                Authorization: `JWT ${this.kukiToken}`
            }
        }).then(() => {
            this.getToDo()
        })
    },
    async delTD(taskID) {
        await axios.delete(`http://127.0.0.1:3000/api/todo/${taskID}`, {
            headers: {
                Authorization: `JWT ${this.kukiToken}`
            }
        }).then(() => {
            this.getToDo()
        })
    },
    async setFinished(taskID) {
        await axios.patch(`http://127.0.0.1:3000/api/todo/${taskID}`, {
            status_td: 1
        },
        {
            headers: {
                Authorization: `JWT ${this.kukiToken}`
            }
        }).then(() => {
            this.getToDo()
        })
    },
    async setUnFinished(taskID) {
        await axios.patch(`http://127.0.0.1:3000/api/todo/${taskID}`, {
            status_td: 0
        },
        {
            headers: {
                Authorization: `JWT ${this.kukiToken}`
            }
        }).then(() => {
            this.getToDo()
        })
    }
})
