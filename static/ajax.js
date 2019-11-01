function showWords() {
    var search = document.getElementById("searchQuery").value;
    console.log('Getting words with search query: "' + search + '"');

    if (search != '') {
        search = '?q=' + search;
    }

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var result = JSON.parse(xmlhttp.responseText);

                var html = `<div class="container">`;//<div class="card-deck">`;

                console.log(result);

                for (var i = 0; i < Object.keys(result).length; ++i) {
                    if (i % 4 == 0) {
                        html += '<div class="row">'
                    }

                    var relatedWords = result[i].related_words;
                    var relatedText = '<ul>';
                    for (var j = 0; j < Object.keys(relatedWords).length; ++j) {
                        relatedText += '<li>' + relatedWords[j].word + ' (' + relatedWords[j].lang + ')' + '</li>';
                    }
                    relatedText += '</ul>';

                    html += `<div class="col-lg-3 col-md-2 col-sm-12"><div class="card">
                               <div class="card-body">
                                 <h5 class="card-title">` + result[i].word + `</h5>
                                 <p class="card-text">Language: ` + result[i].lang + `<br><br>
                                  Related Words: ` + relatedText + `</p>
                               </div>
                             </div></div>`;

                    if (i % 5 == 0) {
                        html += '</div>'
                    }
                }

                html += `</div>`;//</div>`;

                document.getElementById("searchResults").innerHTML = html;
                console.log("Success")
            }
            else if (xmlhttp.status == 400) {
                console.log('There was an error 400');
            }
            else {
                console.log('something else other than 200 was returned: ' + xmlhttp.status);
            }
        }
    };
    xmlhttp.open("GET", "/searchWords" + search, true);
    xmlhttp.send();
}