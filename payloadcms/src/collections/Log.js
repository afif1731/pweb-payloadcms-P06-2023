/** @type {import('payload/types').CollectionConfig} */

const Log = {
    slug: 'log',
    fields: [
        {
            name: 'koleksi',
            type: 'text',
            required: true
        },
        {
            name: 'aksi',
            type: 'text',
            required: true
        },
        {
            name: 'timestamp',
            type: 'date',
            required: true
        }
    ]
}

export default Log