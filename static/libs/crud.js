$(document.body).on('AJAX_READY', function(event, data) {
    // 
    fetchPetData();
});

function fetchPetData () {
    $.get(`http://localhost:8080/fetchAnimals`, function(data, status) {
        refreshDataGrid(data)
    })
}

function refreshDataGrid(data) {
    $('#data-grid-container').removeClass('data-grid-container-none');
    var dataGridBody = $('#data-grid').find('tbody');
    $(data).each(function (idx, ele){
        console.log(idx, ele);
        var tr = '<tr>' +
            `<td class="align-middle">${ idx + 1 }</td>` +
            `<td class="align-middle">${ele.animalname}</td>` +
            `<td class="align-middle">${ele.age}</td>` +
            `<td class="align-middle">${ele.species}</td>` +
            '<td class="align-middle">' +
            '   <button type="button" class="btn btn-info btn-sm">edit</button>' +
            '   <button type="button" class="btn btn-danger btn-sm">delete</button>' +
            '</td>' +
        '</tr>';
        dataGridBody.append(tr);
    });
    // console.log($('<tr>').append('<td>'));
}