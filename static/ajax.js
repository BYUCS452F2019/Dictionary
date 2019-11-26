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

                            if (count % 4 === 0) {
                                if (count != 0) {
                                    html += '</div>'
                                }

                                html += '<div class="card-deck" style="margin-top:10px">';
                            }

                            html += `
                                      <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">` + currentWord + `</h5>
                                            <p class="card-text">Language: ` + currentLanguage + related + `</p>
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

                    if (count % 4 === 0) {

                        if (count != 0) {
                            html += '</div>';
                        }
                        html += '<div class="card-deck">';
                    }

                    html += `
                                      <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">` + currentWord + `</h5>
                                            <p class="card-text">Language: ` + currentLanguage + related + `</p>
                                        </div>
                                      </div><div>`;

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