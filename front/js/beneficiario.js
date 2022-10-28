const loadTable = () => {
    axios.get(`${ENDPOINT}/beneficiarios`)
        .then((response) => {
            const data = response.data;
            var trHTML = '';
            data.forEach(element => {
                trHTML += '<tr>';
                trHTML += '<td>' + element.id + '</td>';
                trHTML += '<td>' + element.name + '</td>';
                trHTML += '<td>' + element.dataNascimento + '</td>';
                trHTML += '<td>' + element.cpf + '</td>';
                trHTML += '<td>' + element.agregadoFamiliar + '</td>';
                trHTML += '<td>' + element.sexo + '</td>';
                trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showBeneficiarioEditBox(' + element.id + ')">Edit</button>';
                trHTML += '<button type="button" class="btn btn-outline-danger" onclick="beneficiarioDelete(' + element.id + ')">Del</button></td>';
                trHTML += "</tr>";
            });
            document.getElementById("mytable").innerHTML = trHTML;
        })
};

loadTable();

const beneficiarioCreate = () => {
    const name = document.getElementById("name").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const cpf = document.getElementById("cpf").value;
    const agregadoFamilia = document.getElementById("agregadoFamiliar").value;
    const sexo = document.getElementById("sexo").value;
    const password = document.getElementById("password").value;

    axios.post(`${ENDPOINT}/beneficiarios`, {
        name: name,
        dataNascimento: dataNascimento,
        cpf: cpf,
        agregadoFamiliar: agregadoFamiliar,
        sexo: sexo,
        password: password
    })
        .then((response) => {
            Swal.fire(`Beneficiario ${response.data.name} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create beneficiario: ${error.response.data.error} `)
                .then(() => {
                    showBeneficiarioCreateBox();
                })
        });
}

const getBeneficiario = (id) => {
    return axios.get(`${ENDPOINT}/beneficiarios/` + id);
}

const beneficiarioEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const cpf = document.getElementById("cpf").value;
    const agregadoFamiliar = document.getElementById("agregadoFamiliar").value;
    const sexo = document.getElementById("sexo").value;
    const password = document.getElementById("password").value;

    axios.put(`${ENDPOINT}/beneficiarios/` + id, {
        name: name,
        dataNascimento: dataNascimento,
        cpf: cpf,
        agregadoFamilia: agregadoFamilia,
        sexo: sexo,
    })
        .then((response) => {
            Swal.fire(`Beneficiario ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update beneficiario: ${error.response.data.error} `)
                .then(() => {
                    showBeneficiarioEditBox(id);
                })
        });
}

const beneficiarioDelete = async (id) => {
    const beneficiario = await getBeneficiario(id);
    const data = beneficiario.data;
    axios.delete(`${ENDPOINT}/beneficiarios/` + id)
        .then((response) => {
            Swal.fire(`Beneficiario ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete beneficiario: ${error.response.data.error} `);
            loadTable();
        });
};

const showBeneficiarioCreateBox = () => {
    Swal.fire({
        title: 'Create beneficiario',
        html:
            '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="Name">' +
            '<input id="dataNascimento" class="swal2-input" placeholder="DataNascimento">' +
            '<input id="cpf" class="swal2-input" placeholder="cpf">' +
            '<input type="agregadoFamiliar" id="agregadoFamiliar" class="swal2-input" placeholder="AgregadoFamiliar">' +
            '<input id="sexo" class="swal2-input" placeholder="sexo">' +
            '<input type="password" id="password" class="swal2-input" placeholder="Password">',
            
           
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            beneficiarioCreate();
        }
    });
}

const showBeneficiarioEditBox = async (id) => {
    const beneficiario = await getBeneficiario(id);
    const data = beneficiario.data;
    Swal.fire({
        title: 'Edit beneficiario',
        html:
            '<input id="id" type="hidden" value=' + data.id + '>' +
            '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">' +
            '<input id="dataNascimento" class="swal2-input" placeholder="DataNascimento" value="' + data.dataNascimento + '">' +
            '<input id="cpf" class="swal2-input" placeholder="Cpf" value="' + data.cpf + '">' +
            '<input type="agregadoFamiliar" id="agregadoFamiliar" class="swal2-input" placeholder="AgregadoFamiliar" value="' + data.agregadoFamilia + '">' +
            '<input id="sexo" class="swal2-input" placeholder="Sexo" value="' + data.sexo + '">' +
            '<input type="password" id="password" class="swal2-input" placeholder="Password" value="' + data.password + '">',
            
           
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            beneficiarioEdit();
        }
    });

}