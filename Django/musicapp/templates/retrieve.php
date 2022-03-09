<!-- 
    COMP 333: Software Engineering
    Nathan Hausspiegel
-->

<!DOCTYPE HTML>

<html lang="en">

<head>

    <meta charset="utf-8">

    <title>music-db</title>
    <h1>music-db</h1>

</head>
 
<body>
    <h2>Retrieve songs by username</h2>

    <form method="GET" action="{% url 'results' %}">
    Username: <input type="text" name="username" placeholder="Enter Username" /><br>
    <input type="submit" name="submit" value="Retrieve"/>
    </form>

    <!-- 
        Make sure that there is a value available for $ratings_out.
        If so, print to the screen.
    -->
    <p>{{ ratings }}</p>
    </form>

    <br>
    <a href="{% url 'index' %}">Home</a>
</body>

</html>
