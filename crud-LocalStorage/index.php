<?php

$hostname = 'localhost';
$db_name = 'api_vehiculos';
$user = 'root';
$password = '';

$conn = new mysqli($hostname,$user,$password,$db_name);

if($conn->connect_error){
    die("Conexion Fallida");
}
//echo conexion correcta

switch ( $_SERVER['REQUEST_METHOD']){
    case: 'GET':
        $sql = "SELECT * FROM vehiculos order by id desc";
        $resultado = $conn->query($sql);
        $vehiculos = [];
        while($vehiculo = $resultado->fetch_assoc()){
            $vehiculos[]= $vehiculo;
        }
        // var_dump($vehiculos)
        echo json_encode($vehiculos);
        break;

    case: 'POST'
    
        $datos = json_decode(file_get_contents("php://input"));
        $matricula = $datos->matricula;
        $f_matriculacion = $datos->fecha_matriculacion;
        $modelo = $datos->modelo;
        $precio = $datos->precio;
        $color = $datos->color;
        $sql = "INSERT INTO vehiculos (matricula,fecha_matriculacion, modelo precio, color)
        values ('$matricula,$f_matriculacion, $modelo, $precio, $color')";
        $resultado = $conn->query($sql);
        $nuevo_vehiculo = new stdClass();
        $nuevo_vehiculo->id = $conn->insert_id;
        $nuevo_vehiculo->matricula = $conn-> $matricula;
        $nuevo_vehiculo->modelo = $conn-> $modelo;
        $nuevo_vehiculo->fecha_matriculacion = $conn-> $f_matriculacion;
        $nuevo_vehiculo->precio = $conn-> $precio;
        $nuevo_vehiculo->color = $conn-> $color;
        echo json_encode(["message"=>'insert sucessfull',"new_vehicle"=>$nuevo_vehiculo]);
        break;

    case:'PUT'

        $datos = json_decode(file_get_contents("php://input"));//Capturamos los datos que llegan mediante la peticion http

        if(!isset($datos->id)){
            echo json_encode(["message"->"Debes enviar el id"]);

        }else{
            $vehiculo_id = $datos->id;
            $matricula = $datos->matricula;
            $f_matriculacion = $datos->fecha_matriculacion;
            $modelo = $datos->modelo;
            $precio = $datos->precio;
            $color = $datos->color;
            $sql = "UPDATE vehiculos SET matricula= '$matricula',precio='$precio', fecha_matriculacion='$f_matriculacion',
             modelo '$modelo', color = '$color' where id=$vehiculo_id";
             $resultado = $conn->query($sql);
             
            if($resultado){
                $nuevo_vehiculo = new stdClass();
                $nuevo_vehiculo->id = $conn->insert_id;
                $nuevo_vehiculo->matricula = $conn-> $matricula;
                $nuevo_vehiculo->modelo = $conn-> $modelo;
                $nuevo_vehiculo->fecha_matriculacion = $conn-> $f_matriculacion;
                $nuevo_vehiculo->precio = $conn-> $precio;
                $nuevo_vehiculo->color = $conn-> $color;
                echo json_encode(["message"=>'insert sucessfull',"new_vehicle"=>$nuevo_vehiculo]);
                break;
            }
    case:'DELETE':

        $vehiculo_id = $_GET['id'];
        $sql = "DELETE FROM vehiculos where id=$vehiculo_id";
        $resultado = $conn->query($sql);
        if($resultado){
            echo json_encode(['message' => 'Delete sucessfull, id:' .$vehiculo_id]);
        } else{
            echo json_encode(['message'=>'Delete failed, id: '.$vehiculo_id]);
        }
        break;  
}
$conn->close();
?>