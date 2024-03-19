<?php
include_once('config/config.php');
include_once('config/conexion.php');



class ProductoDAO {
    private $id;
    private $nombre;
    private $descripcion; 
    private $conexion;
    public function __construct ($nom=' ', $desc= ' ', $id=null){

        $this->nombre=$nom;
        $this->descripcion=$desc;
        $this->$id=$id;
        $this->conexion=new Conexion (DB_HOST, DB_USER, DB_PASS, DB_NAME);
        
    }
    public function traerDatosProducto () {
        $db=$this->conexion->Conectar();
        $consulta= $db->prepare ("SELECT * FROM prueba");
        $consulta -> execute ();
        $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
        return $resultados;
    }
    public function traerDatosProductoXid() {
        $db=$this->conexion->Conectar();
        $query="SELECT * FROM prueba WHERE id=$this->id";
        $consulta = $db->prepare($query);
        $consulta->execute();
        $resultados= $consulta->fetch(PDO::ASSOC);
        return $resultados;
    }


    public function addProductos () {
        $db=$this->conexion->Conectar();
        $query ="INSERT INTO prueba (nombre, descripcion) VALUES ('$this->nombre', '$this->descripcion')";
        $consulta = $db->prepare($query);
        $consulta->execute();
    }
}
?>