const express = require('express');
const router = express.Router();
var getConnection = require('../conexion');

//Consultar un usuario por su numero de cédula
router.get('/usuario/:cedula', (req, res) => {
    console.log('Consultando usuario por cedula');
    
    getConnection(function(err, conn) {
        const {cedula} = req.params;
        if(err) {
            return res.sendStatus(400);
        }
        conn.query('SELECT * FROM usuario WHERE cedulausuario = ?', [cedula], function(err, result) {
            if(err) {
                conn.release();
                return res.sendStatus(400, 'Error al consultar usuario');
            }
            res.send(result);
            conn.release();
        });
    });
});
// almacenar un cliente en la base de datos
route.post('/usuario/', (req, res, next) => {
    const data= {
        nombreusuario: req.body.nombreusuario,
        apellidousuario: req.body.apellidousuario,
        cedulausuario: req.body.cedulausuario,
        telefonousuario: req.body.telefonousuario,
        direccionusuario: req.body.direccionusuario,
        correousuario: req.body.correousuario
    };
    const query = "INSERT INTO usuario (nombreusuario, apellidousuario, cedulausuario, telefonousuario, direccionusuario, correousuario) VALUES (\'" + data.nombreusuario + "\', \'" + data.apellidousuario + "\', \'" + data.cedulausuario + "\', \'" + data.telefonousuario + "\', \'" + data.direccionusuario + "\', \'" + data.correousuario + "\')";

    
    getConnection(function(err, client){
        if(err) {
            console.log('Error al conectarse a la base de datos');
        }
        client.query(query, function(err, result) {
            if(!err) {
                res.json({status: 'Registro Exitoso', message: 'Usuario registrado'});
            }else{
                console.log(err);
            }
        });
    });
});    
module.exports = router;

