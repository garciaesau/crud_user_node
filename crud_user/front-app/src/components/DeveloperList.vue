<template>
    <div>
        <b-container fluid class="mt-4">
            <b-row no-gutters>
                <b-col cols="2"></b-col>
                <b-col cols="8">
                    <b-card title="Card Title" no-body>
                        <b-card-header header-tag="nav">
                            <b-row no-gutters>
                                <b-col>
                                    <b-nav card-header pills align="end">
                                        <b-button v-b-modal.modal-prevent-closing variant="success">+ Novo</b-button>
                                    </b-nav>
                                </b-col>
                            </b-row>
                        </b-card-header>
                        <b-alert class="m-2" :show="showAlert" v-model="showAlert" :variant="typeVariantAlert" align="center" dismissible>
                            {{ message }}
                        </b-alert>
                        <b-card-body>
                            <b-card-text>
                                <b-table striped bordered borderless outlined primary-key="id" :filter="filter"
                                         :items="items"
                                         :fields="fields">
                                    <template #cell(acoes)="row">
                                        <b-button-group size="sm">
                                            <b-button variant="success mx-2" @click="editDeveloper(row.item.id)">Editar
                                            </b-button>
                                            <b-button variant="danger" @click="deleteDeveloper(row.item.id, row.index)">
                                                Excluir
                                            </b-button>
                                        </b-button-group>
                                    </template>
                                </b-table>
                            </b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>

        <!-- area do modal -->
            <b-modal
                id="modal-prevent-closing"
                ref="modal"
                title="Novo Desenvolvedor"
                @show="resetModal"
                @hidden="resetModal"
                @ok="handleOk"
            >
                <template>
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group
                        label="Nome"
                        label-for="name"
                    >
                        <b-form-input
                            id="name"
                            v-model="name"
                            :state="validateName"
                            required
                            placeholder="Digite seu nome"
                            type="text"
                            autocomplete="false"
                        ></b-form-input>
                        <b-form-invalid-feedback :state="validateName">
                            O nome deve ter entre 5 e 200 caracteres.
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback :state="validateName">
                            Tudo certo!
                        </b-form-valid-feedback>
                    </b-form-group>

                    <b-form-group
                        label="Sexo"
                        label-for="sex"
                    >
                        <b-form-select
                            id="sex"
                            required
                            :options="sexOptions"
                            v-model="sex"
                            :state="validateSex"
                        ></b-form-select>
                        <b-form-invalid-feedback :state="validateSex">
                            Selecione o sexo
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback :state="validateSex">
                            Tudo certo!
                        </b-form-valid-feedback>
                    </b-form-group>

                    <b-form-group
                        label="Idade"
                        label-for="age"
                    >
                        <b-form-input
                            id="age"
                            v-model="age"
                            :state="validateAge"
                            required
                            placeholder="Qual a sua idade?"
                            type="number"
                            autocomplete="off"
                            @keypress="verifyAge"
                        ></b-form-input>
                        <b-form-invalid-feedback :state="validateAge">
                            Idade deve possuir ao menos um valor, no máximo 3 e ser menor que 150.
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback :state="validateAge">
                            Tudo certo!
                        </b-form-valid-feedback>
                    </b-form-group>

                    <b-form-group
                        label="Hobby"
                        label-for="hobby"
                    >
                        <b-form-input
                            id="hobby"
                            v-model="hobby"
                            required
                            placeholder="Nos diga o hobby que você mais gosta..."
                            type="text"
                            :state="validateHobby"
                            autocomplete="false"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                        label="Data de Nascimento"
                        label-for="birthdate"
                    >
                        <b-form-datepicker
                            id="birthdate"
                            v-model="birthdate"
                            selected-variant="success"
                            today-variant="info"
                            nav-button-variant="primary"
                            type="text"
                            class="mb-2"
                            :date-format-options="{day: 'numeric', month: 'numeric', year: 'numeric' }"
                            :state="validateBirthDate"
                            placeholder="DD/MM/YYYY">
                        </b-form-datepicker>
                    </b-form-group>
                    <b-alert class="m-2" :show="showMessageRequiredFields" v-model="showMessageRequiredFields" variant="info" align="center" dismissible fade>
                        Verifique os campos obrigatórios!
                    </b-alert>
                </form>
                </template>

                <template #modal-footer="{ ok, cancel}">
                    <b-button size="sm" variant="success" @click="ok()">Salvar</b-button>
                    <b-button size="sm" variant="danger" @click="cancel()">Cancelar</b-button>
                </template>
            </b-modal>

        <!-- fim modal -->
    </div>
</template>

<script>
import axios from "axios";
import moment from 'moment';

export default {
    name: "developers",
    data() {
        return {
            fields: [
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'sex', label: 'Sexo'},
                {key: 'age', label: 'Idade'},
                {key: 'birthdate', label: 'Data Nascimento'},
                {key: 'hobby', label: 'Hobby'},
                {key: 'acoes', label: 'Ações'},
            ],
            items: [],
            filter: '',
            message: '',
            showAlert: false,
            typeVariantAlert: '',
            id: '',
            name: '',
            sex: '',
            age: '',
            hobby: '',
            birthdate: '',
            sexOptions: [
                {value: 'M', text: 'Masculino'}, {value: 'F', text: 'Feminino'}
            ],
            showMessageRequiredFields: false,
        }
    },
    methods: {
        formatDate(date) {
            return moment(String(date)).format('DD/MM/YYYY');
        },
        verifyItems(objeto) {
            let data = objeto;
            for (var i = 0; i < data.length; i++) {
                data[i].sex = (data[i].sex.toUpperCase() == 'M' ? 'Masculino' : 'Feminino');
                data[i].birthdate = this.formatDate(data[i].birthdate);
            }

            return data;
        },
        showMessageRequisition(typeAlert = 'success', showAlert, messageAlert) {
            this.typeVariantAlert = typeAlert;
            this.showAlert = showAlert;
            this.message = messageAlert;
        },
        getDevelopers() {
            axios.get('/')
                .then(response => {
                    if (response.status == 200 && response.data.totalItems) {
                        this.items = this.verifyItems(response.data.users);
                        return;
                    }

                    this.showMessageRequisition('info', 5, 'Nenhum desenvolvedor encontrado!');
                })
                .catch(e => (console.log(e)));
        },
        deleteDeveloper(id, index) {
            axios.delete('/' + id)
                .then(response => {
                    if (response.status == 200) {
                        this.items.splice(index, 1);
                        this.showMessageRequisition('success', 5, 'Sucesso ao deletar o desenvolvedor!');
                    }
                })
                .catch(e => {
                    if (e.response.data && e.response.status == 404) {
                        this.showMessageRequisition('danger', 5, e.response.data.message);
                        return;
                    }

                    this.showMessageRequisition('danger', 5, 'An unexpected error occurred!');
                    console.log(e);
                });
        },
        createDeveloper(data) {
            let developer = {};
            developer = data;

            axios.post('/', developer, {
                headers: {
                  "Content-type": "application/json"
                }
            }).then(response => {
                if (response.status == 200) {
                    this.showMessageRequisition('success', 5, 'Desenvolvedor cadastrado com sucesso!');
                    this.getDevelopers();
                    return;
                }

                this.showMessageRequisition('danger', 5, response.data.message);

            }).catch(e => (console.log(e)));
        },
        editDeveloper(id) {
            axios.get('/' + id)
                .then(response => {
                    let data = {};
                    data = response.data;
                    this.$refs['modal'].show();
                    this.id = data.id;
                    this.name = data.name;
                    this.sex = data.sex;
                    this.age = data.age;
                    this.hobby = data.hobby;
                    this.birthdate = data.birthdate;
                }).catch(e => (console.log(e)))
        },
        updateDeveloper(data) {
            let developer = {};
            developer = data;
            axios.put('/' + developer.id, developer, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status == 200) {
                    this.showMessageRequisition('success', 5, 'Dados do desenvolvedor foram atualizados!');
                    this.getDevelopers();
                    return;
                }

                this.showMessageRequisition('danger', 5, response.data.data.message);
            });
        },
        resetModal() {
            this.id = '';
            this.name = '';
            this.sex = '';
            this.age = '';
            this.hobby = '';
            this.birthdate = '';
            this.showMessageRequiredFields = false;
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            if (this.name.length < 5 || this.sex.length <= 0 || this.hobby.length <= 0 || this.age <= 0) {
                this.showMessageRequiredFields = 5;
                return;
            }

            let data = {
                id: this.id,
                name: this.name,
                sex: this.sex,
                age: this.age,
                hobby: this.hobby,
                birthdate: this.birthdate
            }

            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            });

            if (this.id) {
                this.updateDeveloper(data);
                return;
            }

            this.createDeveloper(data);
        },
        verifyAge() {
            this.age = String(this.age).replace(/[0-9]{3}/, '');
        }
    },
    mounted() {
        this.getDevelopers();
    },
    computed: {
        validateName() {
            if (this.name.length < 5) {
                return false;
            }

            return true;
        },
        validateSex() {
            if (this.sex.length <= 0) {
                return false;
            }

            return true;
        },
        validateAge() {
            if (this.age.length <= 0 || this.age.length > 3 || this.age > 150) {
                return false;
            }

            return true;
        },
        validateHobby() {
            if (this.hobby.length <= 0) {
                return false;
            }

            return true;
        },
        validateBirthDate() {
            if (this.birthdate.length <= 0) {
                return false;
            }

            return true;
        }
    }
}

</script>

<style scoped>
</style>
