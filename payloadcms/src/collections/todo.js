import payload from 'payload';
/** @type {import('payload/types').CollectionConfig} */

const ToDo = {
    slug: 'todo',
    hooks: {
        afterOperation: [async (args) => { if(args.operation == "create") {
            payload.create({
                collection: "log",
                data: {
                    koleksi: `todo ${args.result.id}`,
                    aksi: args.operation,
                    timestamp: new Date()
                }
            })
        }
        }],
        afterChange: [async (args) => {
            if (args.previousDoc.nama_td != undefined) {
                payload.create({
                    collection: "log",
                    data: {
                        koleksi: `todo ${args.previousDoc.id}`,
                        aksi: "update",
                        timestamp: new Date()
                    }
                })
            }
        }],
        afterDelete: [async (args) => {
            payload.create({
                collection: "log",
                data: {
                    koleksi: `todo ${args.doc.id}`,
                    aksi: "delete",
                    timestamp: new Date()
                }
            })
        }]
    },
    fields: [
        {
            name: 'nama_user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
        {
            name: 'nama_td',
            type: 'text',
            required: true,
        },
        {
            name: 'kategori',
            type: 'relationship',
            relationTo: 'kategori',
            required: true,
        },
        {
            name: 'status_td',
            type: 'number',
            defaultValue: 0,
            min: 0,
            max: 1,
            required: false
        },
    ]
}

export default ToDo