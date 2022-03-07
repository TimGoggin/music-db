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

    <form class="centered" action="html_sample_2.html">
        <input class="form-elements" type="text" value="Username">
        <br>
        <input type="hidden" name="hidden-field" value="pass-in-cookie-value-here">
        <input class="form-elements" type="submit" value="Retrieve">
    </form>

    <br>
    <br>
    <br>
        <?php
            $servername = "localhost";
            $username = "root";
            $password = "";

            // Create connection
            // The MySQLi extension was introduced with PHP version 5.0.0 and 
            // the MySQL Native Driver was included in PHP version 5.3.0. i 
            // stands for improved in MySQLi and provides various functions to 
            // access the MySQL database and to manipulate the data records 
            // inside the MySQL database. You would require to call the MySQLi 
            // functions in the same way you call any other PHP function.
            // https://www.tutorialspoint.com/mysqli/index.htm
            $conn = new mysqli($servername, $username, $password);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
            echo "Connected successfully";
            // If the connection to the database is successful, you can now 
            // query your database using MySQL, e.g., with
            // $sql_query = "SELECT * FROM student_table WHERE student_id = *;
            // (assuming you have previously set up a student table with 
            // the student_id attribute))x
        ?>
    </body>
</html>
