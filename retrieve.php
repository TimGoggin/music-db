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

        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        if(isset($_REQUEST["submit"])){
        // Variables for the output and the web form below.
        $ratings_out = "";
        $s_user = $_REQUEST['username'];

        // Check that the user entered data in the form.
        if(!empty($s_user)){
            // If so, prepare SQL query with the data.
            $sql_query = "SELECT * FROM ratings WHERE username = ('$s_user')";
            // Send the query and obtain the result.
            // mysqli_query performs a query against the database.
            $result = mysqli_query($conn, $sql_query);
            $curr = '';
            while ($row =  mysqli_fetch_array($result)) {
                $curr .= $row['song'] . " -> " . $row['rating'] . '<br>';
            }
            $ratings_out = $curr;
        }
        else {
          $ratings_out = "Please enter a username.";
        }
      }

        $conn->close();
    ?>

    <div class="page">

    <header><h1>music-db</h1></header>

    <h2>Registration</h2>

    <form method="GET" action="">
    <input type="text" name="username" placeholder="Username" /><br>
    <input type="text" name="password" placeholder="Password" /><br>
    <input type="submit" name="submit" value="Register"/>
    </form>

    <h2>Retrieve songs by username</h2>

    <form method="GET" action="">
    Username: <input type="text" name="username" placeholder="Enter Username" /><br>
    <input type="submit" name="submit" value="Retrieve"/>
    </form>

    <!-- 
        Make sure that there is a value available for $ratings_out.
        If so, print to the screen.
    -->
    <p><?php 
        if(!empty($ratings_out)){
        echo $ratings_out;
        }
    ?></p>
    </form>
    </body>
</html>
