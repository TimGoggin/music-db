<!-- 
    COMP 333: Software Engineering
    Nathan Hausspiegel
-->

<!DOCTYPE HTML>

<html lang="en">

<head>

    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">

    <title>music-db</title>

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

        if(isset($_REQUEST["register"])){
            // Variables for the output and the web form below.
            $issue = "";
            $user_status = "";
            $username = $_REQUEST['username'];
            $password = $_REQUEST['password'];

            // Check that the user entered data in the form.

            if(empty($username)) {
                $issue .= "Please enter a username. <br>";
            }

            if(empty($password)) {
                $issue .= "Please enter a password. <br>";
            }

            if(empty($issue)) {
                // If so, prepare SQL query with the data.
                $user_query = "SELECT * FROM ratings WHERE username = ('$username')";
                // Send the query and obtain the result.
                // mysqli_query performs a query against the database.
                $result = mysqli_query($conn, $user_query);
                $user =  mysqli_fetch_assoc($result);

                if ($user) {
                    if ($user['username'] === $username) {
                        $user_status .= "This username already exists! <br>";
                    }
                }
                
                if(empty($user_status)) {
                    $register_query = "INSERT INTO users (Username, Password) 
                                       VALUES('$username', '$password')";
                    $result = mysqli_query($conn, $register_query);
                    $user_status .= "Successfully registered! <br>";
                }
            }
        }

        $conn->close();
    ?>

    <div class="content">

        <h1>music-db</h1>

        <h2>Registration</h2>

        <form method="GET" action="">
        <input type="text" name="username" placeholder="Username" /><br>
        <input type="text" name="password" placeholder="Password" /><br>
        <input type="submit" name="register" value="Register"/>
        </form>

        <p><?php 
            if(!empty($issue)){
                echo $issue;
            }
            if(!empty($user_status)){
                echo $user_status;
            }
        ?></p>
        </form>

        <br>
        <a href="index.html">Home</a>

    </div>
    
</body>

</html>