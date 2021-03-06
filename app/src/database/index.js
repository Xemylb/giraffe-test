let users = [
  {
    email: 'admin@admin.com',
    password: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' /* password: admin */
  },
  {
    email: 'admin2@admin.com',
    password: '1c142b2d01aa34e9a36bde480645a57fd69e14155dacfab5a3f9257b77fdc8d8' /* password: admin2 */
  }
]

let posts = [{
  id: 1,
  title: 'Название 1',
  author: 'admin@admin.com',
  date: '21/12/2012',
  description: 'Длинное описание'
}, {
  id: 2,
  title: 'Название 2',
  author: 'admin@admin.com',
  date: '21/12/2014',
  description: 'Длинное описание'
},
{
  id: 3,
  title: 'Название 3',
  author: 'admin@admin.com',
  date: '21/12/2017',
  description: 'Длинное описание'
},
{
  id: 4,
  title: 'Название 4',
  author: 'admin2@admin.com',
  date: '21/12/2016',
  description: 'Длинное описание'
},
{
  id: 5,
  title: 'Название 5',
  author: 'admin2@admin.com',
  date: '21/12/2018',
  description: 'Длинное описание'
},
{
  id: 6,
  title: 'Название 6',
  author: 'admin2@admin.com',
  date: '21/12/2018',
  description: 'Длинное описание'
},
    {
        id: 7,
        title: 'Название 7',
        author: 'admin@admin.com',
        date: '11/12/2016',
        description: 'Длинное описание'
    },
    {
        id: 8,
        title: 'Название 8',
        author: 'admin2@admin.com',
        date: '21/12/2017',
        description: 'Длинное описание'
    },
    {
        id: 9,
        title: 'Название 9',
        author: 'admin@admin.com',
        date: '21/12/2018',
        description: 'Длинное описание'
    }]

Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value))
}

Storage.prototype.getObject = function (key) {
  let value = this.getItem(key)
  return value && JSON.parse(value)
}

if (!localStorage.getObject('posts')) {
  localStorage.setObject('posts', posts)
}

if (!localStorage.getObject('users')) {
  localStorage.setObject('users', users)
}
