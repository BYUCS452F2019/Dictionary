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

                var html = `<div class="card-deck">`;

                for (var i = 0; i < Object.keys(result).length; ++i) {

                    html += `<div class="card">
                               <div class="card-body">
                                 <h5 class="card-title">` + result[i].word + `</h5>
                                 <p class="card-text">Language: ` + result[i].lang + `</p>
                               </div>
                             </div>
                             `;
                }

                html += `</div>`;

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