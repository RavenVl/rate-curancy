window.onload = function (e) {
    httpGet("input.php")
        .then(
            response => {
                //alert(`Fulfilled: ${response}`);
                let listVal = document.querySelector('#curancy');
                for (let obj of JSON.parse(response)) {
                    let option = new Option(obj['0'], obj['0']);
                    listVal.appendChild(option);
                }

            }
        )
        .catch(error => alert(`Rejected: ${error}`));
    let but = document.querySelector('button');
    but.onclick=doQuery;
    return false;
};
    //var option = new Option("Текст", "value");

function httpGet(url, data) {

    return new Promise(function(resolve, reject) {

        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };


        xhr.send(data);
    });

}
function doQuery() {
    let paramData = document.querySelector('#data').value.split('-');
    let paramCur = document.querySelector('#curancy').value;
    paramData = paramData.reverse();
    paramData = paramData.join('.');
    //2017-07-05
    //01.07.2017
    let param = `data=${paramData}&cur=${paramCur}`;
    httpGet("input.php", param)
        .then(
            response => {
                //alert(`Fulfilled: ${response}`);
                document.querySelector('#curs').value = response;
            }
        )
        .catch(error => alert(`Rejected: ${error}`));
    return false;
}



