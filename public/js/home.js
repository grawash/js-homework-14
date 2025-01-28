const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/api/expenses/${id}`, {
        method: 'DELETE',
        headers:{
            'api-key': '12345',
        }
    })
    window.location.reload()
}