
//URL 
const root = "https://images-api.nasa.gov";
const endpointSearch = "/search";

//FORM SECTION
const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS SECTION
const section = document.querySelector('section');

//Asigning Event Listeners
searchForm.addEventListener('submit', fetchResults); //When the form is submited calls the function fetchResults

//FETCH FUNCTION
function fetchResults(e){
    e.preventDefault();
    url = root + endpointSearch + '?q=' + searchTerm.value;
    fetch(url)
    .then(function(result) {
        return result.json();        
    }).then(function(json) {
        displayPictures(json);    
    })    
}

//DISPLAY PICTURES FUNCTION
function displayPictures(json) {
    let articles = json.collection.items;
    
    while (section.firstChild) {
        section.removeChild(section.firstChild);  
    }

    if (articles.length === 0) {
        console.log("No Results");        
    } else {
        for(i=0; i<articles.length; i++) {
        let article = document.createElement('article');
        let imgcontainer = document.createElement('div');
        let img = document.createElement('img');
        let txtcontainer =document.createElement('div');
        let heading = document.createElement('h3');
        /*let link = document.createElement('a');*/        
        let para = document.createElement('p');
        let clearfix = document.createElement('div');

        let current = articles[i];
        console.log('Current:', current);
        
        /*link.href = current.href;*/     
        /*link.textContent = current.data[0].description;*/
        heading.textContent = current.data[0].description;
        
        if(current.data.length > 0) {
            img.src = current.links[0].href;
            //console.log()
            img.alt = current.data[0].description;
        }

        imgcontainer.setAttribute('class', 'imgcontainer');
        txtcontainer.setAttribute('class', 'txtcontainer');
        clearfix.setAttribute('class','clearfix');

        section.appendChild(article);
        article.appendChild(imgcontainer)
        imgcontainer.appendChild(img);
        article.appendChild(txtcontainer);  
        txtcontainer.appendChild(heading);
        /*heading.appendChild(link);  */     
        txtcontainer.appendChild(para);
        article.appendChild(clearfix)
        }
    }
};