const db = require('../banco/dbConexao');

module.exports = class GaleriaModel{
    static getTodos(callback){
       return db.query("SELECT * FROM tb_videos", callback);
    }
    static getId(id, callback){
        return db.query("SELECT * FROM tb_videos WHERE id_video = ?", [id], callback);
    }
    static adicionar(dados, callback){
        return db.query("INSERT INTO tb_videos (titulo, caminho) VALUES(?, ?)", [dados.titulo, dados.caminho], callback);
    }
    static editar(dados, callback){
        if(dados.caminho != null){
            return db.query("UPDATE tb_videos SET titulo = ?, caminho = ? WHERE id_video = ?", [dados.titulo, dados.caminho, dados.id_video], callback);
        }
        else{
            return db.query("UPDATE tb_videos SET titulo = ? WHERE id_video = ?", [dados.titulo, dados.id_video], callback);
        }
    }
    static deletar(id, callback){
        return db.query("DELETE FROM tb_videos WHERE id_video = ?", [id], callback);
    }
}