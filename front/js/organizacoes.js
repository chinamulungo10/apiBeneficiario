const loadTable = () => {
    axios.get(`${ENDPOINT}/organizacoes`)
        .then((response) => {
            const data = response.data;
            var trHTML = '';
            data.forEach(element => {
                trHTML += '<tr>';
                trHTML += '<td>' + element.id + '</td>';
                trHTML += '<td>' + element.name + '</td>';
                trHTML += '<td>' + element.cnpj + '</td>';
                trHTML += '<td>' + element.cityId + '</td>';
                trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showOrganizacaoEditBox(' + element.id + ')">Edit</button>';
                trHTML += '<button type="button" class="btn btn-outline-danger" onclick="organizacaoDelete(' + element.id + ')">Del</button></td>';
                trHTML += "</tr>";
            });
            document.getElementById("mytable").innerHTML = trHTML;
        })
};

loadTable();

const organizacaoCreate = () => {
    const name = document.getElementById("name").value;
    const cnpj = document.getElementById("cnpj").value;

    axios.post(`${ENDPOINT}/organizacoes`, {
        name: name,
        cnpj: cnpj,
    })
        .then((response) => {
            Swal.fire(`Organizacao ${response.data.name} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create organizacao: ${error.response.data.error} `)
                .then(() => {
                    showOrganizacaoCreateBox();
                })
        });
}

const getOrganizacao = (id) => {
    return axios.get(`${ENDPOINT}/organizacoes/` + id);
}

const organizacaoEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const cnpj = document.getElementById("cnpj").value;

    axios.put(`${ENDPOINT}/organizacoes/` + id, {
        name: name,
        cnpj: cnpj,
    })
        .then((response) => {
            Swal.fire(`Organizacao ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update organizacao: ${error.response.data.error} `)
                .then(() => {
                    showOrganizacaoEditBox(id);
                })
        });
}

const organizacaoDelete = async (id) => {
    const organizacao = await getOrganizacao(id);
    const data = organizacao.data;
    axios.delete(`${ENDPOINT}/organizacoes/` + id)
        .then((response) => {
            Swal.fire(`Organizacao ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete organizacao: ${error.response.data.error} `);
            loadTable();
        });
};

const showOrganizacaoCreateBox = () => {
    Swal.fire({
        title: 'Create organizacao',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            '<input id="cnpj" class="swal2-input" placeholder="Cnpj">' +
            '<input id="cityId" class="swal2-input" placeholder="CityId">' ,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            organizacaoCreate();
        }
    });
}

const showOrganizacaoEditBox = async (id) => {
    const Organizacao = await Organizacao(id);
    const data = organizacao.data;
    Swal.fire({
        title: 'Edit Organizacao',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">' +
            '<input id="cnpj" class="swal2-input" placeholder="Cnpj" value="' + data.cnpj + '">' +
            '<input id="cityId" class="swal2-input" placeholder="CityId" value=' + '>' ,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            organizacaoEdit();
        }
    });

}
