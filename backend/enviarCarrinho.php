<?php

require_once "dbConn.php";

$req = json_decode(file_get_contents("php://input"), true);

$stmt = $mysqli->prepare('
    INSERT INTO usuario(nome, cpf, rua, endereco, numero, complemento) VALUES (?,?,?,?,?,?)
');

$stmt->bind_param('ssssss',$req['nome'],$req['cpf'],$req['rua'],$req['endereco'],$req['numero'], $req['complemento']);

$res = $stmt->execute();

if(!$res){
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['res'=>'erro','erro'=>'parametro errado ao inserir usuario']);
    exit;
}

$user_id = $mysqli->insert_id;
$total = 0;

$stmt = $mysqli->prepare("INSERT INTO pedido(id_usuario, total, forma_pgto) VALUES (?,?,?)");
$stmt->bind_param("ids",$user_id, $total, $req['formaPgto']);
$res = $stmt->execute();

if(!$res){
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['res'=>'erro','erro'=>'parametro errado ao inserir pedido']);
    exit;
}


echo json_encode(['res'=>'ok']);

exit;