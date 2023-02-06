window.addEventListener('DOMContentLoaded', ()=>{
    const body = document.querySelector('body');
    let headerNodes = [];

    function recurcy(el) {
        
        el.childNodes.forEach(node=>{
            if(node.nodeName.match(/^H\d/)){
                const obj = {
                    header: node.nodeName,
                    content: node.textContent
                };
                headerNodes.push(obj);
            } else {
                recurcy(node);
            }
        });
    }
    recurcy(body);
    console.log(headerNodes);

    fetch('https://jsonplaceholder.typicode.com/posts',{
        method: 'POST',
        headers:{
            'Content-Type': 'applications/json'
        },
        body: JSON.stringify(headerNodes)
    })
    .then(response => response.json())
    .then(json=>console.log(json));
});