/** @type {import('payload/types').CollectionConfig} */
const ToDo = {
  slug : "todo",
  fields : [
    {
        name: 'nama_user',
        type: 'relationship',
        realtionTo: 'users',
        required: true,
    },
    {
      name: "nama_td",
      type: "text",
      required: true,
    },

    {
      name: 'kategori',
      type: 'relationship',
      required: true,
      relationTo: 'kategori',
    },
    {
        name: 'status_td',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 1,
        require: false
    },
  ]
}

export default ToDo