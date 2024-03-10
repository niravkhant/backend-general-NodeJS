const objArr = [
  {
    _id: '65edf25183edf190ff2608a3',
    name: 'cat1',
  }
]

const newObj = objArr.map((item)=>(
  item._id
))

console.log(newObj);