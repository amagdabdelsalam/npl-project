function handleSubmit(event) {
    event.preventDefault()

    // check if the input value valid url
    const isURL = (inputURL) => {
        let valid = inputURL.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
        if(valid == null) {
            return false
        } else{
            return true
        }
    }

    // request the data from the serverside
    const reqApi = async (url = "", data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        try {
            const newData = await response.json()
            return newData
        } catch (err) {
            console.log('error', err)
        }
    }

    // check what text was put into the form field
    let userUrl = document.getElementById('url').value
    
    if (isURL(userUrl)) {
        reqApi('http://localhost:8080/api', {url: userUrl})
        .then(data => {
            console.log(data)
            // display data into html
            document.getElementById('polarity').innerHTML = data.score_tag
            document.getElementById("agreement").innerHTML = data.agreement
            document.getElementById("subjectivity").innerHTML = data.subjectivity
            document.getElementById("confidence").innerHTML = data.confidence
            document.getElementById("irony").innerHTML = data.irony
        })
        .catch(err => {
            console.log(err)
        })
    } else {
        alert("Insert correct url")
    }
}

export { handleSubmit }
