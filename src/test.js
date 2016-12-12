// $.method('user.add').call({
//   name: 'hello2',
//   email: 'xxdddxx@qq.com',
//   password: '123456',
//   nickname: '测试一',
//   about: '好腻害',
// },console.log)


// $.method('user.update').call({
//   name: 'hello2'
// },console.log)

async function test() {
  let user = await $.method('user.get').call({
    name: 'hello2'
  })
  // user.then(console.log);
  console.log(user)
  // return user;
}
//
test();
// console.log(test())
// $.method('user.get').call({
//   name: 'hello2'
// })
