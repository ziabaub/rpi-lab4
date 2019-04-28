//listen to the document and start work when is ready
let url = "https://newsapi.org/v2/top-headlines?q=it&country=us&category=business&apiKey=261f191c064f425baafde212648635d8";
let count = 0;

$(document).ready(function () {

    $("#getMore").hide();
    getData(url,false);

    $("#getMore").on("click",function (e) {
        e.preventDefault();
        getData(url,false);
    });

    $("#searchBtn").on("click", function (e) {
        e.preventDefault();// try do not show the user that we reload the page
        count=0;
        let query = $("#searchquery").val(); // get info from input text field
        url = "https://newsapi.org/v2/top-headlines?q=" + query + "&country=us&category=business&apiKey=261f191c064f425baafde212648635d8";
        //console.log(url);
        if (query !== "") {
            getData(url, true);
        } else {
            M.toast({ // framework
                html: "input can't be empty",
                classes: 'red'
            });
        }
    });

});

function getData(url) {
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",

        beforeSend: function () {
            $("#loader").show();
        },

        complete: function () {
            $("#loader").hide();
            $("#getMore").show();
        },
        success: function (data) {

            let latestNews = data.articles;
            let output = "";
                output = printFive(latestNews);
            if (output !== "") {

                $("#newsResults").html(output);
                M.toast({ // framework
                    html: "here we go !!!",
                    classes: 'green'
                });

            } else {
                $("#newsResults").html("");
                M.toast({ // framework
                    html: "This news isn't available",
                    classes: 'red'
                });
            }
        },

        error: function () {
            $("#newsResults").html("");
            M.toast({ // framework
                html: "error found ",
                classes: 'red'
            });
        }

    })


}



function print(latestNews) {

    let output = "";
    for (let i in latestNews) {// i ude `` so do not need to always concatenate string ++

        output += `
                        <h4 style=" width: 800px ; text-align: justify">${latestNews[i].title}</h4>
                        <img src="${latestNews[i].urlToImage}"  class="responsive-img">
                        <p style=" width: 600px ; text-align: justify">${latestNews[i].description}</p>
                        <p style=" width: 600px ; text-align: justify">${latestNews[i].content}</p>
                        <p>Published on : ${latestNews[i].publishedAt}</p>
                        <a href="${latestNews[i].url}" class="btn">Read more</a>
                        `;
    }
    return output;
}

function printFive(latestNews) {
    count+=5;
    let output = "";
    for (let i in latestNews) {// i ude `` so do not need to always concatenate string ++
        output += `
                        <h4 style=" width: 800px ; text-align: justify">${latestNews[i].title}</h4>
                        <img src="${latestNews[i].urlToImage}"  class="responsive-img">
                        <p style=" width: 600px ; text-align: justify">${latestNews[i].description}</p>
                        <p style=" width: 600px ; text-align: justify">${latestNews[i].content}</p>
                        <p>Published on : ${latestNews[i].publishedAt}</p>
                        <a href="${latestNews[i].url}" class="btn">Read more</a>
                        `;
        if (i >= count-1) {
            break;
        }
        if (count===19){
            count=0;
        }
    }
    return output;
}