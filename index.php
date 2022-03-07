<!-- 
  COMP 333: Software Engineering
  Sebastian Zimmeck (szimmeck@wesleyan.edu) 

  PHP sample script for connecting to a database with SQL. This script can be run 
  from inside the htdocs directory in XAMPP. Based on
  https://www.w3schools.com/php/php_mysql_connect.asp
-->

<!-- 
    COMP 333: Software Engineering
    Nathan Hausspiegel
-->

<!DOCTYPE HTML>

<html lang="en">

<head>

    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">

    <title>music-db</title>

    <link rel="stylesheet" href="style_sample.css">

</head>
 
<body>
    <?php
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "music-db";

        // Create connection
        // The MySQLi extension was introduced with PHP version 5.0.0 and 
        // the MySQL Native Driver was included in PHP version 5.3.0. i 
        // stands for improved in MySQLi and provides various functions to 
        // access the MySQL database and to manipulate the data records 
        // inside the MySQL database. You would require to call the MySQLi 
        // functions in the same way you call any other PHP function.
        // https://www.tutorialspoint.com/mysqli/index.htm
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        // If the connection to the database is successful, you can now 
        // query your database using MySQL, e.g., with
        // $sql_query = "SELECT * FROM student_table WHERE student_id = *;
        // (assuming you have previously set up a student table with 
        // the student_id attribute)

        // `isset` — Function to determine if a variable is declared and is different than null.
        // Generally, check out the PHP documentation. It is really good.
        // E.g., https://www.php.net/manual/en/function.isset.php
        // $_REQUEST is a PHP super global variable which is used to collect data 
        // after submitting an HTML form.
        // https://www.w3schools.com/PHP/php_superglobals_request.asp
        // Some predefined variables in PHP are "superglobals", which means that 
        // they are always accessible, regardless of scope - and you can access them 
        // from any function, class or file without having to do anything special.
        // https://www.w3schools.com/PHP/php_superglobals.asp
        if(isset($_REQUEST["submit"])){
        // Variables for the output and the web form below.
        $out_value = "";
        $s_user = $_REQUEST['username'];
  
        // The following is the core part of this script where we connect PHP
        // and SQL.
        // Check that the user entered data in the form.
        if(!empty($s_user)){
          // If so, prepare SQL query with the data.
          $sql_query = "SELECT * FROM ratings WHERE username = ('$s_user')";
          // Send the query and obtain the result.
          // mysqli_query performs a query against the database.
          $result = mysqli_query($conn, $sql_query);
          // mysqli_fetch_assoc returns an associative array that corresponds to the 
          // fetched row or NULL if there are no more rows.
          // Probably does not make much of a difference here, but, e.g., if there are
          // multiple rows returned, you can iterate over those with a loop.

          $curr = '';
          while ($row =  mysqli_fetch_array($result)) {
            $curr .= $row['song'] . " -> " . $row['rating'] . '<br>';
          }
          $out_value = $curr;
        }
        else {
          $out_value = "No rating available!";
        }
      }

        $conn->close();
    ?>

    <div class="page">

    <header><h1>music-db</h1></header>

    <h2>Registration</h2>

    <form class="centered" action="html_sample_2.html">
        <input class="form-elements" type="text" value="Username">
        <br>
        <input class="form-elements" type="email" value="Password">
        <br>
        <input type="hidden" name="hidden-field" value="pass-in-cookie-value-here">
        <input class="form-elements" type="submit" value="Register">
    </form>

    <h2>Retrieve songs by username</h2>

    <form method="GET" action="">
    Username: <input type="text" name="username" placeholder="Enter Username" /><br>
    <input type="submit" name="submit" value="Retrieve"/>
    </form>
    <!-- 
        Make sure that there is a value available for $out_value.
        If so, print to the screen.
    -->
    <p><?php 
        if(!empty($out_value)){
        echo $out_value;
        }
    ?></p>
    </form>
    </body>
</html>
