<?php
$server = "localhost";
  $username = "root";
  $password = "lukac";
  $baza = "kockar";
  $conn = mysqli_connect($server, $username, $password, $baza) or die('Nisi konektovan');

  $parovi = $_POST['parovi'];
  $ime = $_POST['ime'];

  $komanda = "INSERT INTO rezultat (id, ime, parovi)
  VALUES (NULL, '$ime', '$parovi')";
  mysqli_query($conn, $komanda);
  //print('Otvorio si '.$parovi.' parova a ime ti je '.$ime);
  $komandad = "SELECT * FROM rezultat ORDER BY parovi DESC";
  $rezultat = mysqli_query($conn, $komandad);

  print('<div style="foloat: left">
      <div style="height: 30px; width: 50px;  float: left; box-sizing: border-box;"><p style="text-alig: center; font-family: Autour One;">#</p></div>
      <div style="height: 30px; width: 200px;  float: left; box-sizing: border-box;"><p style="text-alig: center; font-family: Autour One;">name</p></div>
      <div style="height: 30px; width: 50px; float: left; box-sizing: border-box;"><p style="text-alig: center; font-family: Autour One;">cp</p></div>
  </div>');
  $i = 1;
while ($red = mysqli_fetch_assoc($rezultat)) {
   //print('Ime ti je   '.$red['ime'].'  a broj parova je  '.$red['parovi']);
   print('<div style="foloat: left">
       <div style="height: 30px; width: 50px;  float: left; box-sizing: border-box;"><p style="text-alig: center; font-family: Autour One;">'.$i.'</p></div>
       <div style="height: 30px; width: 200px;  float: left; box-sizing: border-box;"><p style="text-alig: center; font-family: Autour One;">'.$red['ime'].'</p></div>
       <div style="height: 30px; width: 50px; float: left; box-sizing: border-box;"><p style="text-alig: center; font-family: Autour One;">'.$red['parovi'].'</p></div>
   </div>');
   $i++;
   if($i == 11) {
     break;
   }
}
 ?>
