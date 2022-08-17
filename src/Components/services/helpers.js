/*
************************************************************************************
    Functions that arrange the information in the format needed by the application.
************************************************************************************
*/



// Groups tweets by News Source (author)
export function groupAuthors(userTweets){
    let countTweetsByAuthor = [];
    userTweets.forEach(element => {
        
        if(!countTweetsByAuthor.some(item => item.username == null || element.author.username === item.username )){
            
            let newObj = {
                username: element.author.username,
                author_id: element.author.id,
                avatar : element.author.avatar,
                isVerified: element.author.isVerified,
                num_links: 1,
                num_followers : element.author.numberOfFollowers
            }
            countTweetsByAuthor.push(newObj)
        } else{
            let objIndex = countTweetsByAuthor.findIndex(i => i.username === element.author.username);
            countTweetsByAuthor[objIndex].num_links++;
        }
        
    });

    return countTweetsByAuthor;
}

// Groups tweets by News Source (author) and counts the amount of tweets by each of the News Sources.
export function groupAuthorsURLs(userTweets){
    let countTweetsByAuthor = [];
    userTweets.forEach(element => {
        
        if(!countTweetsByAuthor.some(item => item.username == null || element.author.username === item.username )){
            
            let newObj = {
                username: element.author.username,
                author_id: element.author.id,
                avatar : element.author.avatar,
                isVerified: element.author.isVerified,
                num_links: 1,
                num_followers : element.author.numberOfFollowers,
                bio : element.author.bio,
                urls : [
                    {
                       url : element.url,   
                       date : element.createdAt,   
                       title: element.text,    
                       no_likes : element.likes,
                       no_retweets: element.retweets
                   },
                ]
            }
            countTweetsByAuthor.push(newObj);
        } else{
            let objIndex = countTweetsByAuthor.findIndex(i => i.username === element.author.username);
            let newURL = {
                url : element.url,   
                date : element.createdAt,   
                title: element.text,    
                no_likes : element.likes,
                no_retweets: element.retweets
            };
            countTweetsByAuthor[objIndex].num_links++;
            countTweetsByAuthor[objIndex].urls.push(newURL);
        }
        
        
    });

    return countTweetsByAuthor;
}

// Sorts News Sources by the amount of tweets collected
export function orderById(orderBy, option){
    
    if(option === "asc"){
        return function sorting(a,b){
            let new_a = 0;
            let new_b = 0;
            if(orderBy === 'totalNumberOfTweets' || orderBy === 'numberOfTweetsByUser'){
                new_a = parseInt(a[orderBy]);
                new_b = parseInt(b[orderBy]);
            }else{
                new_a = a[orderBy];
                new_b = b[orderBy]
            }

            if (new_b < new_a) {
                return 1;
            }
            if (new_b > new_a) {
                return -1;
            }
            return 0;
    
        }

    } else if (option === "desc"){
        return function sorting(a,b){
            let new_a = 0;
            let new_b = 0;
            if(orderBy === 'totalNumberOfTweets' || orderBy === 'numberOfTweetsByUser'){
                new_a = parseInt(a[orderBy]);
                new_b = parseInt(b[orderBy]);
            }else{
                new_a = a[orderBy];
                new_b = b[orderBy]
            }

            if (new_b < new_a) {
                return -1;
            }
            if (new_b > new_a) {
                return 1;
            }
            return 0;
    
        }

    }
    
   
}

// Sorts News Sources by the specific properties
export function sortByProperty(data){
    // BBC News: 3080
    let sortable = [];
    for (var i in data) {
        sortable.push([i, data[i]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    return sortable;
    
}

// Adds format to the number of account followers for display (1000000 -> 1M)
export function formatNumberFollowers(followers, digits){
    const digitSymbol = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
      ];
      const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var item = digitSymbol.slice().reverse().find(function(item) {
        return followers >= item.value;
      });
      return item ? (followers / item.value).toFixed(digits).replace(regex, "$1") + item.symbol : "0";

}

// Adds format to the number of account followers for display (1000000 -> 1,000,000)
export function addWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Cleans image name for better resolution on icons
export function imageLookup(name){
   const list_names = ["abc",
                        "wsj",
                        "washingtonpost",
                        "thetimes",
                        "time",
                        "nytimes",
                        "reforma",
                        "nbcnews",
                        "milenio",
                        "foxnews",
                        "forbes",
                        "euronews",
                        "el_universal_mx",
                        "dwnews",
                        "cnnbrk",
                        "cnn",
                        "cbsnews",
                        "bbcworld",
                        "bbcbreaking",
                        "aristeguionline",
                        "excelsior",
                        "fox2now",
                        "guardian",
                        "guardiannews",
                        "theeconomist",
                        "welt",
                        "ddmexico",
                        "lajornadaonline",
                        "eldebate"
                        ];

    return list_names.includes(name.toLowerCase());

}

export function imageURLClean(url){
    const new_url = url.replace('_normal','');
    return new_url;
 
}


// Groups data with subcategories for bar graphs in Global and Profile Stats 
export function arrangeDataGraph(dataNews, dataReactions){
    let allCounts = [];

    for (let i in dataNews){
        if(dataNews[i].num_links>1){
            let newObj = {
                Name: dataNews[i].username,
                Tweets: dataNews[i].num_links,
                Likes: 0,
                Retweets: 0
             }   
        allCounts.push(newObj);
        }

    };  

    dataReactions.reactions.likes.forEach(element => {
        if(allCounts.some(item => item.Name === element.source_username)){
            let index = allCounts.findIndex(x => x.Name === element.source_username);
            allCounts[index].Likes=element.amount;
        }
        else{
            let newObj = {
                Name: element.source_username,
                Tweets: 0,
                Likes: element.amount,
                Retweets: 0
            }
            allCounts.push(newObj);
        }
        
    });

    dataReactions.reactions.retweets.forEach(element => {
        if(allCounts.some(item => item.Name === element.source_username)){
            let index = allCounts.findIndex(x => x.Name === element.source_username);
            allCounts[index].Retweets=element.amount;
        }
        else{
            let newObj = {
                Name: element.source_username,
                Tweets: 0,
                Likes: element.amount,
                Retweets: 0
            }
            allCounts.push(newObj);
        }
        
    });

    return allCounts;

}

// Counts amount of reactions (likes and retweets) grouped by News Source (author) 
export function countOcurrences(usersReactions, userReactionsGlobal, select){
    let property = select === 0 ? usersReactions.reactions.likes : usersReactions.reactions.retweets;
    let property2 = select === 0 ? userReactionsGlobal.reactions.likes : userReactionsGlobal.reactions.retweets;
    
    var countsExtended = property.map(k => {
        return {    Name: k.source_username,
                    Global: 0,
                    Personal: k.amount }
    });

    
    property2.forEach(user => {
        user.forEach(element => {
        
            if(countsExtended.some(item => item.Name.toLowerCase() === element.source_username.toLowerCase())){
                let index = countsExtended.findIndex(x => x.Name === element.source_username);
               
                countsExtended[index].Global+=element.amount;
            }
            else{
              
                let newObj = {
                    Name: element.source_username,
                    Global: element.amount,
                    Personal: 0
                }
                countsExtended.push(newObj);
            }
            
        });

    });
      

    return countsExtended; 
}

// Groups data with subcategories for pie chart in Top News Sources graph view
export function arrangePieGraph(data){
    let list = [];
    for (let i in data){
        if(data[i].num_links>1){
            let newObj = {
                id: data[i].username,
                label: data[i].username,
                value: data[i].num_links
            }
            list.push(newObj);
        }else{
            if(!list.some(item => item.id === '*Others')){
                let newOthers = {
                    id: '*Others',
                    label: '*Others',
                    value: 1
                }
                list.push(newOthers);

            }else{
                let index = list.findIndex(x => x.id === '*Others');
                list[index].value++;

            }


        }
        
    }
   
    return list;

}

// Counts global amount of tweets by News Source (author) 
export function getGlobalLinks(globalData){
    let countsLinks = [];
   
    globalData.forEach(element => {
        for (let i in element.grouped_stats){
            if (countsLinks[element.grouped_stats[i].source_name]) {
                countsLinks[element.grouped_stats[i].source_name] += element.grouped_stats[i].num_links;
            } else {
                countsLinks[element.grouped_stats[i].source_name] = element.grouped_stats[i].num_links;
            }
        }
        
    });
    return countsLinks;

}


