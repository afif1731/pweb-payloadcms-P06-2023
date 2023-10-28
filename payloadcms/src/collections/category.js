/** @type {import('payload/types').CollectionConfig} */
const Kategori = {
    slug : "kategori",
    admin : {
      useAsTitle : "nama_kat"
    },
    fields : [
      {
        name: "nama_kat",
        type: "text",
        required: true,
      },
   ]
}
  export default Kategori