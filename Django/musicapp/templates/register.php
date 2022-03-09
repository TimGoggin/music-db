<!DOCTYPE HTML>

<html lang="en">

<head>

    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">

    <title>music-db</title>

</head>

    <div class="content">

        <h1>music-db</h1>

        <h2>Registration</h2>

        <form method="POST">
        {% csrf_token %}
        {{ form.username.label }} {{ form.username }}<br>
        {{ form.password.label }} {{ form.password }}<br>
        <input type="submit" name="register" value="Register"/>
        </form>

        <!-- 
            Make sure that there is a value available for $ratings_out.
            If so, print to the screen.
        -->
        <p>{{submittext}}</p>
        <br>
        <a href="index.html">Home</a>

    </div>
    
</body>

</html>