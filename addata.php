<?php
// Conexión a la base de datos (ejemplo con MySQLi)
$servername = "clark";
$username = "root";
$password = "";
$dbname = "cayco";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Obtener datos enviados desde App Inventor
$nombre = $_POST['nombre'];
$monto = $_POST['monto'];
$fecha_lim = $_POST['fecha_lim'];
// Validar datos y realizar la operación en la base de datos (ejemplo de inserción)
$sql = "INSERT INTO datos (nombre,monto,fecha_lim) VALUES ('$nombre', '$monto', '$fecha_lim')";

if ($conn->query($sql) === TRUE) {
  echo "Nuevo registro creado correctamente";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
