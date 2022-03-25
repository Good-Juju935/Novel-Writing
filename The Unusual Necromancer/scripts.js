var currentPage = 1;
var minPage = 1;
var maxPage = 1;

var cPath = ''

window.onload = function() {
    read_file()
    for (i = 1; i <= maxPage ;i++) {
        console.log(i)
        document.getElementById("pagesDrop").innerHTML += "<li><a class=\"dropdown-item\" onclick=\"rf(" + i + ")\">" + i + "</a></li>"
    }
};

function rf(sPage) {
    currentPage = sPage;
    read_file();
}

function read_file() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", get_current_page(currentPage), false)
    rawFile.onload = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
                var splitText = allText.split("\n");
                splitText[0] = "<H1>" + splitText[0] + "</H1>";
                for (i = 1; i < splitText.length; i++) {
                    splitText[i] = "<p>" + splitText[i] + "</p>";
                    splitText[i] = splitText[i].replace(/\r/g,'')
                    splitText[i] = splitText[i].replace(/`/g,'')
                }
                var out = splitText.join('')
                console.log(splitText)
                document.getElementById('Story-Content').innerHTML = out;
            }
        }
    }
    rawFile.send(null);
}

function get_current_page(cPage) {
    let thePath = 'chapters/c';
    thePath += cPage + '.txt';
    return thePath
}

function page_up() {
    if (currentPage < maxPage) {
        currentPage++;
    }
    read_file()
}

function page_down() {
    if (currentPage > minPage) {
        currentPage--;
    }
    read_file()
}