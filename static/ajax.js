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

                var html = "";

                for (var i = 0; i < Object.keys(result).length; ++i) {

                    html += `<div class="card">
                            <div class="card-header">
                                <a onclick="showRelatedWords(` + result[i].word_id + `)"data-toggle="collapse" href="#collapse` + result[i].word_id + `">
                                ` + result[i].word + `
                                </a>
                            </div>
                            <div id="collapse` + result[i].word_id + `" class="collapse">
                                <div class="card-block">
                                    Definition: ` + result[i].definition + `<br>
                                    Language: ` + result[i].lang + `<br>
                                    <div id="wordBlock` + result[i].word_id + `">
                                </div>
                            </div>
                        </div>
                        `;
                }

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

function showRelatedWords(id) {
    if (id == null || id == undefined) {
        return; // Exit early if no id is passed
    }

    console.log('Getting related words with word id: "' + id + '"');

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var result = JSON.parse(xmlhttp.responseText);

                var html = "Related Words: ";

                for (var i = 0; i < Object.keys(result).length; ++i) {
                    if (i != 0) {
                        html += ', ';
                    }

                    html += result[i].word + ' (' + result[i].lang + ')';
                }

                document.getElementById("wordBlock" + id).innerHTML = html;
            }
            else if (xmlhttp.status == 400) {
                console.log('There was an error 400');
            }
            else {
                console.log('something else other than 200 was returned: ' + xmlhttp.status);
            }
        }
    };
    xmlhttp.open("GET", "/getRelatedWOrds?wordId=" + id, true);
    xmlhttp.send();
}