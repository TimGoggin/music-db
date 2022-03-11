<!-- 
    COMP 333: Software Engineering
    Nathan Hausspiegel
-->

<!DOCTYPE HTML>

<html lang="en">

<head>

    <meta charset="utf-8">
    {% load static %}
    <link rel="stylesheet" type="text/css" href="{% static 'musicapp/style.css' %}">
    <title>music-db</title>

</head>
 
<body>
    <div class="content">
        <h1>music-db</h1>

        <h2>Retrieve song count by primary genre</h2>

        <form method="GET">
        {% csrf_token %}
        Primary Genre {{form.primary_genre}} <br><br>
        <input type="submit" name="submit" value="Submit"/>
        </form>

        <!-- 
            Make sure that there is a value available for $ratings_out.
            If so, print to the screen.
        -->
        <p>{{ auxtext }}<br>
        </p>
        </form>

        <br>
        <a href="{% url 'index' %}">Home</a>
    </div>
</body>

</html>
