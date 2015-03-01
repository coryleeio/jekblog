    function generateRandomPosts()
    {
        $.getJSON("/json/search.json", function(data) {
            var postsCount = data.length;
            var posts = data;
            var randomIndexUsed = [];
            var counter = 0;
            var numberOfPosts = 5;
            var divRandomPosts = $("#random_posts");

            divRandomPosts.append('<h2><b>Other Posts</b></h2>');
            var currentTitle = $('#title').text();
            while (counter < numberOfPosts && counter < postsCount)
            {
                var randomIndex = Math.floor(Math.random() * postsCount);
                var postTitle = posts[randomIndex].title;
                if (randomIndexUsed.indexOf(randomIndex) == "-1" && postTitle != currentTitle)
                {
                    var postHREF = posts[randomIndex].href;


                    if (counter == (numberOfPosts - 1))
                    {
                        divRandomPosts.append('<p><a href="' + postHREF + '">' + postTitle + '</a></p>');
                    }
                    else
                    {
                        divRandomPosts.append('<p><a href="' + postHREF + '">' + postTitle + '</a></p>');
                    }

                    randomIndexUsed.push(randomIndex);

                    counter++;
                }
            }
        });
    }

    $(document).ready(function() {
        generateRandomPosts();
    });
