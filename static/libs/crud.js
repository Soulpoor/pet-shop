(function(api){
    $(document.body).on('AJAX_READY', function(event, data) {
        // First call.
        fetchPetData();
    });

    function fetchPetData () {
        $.get(`${api}/fetchAnimals`, function(data, status) {
            window.localStorage.setItem('pets', JSON.stringify(data));
            refreshDataGrid(data);
        })
    }

    function refreshDataGrid(data) {
        // Show data grid
        $('#data-grid-container').removeClass('d-none');
        // clear old data
        var dataGridBody = $('#data-grid').find('tbody');
        dataGridBody.html('');
        // overload pets data
        $(data).each(function (idx, ele){
            console.log(idx, ele);
            var tr = '<tr>' +
                `<td class="align-middle">${ idx + 1 }</td>` +
                `<td class="align-middle">${ele.animalname}</td>` +
                `<td class="align-middle">${ele.age}</td>` +
                `<td class="align-middle">${ele.species}</td>` +
                `<td class="align-middle text-center">` +
                `   <i class="cursor fa fa-pencil text-primary mr-3" title="edit" style="font-size:22px;" data-toggle="modal" data-target="#formModal" data-title="Edit" data-index="${idx}"></i>` +
                `   <i class="cursor fa fa-trash text-danger" title="delete" style="font-size:22px;" onclick="toDeletePet(event, ${idx})"></i>` +
                '</td>' +
            '</tr>';
            dataGridBody.append(tr);
        });
    }

    // The form-modal, used to edit pet data.
    $('#formModal').on('show.bs.modal', event => {
        var button = $(event.relatedTarget);
        var modal  = $('#formModal');
        var modalTitle  = button.data('title');
        var modalIndex = Number(button.data('index'));
        // Use above variables to manipulate the DOM
        modal.find('.modal-title').text(modalTitle + 'pet data');
        
        if (modalTitle === 'Add') {
            modal.find('.modal-body #pet-name').val('').removeAttr('readonly');
            modal.find('.modal-body #pet-age').val('');
            modal.find('.modal-body #pet-species').val('');
            $('#form-modal-submit').on('click', function(){
                toSavePet('createAnimal');
                fetchPetData();
                modal.modal('hide');
            });
        } else if (modalTitle === 'Edit') {
            var pets = JSON.parse(window.localStorage.getItem('pets'));
            var editOne = pets[modalIndex];
            modal.find('.modal-body #pet-name').val(editOne.animalname).attr('readonly', true);
            modal.find('.modal-body #pet-age').val(editOne.age);
            modal.find('.modal-body #pet-species').val(editOne.species);
            $('#form-modal-submit').on('click', function(){
                toSavePet('updateAnimal');
                fetchPetData();
                modal.modal('hide')
            });
        }
    });

    function toSavePet(route) {
        var animalname    = $('#pet-name').val();
        var animalage     = $('#pet-age').val();
        var animalspecies = $('#pet-species').val();
        console.log(`>> ${route} `, animalname);
        $.get(`${api}/${route}?animalname=${animalname}&age=${animalage}&species=${animalspecies}`, function(data, status) {
            fetchPetData();
        });
    }

    window.toDeletePet = function (event, idx) {
        
        var isConfirm = window.confirm(`Are you sure to delete?`);

        if (isConfirm) {
            var pets = JSON.parse(window.localStorage.getItem('pets'));
            var deleteOne = pets[idx].animalname;
            console.log(">> Delete ", deleteOne);
            $.get(`${api}/deleteAnimal?animalname=${deleteOne}`, function(data, status) {
                fetchPetData();
            });
        }
    }

})('http://localhost:8080');

