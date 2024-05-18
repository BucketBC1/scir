async function showEditDialog(itemId) {
    const dialog = document.getElementById(`edit-dialog-${itemId}`);

    try {
        const response = await fetch(`/get-element/${itemId}`);

        if (response.ok) {
            const data = await response.json();
            document.querySelector('[name="subcategoria"]').value = data.subcategoria;
            document.querySelector('[name="diametro"]').value = data.diametro;
            document.querySelector('[name="cantidad"]').value = data.cantidad;
            document.querySelector('[name="longitud"]').value = data.longitud;
            document.querySelector('[name="codigo"]').value = data.codigo;

            dialog.showModal();
        } else {
            console.error('Error al obtener los datos del elemento');
        }
    } catch (error) {
        console.error('Error al obtener los datos del elemento', error);
    }

};

function closeEditDialog(itemId) {
    const dialog = document.getElementById(`edit-dialog-${itemId}`);
    dialog.close(); // Cierra el modal
}



