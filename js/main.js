'use strict';

window.addEventListener("load", function(){

    // Variables del script

    var container_search = document.getElementById("box-search-user"),
        container_user = document.getElementById("box-user"),

        button_search = document.querySelector("#button_search"),

        arrow_button = document.querySelector("#arrow_to_menu"),

        user_name = document.querySelector("#user_name"),
        user_photo = document.getElementById("user_photo"),
        user_desc = document.querySelector("#user_desc"),
        user_location = document.querySelector("#user_location"),
        user_email = document.querySelector("#user_email"),

        repositories = document.querySelector("#repositories"),
        followers = document.querySelector("#followers"),
        following = document.querySelector("#following");

        // Necesario agregar elementos de los repositorios


    // Buscador (Primera pantalla a mostrar)

    button_search.addEventListener("click", function(){

        var input_search = document.querySelector("#input_search").value;

        if(input_search != ''){
            container_search.style.display = "none";
            container_user.style.display = "block";

            var URL_GitHub = "https://api.github.com/users/";

            var UserInfo;

            fetch(URL_GitHub+input_search)
                .then( userdata => userdata.json())
                .then( userdata => UserInfo = userdata)
                .then( () => {

                    // Cambio de datos principales

                    user_name.innerHTML = UserInfo.name;
                    user_photo.src = UserInfo.avatar_url;
                    user_desc.innerHTML = UserInfo.bio;

                    if(UserInfo.location != null){
                        user_location.innerHTML = UserInfo.location;
                    }else{
                        user_location.style.display = 'none';
                    }

                    if(UserInfo.email != null){
                        user_email.innerHTML = UserInfo.email;
                    }else{
                        user_email.style.display = 'none';
                    }

                    // Cambio de datos en las estadisticas

                    repositories.innerHTML = UserInfo.public_repos;
                    followers.innerHTML = UserInfo.followers;
                    following.innerHTML = UserInfo.following;

                    var URL_repos = UserInfo.repos_url;
                    var Repos = new Array();

                    fetch(URL_repos)
                        .then(Repos_info => Repos_info.json())
                        .then(Repos_info => Repos = Repos_info)
                        .then( () =>{

                        
                            Repos.sort(function(a,b){
                                return a.id - b.id;
                            });

                            Repos.reverse();


                            var repository1 = document.getElementById("repository-1"),
                                repository2 = document.getElementById("repository-2"),
                                repository3 = document.getElementById("repository-3");

                            repository1.innerHTML = Repos[0].name;
                            repository2.innerHTML = Repos[1].name;
                            repository3.innerHTML = Repos[2].name;

                            

                    });
                }   
            );
        }
    });



    arrow_button.addEventListener("click", function(){
            container_search.style.display = "block";
            container_user.style.display = "none";
    })

});