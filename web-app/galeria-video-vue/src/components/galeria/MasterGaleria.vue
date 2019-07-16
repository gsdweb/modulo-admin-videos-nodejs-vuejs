<template>
  <div>
    <div id="listagem" class="galeria">
      <div class="row">
        <div class="col"><h1>Lista de Vídeos</h1></div>
        <div class="col text-right">
          <a data-fancybox data-src="#formulario" href="javascript:;" id="btn-exibir-formulario" class="btn btn-success" v-on:click="prepararFormCadastro()">
            <i class="fas fa-plus-circle"></i> Cadastrar</a>
        </div>
      </div>
      <br><br>
      <div id="galeria-listagem" v-show="true">

        <div class="row">
          <div class="col-sm-4 video-thumb" v-for="item in listagem" v-bind:key="item">
            
            <div class="card">
              <video v-bind:src="item.caminho" width="100%" class="card-img-top" controls></video>
              <div class="card-body">
                <div class="row">
                 <div class="col-10"><h2 class="card-title">{{item.titulo}}</h2></div>
                 <div class="col-2 text-right"><a data-fancybox data-src="#formulario" href="javascript:;" id="btn-exibir-formulario" class="card-link" v-on:click="prepararFormEditar(item.id_video)" title="Moderar vídeo"><i class="fas fa-ellipsis-v"></i></a></div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
    
    <!--FORMULÁRIO-->
    <div style="display:none; width:500px;" id="formulario" v-show="!exibirListagemForm">
     <div class="row"><div id="msg" class="col-12" v-html="mensagem"></div></div>

	   <div class="row" v-html="formTitulo"></div>

     <div class="row form-area">
       <div class="col-12">
         <form method="POST" action="/" id="galeriaForm" v-on:submit.prevent="salvar()" autocomplete="off">
           <div><input type="number" class="form-control d-none" id="id_video" name="id_video" disabled v-model="registro.id_video"></div>
           <div class="form-group">
             <label for="titulo">Título</label>
             <input type="text" class="form-control" id="titulo" name="titulo" placeholder="Informe um título" v-model="registro.titulo">
           </div>
           <div class="form-group">
             <label for="arquivo">Vídeo</label>
             <input type="file" class="form-control-file" id="arquivo" name="arquivo" ref="arquivo" v-on:change="carregarVideo($event)">
           </div>
           <div class="form-group">
             <video v-bind:src="urlVideo" width="100%" height="300" controls></video>
           </div>
           <div class="form-inline">
             <button id="btn-cadastrar" type="submit" class="btn btn-dark mr-3">Salvar</button>
             <button type="button" class="btn btn-delete btn-secondary" v-on:click="deletar(registro.id_video)">Deletar</button>
           </div>
         </form>
       </div>
     </div>

    </div>
    <!--FIM FORMULÁRIO-->




  
  </div>
</template>

<script>
export default {
  name: 'MasterGaleria',
  props: {
  },
  data(){
    return{
      exibirListagemForm: true,
      listagem: null,
      mensagem: "",
      urlVideo: "",
      arquivoVideo: "",
      registro: {id_video: null, titulo: ""},
      registroFormData: null
    }
  }, 
  methods: {
    listarDados(){
      this.$galeriaService.getTodos().then(response => {
        if(response.erro){
          console.log("Deu erro");
        }
        else{
          this.listagem = response.dados.map(function(objeto){
            return { id_video: objeto.id_video, titulo: objeto.titulo, caminho: this + (objeto.caminho ? objeto.caminho.substring(1) : objeto.caminho)  }
          }, this.$server);
          console.log("Deu certo");
        }
      }).catch(response => {
        console.log("Deu erro");
      });
    },
    exibirMsgAlert(msg, tipo){
      let dados = "";
      if(tipo == "sucesso"){
        dados = `<div class='alert alert-success' role='alert'><strong>${msg}</strong></div>`;
      }
      else if(tipo == "erro"){
        dados = `<div class='alert alert-danger' role='alert'><strong>${msg}</strong></div>`;
      }
      this.mensagem = dados;
    },
    limparMsgAlert(){
      this.mensagem = "";
      this.formTitulo = "";
    },
    prepararFormCadastro(){
      this.limparForm();
      this.limparMsgAlert();
      this.formTitulo = `<div class="col-12"><h2>Cadastrar Vídeo</h2><p>Preencha os campos abaixo para cadastrar seu vídeo.</p></div>`;
      $(".form-area").show();
      $(".btn-delete").hide();
    },
    carregarVideo(event){
      if(this.$refs.arquivo.files.length > 0){
        const leitor = new FileReader();
        const arquivo = this.$refs.arquivo.files[0];
        leitor.readAsDataURL(arquivo);
        leitor.onload = () => {
          const dataUrl = leitor.result;
          this.urlVideo = dataUrl;
          this.arquivoVideo = arquivo;
        }
      }
    },
    salvar(){
      this.registroFormData = new FormData();
      this.registroFormData.append('id_video', this.registro.id_video);
      this.registroFormData.append('titulo', this.registro.titulo);
      this.registroFormData.append('arquivo', this.arquivoVideo);
      if(this.registro.id_video > 0){
        this.editar(this.registroFormData);
      }
      else{
        this.cadastrar(this.registroFormData);
      }
    },
    cadastrar(dadosFormData){
      this.$galeriaService.adicionar(dadosFormData).then(response => {
        if(!this.verificarRetornoHttp(response)){
        this.limparForm();
        this.listarDados();
        this.exibirListagemForm = true;
        }
      }).catch(response => {
        this.exibirMsgAlert("Erro ao executar a operação de cadastro.", "erro");
      })
    },
    verificarRetornoHttp(resp){
      if(resp.erro){
        this.exibirMsgAlert(resp.msg, "erro");
        return true;
      }
      else{
        if(resp.msg !=null){
        this.exibirMsgAlert(resp.msg, "sucesso");
        return false;
        }
      }
    },
    limparForm(){
      let formHtml = document.getElementById("galeriaForm");
      formHtml.reset();
      this.urlVideo = '';
      this.arquivoVideo = null;
      this.registroFormData = new FormData();
      this.registro = {id_video: null, titulo: ""};
    },
  prepararFormEditar(id){
    this.limparForm();
    this.limparMsgAlert();
    this.formTitulo = `<div class="col-12"><h2>Editar Vídeo</h2><p>Preencha os campos abaixo para cadastrar seu vídeo.</p></div>`;
    $(".form-area, .btn-delete").show();
    this.$galeriaService.getId(id).then(response => {
      if(!this.verificarRetornoHttp(response)){
        this.registro.id_video = response.dados[0].id_video;
        this.registro.titulo = response.dados[0].titulo;
        if(response.dados[0].caminho != null){
          this.urlVideo = this.$server + response.dados[0].caminho.substring(1);
        }
      }
    }).catch(response => {
      this.exibirMsgAlert("Erro ao executar a operação de Editar.", "erro");
    });
  },
  editar(dadosFormData){
    this.$galeriaService.editar(dadosFormData).then(response => {
      if(!this.verificarRetornoHttp(response)){
        this.limparForm();
        this.listarDados();
        this.exibirListagemForm = true;
      }

    }).catch(response => {
      this.exibirMsgAlert("Erro ao realizar a operação editar.", "erro");
    })
  },
  deletar(id){
    let confirma = confirm("Deseja mesmo deletar esse vídeo?");
    if (confirma == true){
       this.$galeriaService.deletar(id).then(response => {
       if(!this.verificarRetornoHttp(response)){
        this.limparForm();
        this.listarDados();
        $(".form-area").hide();
        this.formTitulo = "";
       }
      }).catch(response => {
      this.exibirMsgAlert("Erro ao realizar a operação deletar.", "erro");
      })
     }
    }
  },
  mounted(){
    this.listarDados();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
