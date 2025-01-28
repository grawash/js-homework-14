const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form);
    const id = formData.get('id');
    const category = formData.get('category'); // Use the `name` attribute of the input
    const price = formData.get('price');
    const res = await fetch(`http://localhost:3000/api/expenses/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category,
            price
        })
    })
    console.log(res)

})