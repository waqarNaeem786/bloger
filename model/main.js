/*submit function*/

    const post_form = document.getElementById('post_form');
    post_form.addEventListener('submit',(e) => {
        e.preventDefault;
        if(post_form.field.value != ''){
            console.log('not empty')
        }then(result => {
            console.log(result)        
        }).catch((err) => {
            console.log(err)
        });

    })
    

    



    
    
  

