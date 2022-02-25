# music-db
hw2

1. Create a new database named "music-db" in myPHPadmin
2. Create a new table named "users" with 2 columns
3. Set the first key as "Username," with type "VARCHAR," length "255," and the second as "Password" with the same type
4. Hover over "more" and designate "Username" as the primary key

5. Navigate to the SQL tab and input data by submitting the following lines of code:
INSERT INTO users VALUES("Amelia-Earhart","Youaom139&yu7")
INSERT INTO users VALUES("Otto","StarWars2*")
6. Create a new table named "ratings"

7. Add the following four columns to it:
- "id", type "INT", length 1, index set to "PRIMARY", AI set to "true"
- "username", type "VARCHAR", length 255
- "song", type "VARCHAR", length 255
- "rating", type "INT", length 1

8. Next to both "song" and "username", select "INDEX" under the "More" dropdown menu

9. Input data using the following lines of code:
INSERT INTO ratings VALUES(1,"Amelia-Earhart","Freeway",3);
INSERT INTO ratings VALUES(2,"Amelia-Earhart","Days of Wine and Roses",4);
INSERT INTO ratings VALUES(3,"Otto","Days of Wine and Roses",5);
INSERT INTO ratings VALUES(4,"Amelia-Earhart","These Walls",4);

10. Move to the "Relation View" of the previous table and add a new constraint named "username_constraint." Set the actions for "ON DELETE" and "ON UPDATE" to "CASCADE."
Then, set the first column to "username", and input "music-db" as the database, "users" as the table, "and Username" as the Foreign key constraint column.
10. Create a new table named "artists," add columns "song", type "VARCHAR", length 255, and "artist" with the same type and length. Set the index of "song" to "PRIMARY"
11. Go to the Relation View of the artists table and add a new constraint called "song_constraint," with both actions set to "CASCADE" and the parameters set, in order, to "song", "music-db", "ratings", "song"

12. Populate "artists" using the following lines of code:
INSERT INTO artists VALUES("Freeway", "Aimee Mann");
INSERT INTO artists VALUES("Days of Wine and Roses","Bill Evans");
INSERT INTO artists VALUES ("These Walls", "Kendrick Lamar");