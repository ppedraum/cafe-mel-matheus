<?php

$mysqli = new mysqli("localhost", "root", "", "cafe_mel");

if(!$mysqli){
    throw new Exception('Nao foi possivel conectar');
}

// $query = $mysqli->query(
//     "INSERT INTO usuario(nome,cpf,cep,rua,endereco,numero,complemento) VALUES 
//     (
//         'Predo', '665.061.740-72', '88804-140','blabal','teste','123',''
//     );"
// );

// if(!$query){
//     echo $mysqli->error;
// }