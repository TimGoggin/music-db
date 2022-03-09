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

    <form method="GET">
    {% csrf_token %}
    {{form.username.label}} {{form.username}} <br>
    <input type="submit" name="submit" value="Retrieve"/>
    </form>

    <!-- 
        Make sure that there is a value available for $ratings_out.
        If so, print to the screen.
    -->
    <p>{{ auxtext }}<br>
        {% for rate in ratings %}
        <li>{{rate.song.song}} -- {{rate.rating}}</li>
        {% endfor %}
    </p>
    </form>

    <br>
    <a href="{% url 'index' %}">Home</a>
</body>

</html>
