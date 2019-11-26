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

                var html = ``;

                console.log(result);

                var currentWord;
                var currentLanguage;
                var relatedText = '';
                var wordsExist = false;

                var count = 0;

                for (var i = 0; i < Object.keys(result).length; ++i) {

                    // if (result[i]._fields[0].properties.name == result[i]._fields[1].properties.name) {
                    //     continue;
                    // }

                    if (currentWord != result[i]._fields[0].properties.name) {
                        console.log('In main if:');
                        console.log('currentWord=' + currentWord);
                        console.log('nextWord=' + result[i]._fields[0].properties.name);
                        if (wordsExist) {
                            var related;
                            if (relatedText) {
                                related = '<br>Related words: <ul>' + relatedText + '<ul>'
                            }
                            else {
                                related = '';
                            }

                            console.log("related=" + related);

                            if (count % 5 === 0) {
                                if (count != 0) {
                                    html += '</div>'
                                }

                                html += '<div class="card-deck" style="margin-top:10px">';
                            }

                            html += `
                                      <div class="card">
                                        <div class="card-header">
                                            <h5 class="card-title">` + currentWord + `<div class="float-sm-right"><a style="cursor:pointer" onclick="deleteWord('` + currentWord + `')"><i class="far fa-trash-alt fa-sm"></i></a></div></h5>
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text">Language: ` + currentLanguage + related +
                                `</p>
                                        </div>
                                        <div class="card-footer">
                                            <a href=# class="btn btn-sm btn-success" onclick="addAndShow('` + currentWord + `')">Add related word</a>
                                        </div>
                                      </div>`;

                            count++;
                            relatedText = '';
                        }

                        wordsExist = true;
                        currentWord = result[i]._fields[0].properties.name;
                        currentLanguage = result[i]._fields[0].properties.language;
                    }

                    var relatedWord = result[i]._fields[1].properties.name;
                    var relatedLanguage = result[i]._fields[1].properties.language;

                    if (currentWord && currentWord != relatedWord) {
                        relatedText += '<li>' + relatedWord + ' (' + relatedLanguage + `) <div class="float-sm-right"><a style="cursor:pointer" onclick="deleteRelatedWord('` + currentWord + `', '` + relatedWord + `')"><i class="far fa-trash-alt fa-sm"></i></a></div>` + '</li>';
                        console.log("relatedText=" + relatedText);
                    }

                }

                // Add the last cards element if there has been at least one word added
                if (wordsExist) {
                    var related;
                    if (relatedText) {
                        related = '<br>Related words: <ul>' + relatedText + '<ul>'
                    }
                    else {
                        related = '';
                    }

                    console.log("related=" + related);

                    if (count % 5 === 0) {
                        if (count != 0) {
                            html += '</div>'
                        }

                        html += '<div class="card-deck" style="margin-top:10px">';
                    }

                    html += `
                                      <div class="card">
                                        <div class="card-header">
                                            <h5 class="card-title">` + currentWord + `<div class="float-sm-right"><a style="cursor:pointer" onclick="deleteWord('` + currentWord + `')"><i class="far fa-trash-alt fa-sm"></i></a></div></h5>
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text">Language: ` + currentLanguage + related +
                        `</p>
                                        </div>
                                        <div class="card-footer">
                                            <a href=# class="btn btn-sm btn-success" onclick="addAndShow('` + currentWord + `')">Add related word</a>
                                        </div>
                                      </div>`;

                    count++;
                    relatedText = '';
                }

                html += ``;

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

function showWordsAddRelated() {
    var search = document.getElementById("searchQueryRelated").value;
    console.log('Getting words with search query: "' + search + '"');

    if (search != '') {
        search = '?q=' + search;
    }

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var result = JSON.parse(xmlhttp.responseText);

                var html = ``;

                console.log(result);

                var currentWord;
                var currentLanguage;
                var relatedText = '';
                var wordsExist = false;

                var count = 0;

                for (var i = 0; i < Object.keys(result).length; ++i) {

                    // if (result[i]._fields[0].properties.name == result[i]._fields[1].properties.name) {
                    //     continue;
                    // }

                    if (currentWord != result[i]._fields[0].properties.name) {
                        console.log('In main if:');
                        console.log('currentWord=' + currentWord);
                        console.log('nextWord=' + result[i]._fields[0].properties.name);
                        if (wordsExist) {
                            var related;
                            if (relatedText) {
                                related = '<br>Related words: <ul>' + relatedText + '<ul>'
                            }
                            else {
                                related = '';
                            }

                            console.log("related=" + related);

                            if (count % 1 === 0) {
                                if (count != 0) {
                                    html += '</div>'
                                }

                                html += '<div class="card-deck" style="margin-top:10px">';
                            }

                            html += `
                                      <div class="card">
                                        <div class="card-header">
                                            <h5 class="card-title">` + currentWord + `</h5>
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text">Language: ` + currentLanguage + related +
                                `</p>
                                        </div>
                                        <div class="card-footer">
                                            <a href=# class="btn btn-sm btn-success">Add related word</a>
                                        </div>
                                      </div>`;

                            count++;
                            relatedText = '';
                        }

                        wordsExist = true;
                        currentWord = result[i]._fields[0].properties.name;
                        currentLanguage = result[i]._fields[0].properties.language;
                    }

                    var relatedWord = result[i]._fields[1].properties.name;
                    var relatedLanguage = result[i]._fields[1].properties.language;

                    if (currentWord && currentWord != relatedWord) {
                        relatedText += '<li>' + relatedWord + ' (' + relatedLanguage + ')' + '</li>';
                        console.log("relatedText=" + relatedText);
                    }

                }

                // Add the last cards element if there has been at least one word added
                if (wordsExist) {
                    var related;
                    if (relatedText) {
                        related = '<br>Related words: <ul>' + relatedText + '<ul>'
                    }
                    else {
                        related = '';
                    }

                    console.log("related=" + related);

                    if (count % 1 === 0) {
                        if (count != 0) {
                            html += '</div>'
                        }

                        html += '<div class="card-deck" style="margin-top:10px">';
                    }

                    html += `
                                      <div class="card">
                                        <div class="card-header">
                                            <h5 class="card-title">` + currentWord + `</h5>
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text">Language: ` + currentLanguage + related +
                        `</p>
                                        </div>
                                        <div class="card-footer">
                                            <a href=# class="btn btn-sm btn-success" onclick="addRelatedWord('`+ currentWord + `')">Select related word</a>
                                        </div>
                                      </div>`;

                    count++;
                    relatedText = '';
                }

                html += ``;

                document.getElementById("searchResultsRelated").innerHTML = html;
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

function addWord() {
    var word = document.getElementById("wordName").value;
    var lang = document.getElementById("wordLanguage").value;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                // Dismiss modal and show updated words
                $('#addWord').modal('toggle');
                showWords()

                document.getElementById("wordName").value = "";
                document.getElementById("wordLanguage").value = "";
            }
            else {
                // Place error text on screen
                document.getElementById("addWordError").innerHTML = "The word could not be added";
                console.log('something else other than 200 was returned: ' + xmlhttp.status);
            }
        }
    };
    xmlhttp.open("POST", "/addWord", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("word=" + word + "&language=" + lang);
}

function addRelatedWord(toWord) {
    var fromWord = document.getElementById("relatedFromWord").value;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                // Dismiss modal and show updated words
                $('#addRelatedWord').modal('toggle');
                showWords()

                document.getElementById("searchQueryRelated").value = "";
                document.getElementById("searchResultsRelated").innerHTML = "";
            }
            else {
                // Place error text on screen
                document.getElementById("addRelatedWordError").innerHTML = "The related word could not be added";
                console.log('something else other than 200 was returned: ' + xmlhttp.status);
            }
        }
    };
    xmlhttp.open("POST", "/addRelatedWord", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("from_word=" + fromWord + "&to_word=" + toWord);
}

function addAndShow(fromWord) {
    document.getElementById("relatedFromWord").value = fromWord;
    $('#addRelatedWord').modal('show')
}

function deleteWord(word) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                // Dismiss modal and show updated words
                showWords()
            }
            else {
                // Place error text on screen
                console.log('something else other than 200 was returned: ' + xmlhttp.status);
            }
        }
    };
    xmlhttp.open("DELETE", "/deleteWord", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("word=" + word);
}

function deleteRelatedWord(fromWord, toWord) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                // Dismiss modal and show updated words
                showWords()
            }
            else {
                // Place error text on screen
                console.log('something else other than 200 was returned: ' + xmlhttp.status);
            }
        }
    };
    xmlhttp.open("DELETE", "/deleteRelatedWord", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("from_word=" + fromWord + "&to_word=" + toWord);
}