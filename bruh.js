const fetch = require('node-fetch');
const prompt = require('prompt');

function take_input(){
    prompt.get(['github_auth', 'discord_auth'], function (err, result) {
        if (err) { return onErr(err); }
        console.log('Command-line input received:');
    load(result.github_auth,result.discord_auth)
    });
    
}
async function load(g,d)
{
    github_auth = g;
    discord_auth = d;
  let response = await fetch('https://api.github.com/user/repos',{
    method: 'POST',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
        'Authorization': `token ${github_auth}`,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        "name": discord_auth,
        "description": discord_auth,
        "private": false,
        "visibility": 'public',
        "auto_init": true,
    })
  })

  let data = await response.json();

  if(response.status==201){
      repo_name = data['full_name']
      console.log(`Created repo ${repo_name}`)

      var delete_repo = await fetch(`https://api.github.com/repos/${repo_name}`,{
        method: 'DELETE',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
            'Authorization': `token ${github_auth}`,
            'Accept': 'application/vnd.github.v3+json'
        }})
        if(delete_repo.status == 204){
            console.log(`Deleted repo ${repo_name}`)
            console.log(`Done!`)
        }
}
}

console.log(`%c                                .**,**,,...                                     
                               ,.,*,.*. ,,...                                   
                              .../,.....,. ...                                  
                             ..**,,,,,,, .,....                                 
                             ..%,,,...,,,..,....                                
                             .*%,&*&/,,/*/*..,...                               
                             .*&*,,,.,,*,,**,....                               
                            ..,(%**,,*,*,,*/,...,.                              
                           ...,/%&******/**&*.....                              
                          ..,,,,(#&@@,,,*@@&&,,. ..                             
                       /#&&@&&&&@@@&/@&@@&&&@(#....                             
                    .&&&&&&&&&@@@@@@@@@@@@@@@@%*,,,,.                           
                   .&@@&&&&&&&&@@@@@@@@@@@&&&@@&&&&@&@*                         
                   %&&&&&&&%%&&&@@@@@@@@@@@@&@&&&(&@@@@#                        
                   &&&@%*%%(##&@@@@@@@@@@@@@&%&&&*&@@@@&/                       
                   %&&.@&(%%&&&&@@@@@@@@@@@&&%##(&@(@@@@*                       
                  *&&.@@#%&&&&&&&&&&&&&&&&&&&&&&##%@@@&@#                       
                  &&.&@.#&&.&@@@%  &@@@@@@@@&*%&&#/@@&&&                        
                 ,&&&@%/%&@&,@@@@@@@@@@@@@@@&/&&&##/@@.%#(                      
                 /%@@@@ %&@@&&&&&&@@@@@@@&&&&&&&%@  (@& &/                      
                 %&%%&* @@@@&&&@@@@&@@@@@&&&@@&*.    @&&%&,                     
                 *%%#(%%@@@@@@&&&@@@@@@&&&&%@&*%     &@@&,.                     
                   .*&%&&@@@@@@#&@&&@*@@@@@@@@(.     #@&@%%(                    
                     (%/&&&@@@@@%%&@@@@%&@&&@&,@     (%@@%%(                    
                      &%/&@&&@@@@*@@@@&@#//&&&(@@&#  *@@&&%,                    
                      &,.,@@@@@@@/%@@&@&(,,&&&@&#&&@@,@@&&&&                    
                       @@@&&&@@@@.&%@@@&@*.,&(((&,/@@@@@@&&%                    
                           @@&@&@@%@@@@@@&&&&&%%*#@(@@@@&#@*                    
                           ,@@@@#(&@@(@@@@@@@@@@@@@@@@&&&&&*                    
                           &&@@@(%@@@@@@@@@@@@@@@@@@@@%&&.&@                    
                          ,@@@&,.%@@@@@@@@@@@@@@@@@@@%&.&@@@                    
                          ,&@&, &@@@@@@@@@@@@@&@@@@@&&*&&&&@@                   
                          &&&. &@@@@@&@@@&@@@&@@*@&@&%%&%&&@%                   
                         #&&%%@@@@@@@&&&@,  #@@@%(&@@%@%%%..*                   
                        *&&&.@@/.*@@@@&@&    @@@@@@@@@@@&%(&                    
                        &&&#(@#..@@@@@@@     *&@@&&&&&&&@@@/                    
                       *&&& &@%.#@@@@@@,      /(&&%&&&&&&@@.                    
                       #&@* @@@*@@@@@@#       @//&&%&&&&&&%.                    
                       &&&.%@@@@@@@@@@        *&%%&&@@@@@&(                     
                       &@@.&@@@@@@@@@          &%%@&&@@&%&&                     
                       @@@@(&@@@@@&&@           %%@&&&@&&&&  `, "font-family:monospace")
            
            
take_input()
