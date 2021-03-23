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

    // polarity checker
    const polarity = (score) => {
        let result
        switch (score){
            case 'P+':
                result = 'strong positive';
                break;
            case 'P':
                result = 'positive';
                break;
            case 'NEW':
                result = 'neutral';
                break;
            case 'N':
                result = 'negative';
                break;
            case 'N+':
                result = 'strong negative';
                break;
            case 'NONE':
                result = 'no sentiment';
        }
        return result.toUpperCase();
    }

    // check what text was put into the form field
    let userUrl = document.getElementById('url').value
    
    if (isURL(userUrl)) {
        reqApi('http://localhost:8080/api', {url: userUrl})
        .then(data => {
            console.log(data)
            // display data into html
            document.getElementById('polarity').innerHTML = 'Polarity: '+polarity(data.score_tag)
            document.getElementById("agreement").innerHTML = `Agreement: ${data.agreement}`
            document.getElementById("subjectivity").innerHTML = `Subjectivity: ${data.subjectivity}`
            document.getElementById("confidence").innerHTML = `Confidence: ${data.confidence}`
            document.getElementById("irony").innerHTML = `Irony: ${data.irony}`
        })
        .catch(err => {
            console.log(err)
        })
    } else {
        alert("Insert correct url")
    }
}

export { handleSubmit }
