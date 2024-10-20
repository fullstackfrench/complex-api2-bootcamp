//User enters word
//User clicks button
//Definition and Artwork related to word appears in DOM

document.querySelector('button').addEventListener('click', getDefinitionAndArtwork)



function getDefinitionAndArtwork() {
    const keyword = document.querySelector('input').value

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`)
            .then(response => response.json())
            .then(data => {
                
                console.log(data)
                console.log(data[0].word)
                document.querySelector('h2').innerText = data[0].word
                console.log(data[0].phonetic)
                document.querySelector('h3').innerText = data[0].phonetic
                console.log(data[0].meanings[0].definitions[0].definition)
                document.querySelector('.definition').innerText = data[0].meanings[0].definitions[0].definition


                fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${data[0].word}`)
                .then(response => response.json())
                .then(dataTwo => {
                console.log(dataTwo.objectIDs[10])
                    
                    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${dataTwo.objectIDs[10]}`)
                    .then(response => response.json())
                    .then(dataThree => {
                    console.log(dataThree)
                    
                    console.log(dataThree.primaryImage)
                    document.querySelector('img').src = dataThree.primaryImage
                    document.querySelector('a').innerText = ''
                    
                    if(dataThree.primaryImage == "") {
                        console.log(dataThree.objectURL)
                        document.querySelector('a').href = dataThree.objectURL
                        document.querySelector('a').innerText = 'See artwork here'
                        document.querySelector('a').setAttribute('target','_blank')
                    }

                    console.log(dataThree.title)
                    document.querySelector('.title').innerText = dataThree.title
                    
                    console.log(dataThree.objectDate)
                    document.querySelector('span').innerText = dataThree.objectDate
                    
                    console.log(dataThree.artistDisplayName)
                    document.querySelector('h4').innerText = dataThree.artistDisplayName
                    
                    
                
                    })
                     .catch(err => {
                    console.log(`error ${err}`)
                    })

                
                })
                .catch(err => {
                console.log(`error ${err}`)
            })
            })
            .catch(err => {
                console.log(`error ${err}`)
            })
        
}
