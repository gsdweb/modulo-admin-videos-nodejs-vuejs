const express = require('express');
const router = express.Router();

const GaleriaModel = require('../model/GaleriaModel');
const RespostaClass = require('../model/RespostaClass');

let pastaPublica = './public/arquivos/';
let multer = require('multer');
let path = require('path');
let fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, pastaPublica)
    },
    filename: function (req, file, cb) {
      let nomeArquivo = `${file.fieldname.replace(/\//g, '')}-${Date.now()}${path.extname(file.originalname)}`;
      req.body.caminho = pastaPublica+nomeArquivo;
      cb(null, nomeArquivo)
    }
  })

var upload = multer({storage: storage});

function deletarArquivo(caminho){
    if(caminho != null){
        fs.unlinkSync(caminho);
        console.log('Arquivo Deletado');
        deletarArquivo(req.body.caminho);
    }
}

router.post("/", upload.single('arquivo'), function(req, resp, next){
    let resposta = new RespostaClass();

    if(req.file != null){
        GaleriaModel.adicionar(req.body, function(error, retorno){
            if(error){
                resposta.erro = true;
                resposta.msg = "Não foi enviado o vídeo.";
                console.log("Erro: ", error);
                deletarArquivo(req.body.caminho);
            }
            else{
                if(retorno.affectedRows > 0){
                    resposta.msg = "Cadastro Realizado com sucesso.";
                }
                else{
                    resposta.erro = true;
                    resposta.msg = "Não foi possível realizar a operação";
                    console.log("Erro: ", error);
                    deletarArquivo(req.body.caminho);
                }
            }
            console.log("Resposta: ", resposta);
            resp.json(resposta);
        });
    }else{
        resposta.erro = true;
        resposta.msg = "Ocorreu um erro.";
        console.log("Erro:", erro);
        req.json(resposta);
    }
});

router.put("/", upload.single('arquivo'), function(req, resp, next){
    let resposta = new RespostaClass();

        GaleriaModel.editar(req.body, function(error, retorno){
            if(error){
                resposta.erro = true;
                resposta.msg = "Não foi enviado o vídeo.";
                console.log("Erro: ", error);
                deletarArquivo(req.body.caminho);
            }
            else{
                if(retorno.affectedRows > 0){
                    resposta.msg = "Cadastro editado com sucesso.";
                }
                else{
                    resposta.erro = true;
                    resposta.msg = "Não foi possível editar o cadastro.";
                    console.log("Erro: ", error);
                    deletarArquivo(req.body.caminho);
                }
            }
            console.log("Resposta: ", resposta);
            resp.json(resposta);
        });

});

router.get("/", function(req, resp, next){
    GaleriaModel.getTodos(function(error, retorno){
        let resposta = new RespostaClass();
        if(error){
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro.";
            console.log("Erro: ", error);
        }
        else{
            resposta.dados = retorno;
        }
        resp.json(resposta);
    });
});

router.get("/:id?", function(req, resp, next){
    GaleriaModel.getId(req.params.id, function(error, retorno){
        let resposta = new RespostaClass();
        if(error){
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro.";
            console.log("Erro: ", error);
        }
        else{
            resposta.dados = retorno;
        }
        resp.json(resposta);
    });
});

router.delete("/:id?", function(req, resp, next){
    GaleriaModel.deletar(req.params.id, function(error, retorno){
        let resposta = new RespostaClass();
        if(error){
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro.";
            console.log("Erro: ", error);
        }
        else{
            if(retorno.affectedRows > 0){
                resposta.msg = "Cadastro deletado com sucesso.";
            }
            else{
                resposta.erro = true;
                resposta.msg = "Não foi possível excluir o cadastro.";
                console.log("Erro: ", error);
                deletarArquivo(req.body.caminho);
            }
        }
        resp.json(resposta);
    });
});

module.exports = router;