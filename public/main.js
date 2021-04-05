const update = document.querySelector('#update-button')
const title_val = document.getElementById('title').textContent
const tags_val = document.getElementById('tags').textContent
const description_val = document.getElementById('description').textContent
// const title_val = document.getElementById('exampleFormControlInput').value
// const tags_val = document.getElementById('exampleFormControlInput1').value
// const description_val = document.getElementById('exampleFormControlTextarea2').value
console.log("jnjfn",title_val)
update.addEventListener('click', _ => {
    fetch('/post', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title_val,
        tags: tags_val,
        description: description_val
      })
    //   upbody: JSON.stringify({
    //     title: title_val,
    //     tags: tags_val,
    //     description: description_val
    //   })

    })
    location.reload();
  })



const deleteButton = document.querySelector('#delete-button')
deleteButton.addEventListener('click', _ => {
  fetch('/post', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title_val
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(data => {
      window.location.reload()
    })
})