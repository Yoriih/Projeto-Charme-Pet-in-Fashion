<?php

$host = "sql109.infinityfree.com";
$usuario = "if0_40326570";
$senha = "Billy91169108";
$banco = "if0_40326570_sis_academico";

try {

    $conexao = new PDO("mysql:host=$host;dbname=$banco;charset=utf8", $usuario, $senha);

$conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {

    die('Não foi possível conectar ao banco de dados. Erro detectado:' . $e->getMessage());

}

?>