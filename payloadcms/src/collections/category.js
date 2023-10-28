import payload from 'payload';
/** @type {import('payload/types').CollectionConfig} */

const Kategori = {
    slug: 'kategori',
    admin: {
        useAsTitle: 'nama_kat',
      },
      hooks: {
        afterOperation: [async (args) => { if(args.operation == "create") {
            payload.create({
                collection: "log",
                data: {
                    koleksi: `category ${args.result.id}`,
                    aksi: args.operation,
                    timestamp: new Date()
                }
            })
        }
        }],
        afterChange: [async (args) => {
            if (args.previousDoc.nama_kat != undefined) {
                payload.create({
                    collection: "log",
                    data: {
                        koleksi: `category ${args.previousDoc.id}`,
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
                    koleksi: `catefory ${args.doc.id}`,
                    aksi: "delete",
                    timestamp: new Date()
                }
            })
        }]
    },
    fields: [
        {
            name: 'nama_kat',
            type: 'text',
            required: true
        }
    ]
}

export default Kategori