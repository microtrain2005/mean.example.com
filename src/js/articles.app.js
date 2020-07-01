var articlesApp = (function () {

    function viewArticles() {
  
      let uri = `${window.location.origin}/api/articles`;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', uri);
  
      xhr.setRequestHeader(
        'Content-Type',
        'application/json; charset=UTF-8'
      );
  
      xhr.send();
  
      xhr.onload = function () {
        let app = document.getElementById('app');
        let data = JSON.parse(xhr.response);
        let articles = data.articles;
        let table = '';
        let rows = '';
  
        //Loop each article record into it's own HTML table row, each article should
        //have a link a article view
        for (let i = 0; i < articles.length; i++) {
          rows = rows + `<tr>
            <td>
              <a href="#view-${articles[i]['_id']}">${articles[i]['title']}</a>
            </td>
            <td>${articles[i]['description']}</td>
            <td>`
              +
              (articles[i]['published'] ? `${articles[i]['published'].slice(0, 19).replace('T', ' ')}` : `No Publication Date Set`)
              +`
            </td>
          </tr>`;
        }
  
        //Create an articles panel, add a table to the panel, inject the rows into the
        //table
        table = `<div class="card">
          <div class="card-header clearfix">
            <h2 class="h3 float-left">Posts</h2>
            <div class="float-right">
              <a href="#create" class="btn btn-primary">New Post</a>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <td>Title</td>
                  <td>Description</td>
                  <td>Date Published</td>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>`;
  
        //Append the HTML to the #app
        app.innerHTML = table;
      }
    }


    return {
        load: function(){
          let hash = window.location.hash;
          let hashArray = hash.split('-');
    
          switch(hashArray[0]){
            case '#create':
              console.log('CREATE');
              break;
    
            case '#view':
              console.log('VIEW');
              break;
    
            case '#edit':
              console.log('EDIT');
              break;
    
            case '#delete':
              console.log('DELETE');
              break;
    
            default:
              viewArticles();
              break;
          }
        }
      }
    
    })();
      
  
  articlesApp.load();
  
